import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Sistema de estatísticas baseado diretamente nas study_sessions
 * Fonte de verdade: study_sessions (dados reais e completos)
 */

export async function getDashboardStatsFromSessions(startDate: Date, endDate: Date) {
  try {
    console.log('📊 Buscando estatísticas do dashboard baseado em sessions:', { startDate, endDate });

    // Normalizar datas para busca
    const periodStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const periodEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);

    // 1. Buscar todas as sessões do período
    const sessions = await prisma.studySession.findMany({
      where: {
        startTime: {
          gte: periodStart,
          lte: periodEnd
        }
      },
      include: {
        event: {
          include: {
            technology: true,
            category: true
          }
        }
      }
    });

    console.log(`📊 Encontradas ${sessions.length} sessões no período`);

    // 2. Buscar eventos criados no período  
    const eventsInPeriod = await prisma.studyEvent.findMany({
      where: {
        createdAt: {
          gte: periodStart,
          lte: periodEnd
        }
      }
    });

    console.log(`📊 Encontrados ${eventsInPeriod.length} eventos criados no período`);

    // 3. Calcular estatísticas gerais
    const totalStudyTime = sessions.reduce((sum, session) => sum + (session.actualStudyTime || 0), 0);
    const totalSessions = sessions.length;
    const totalEvents = eventsInPeriod.length;
    const completedSessions = sessions.filter(session => session.completed).length;

    // 4. Calcular sequência atual (baseado nas datas de sessões)
    const currentStreak = await calculateStreakFromSessions();

    // 5. Progresso semanal (últimos 7 dias do período)
    const weeklyProgress = await getWeeklyProgressFromSessions(periodStart, periodEnd);

    // 6. Estatísticas por tecnologia
    const technologiesData = await getTechnologiesDataFromSessions(sessions);

    // 7. Atividade mensal
    const monthlyActivity = await getMonthlyActivityFromSessions(periodStart, periodEnd);

    const result = {
      totalStudyTime,
      totalSessions,
      totalEvents,
      completedEvents: completedSessions,
      currentStreak,
      weeklyProgress,
      technologiesData,
      monthlyActivity
    };

    console.log('📊 Resultado das estatísticas:', result);
    return result;

  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas baseadas em sessions:', error);
    throw error;
  }
}

/**
 * Calcula a sequência atual baseada nas sessões realizadas
 */
async function calculateStreakFromSessions(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const currentDate = new Date(today);

    console.log('🔥 Calculando streak...');

    // Verificar se estudou hoje
    const todaySessions = await prisma.studySession.findFirst({
      where: {
        startTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        },
        completed: true
      }
    });

    // Se não estudou hoje, começar de ontem
    if (!todaySessions) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Contar dias consecutivos para trás
    while (true) {
      const dayStart = new Date(currentDate);
      const dayEnd = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

      const daySessions = await prisma.studySession.findFirst({
        where: {
          startTime: { gte: dayStart, lt: dayEnd },
          completed: true
        }
      });

      if (daySessions) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }

      // Limite de segurança
      if (streak > 365) break;
    }

    console.log(`🔥 Streak calculado: ${streak} dias`);
    return streak;
    
  } catch (error) {
    console.error('❌ Erro ao calcular streak:', error);
    return 0;
  }
}

/**
 * Progresso semanal baseado nas sessões
 */
async function getWeeklyProgressFromSessions(periodStart: Date, periodEnd: Date) {
  const weeklyProgress = [];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Últimos 7 dias do período
  const weekStart = new Date(Math.max(
    periodEnd.getTime() - (6 * 24 * 60 * 60 * 1000), 
    periodStart.getTime()
  ));
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    
    if (date <= periodEnd) {
      const dayStart = new Date(date);
      const dayEnd = new Date(date.getTime() + 24 * 60 * 60 * 1000);

      const daySessions = await prisma.studySession.findMany({
        where: {
          startTime: { gte: dayStart, lt: dayEnd }
        }
      });

      const totalStudyTime = daySessions.reduce((sum, session) => sum + (session.actualStudyTime || 0), 0);

      weeklyProgress.push({
        day: dayNames[date.getDay()],
        horas: Math.round((totalStudyTime / 60) * 10) / 10, // converter para horas
        estudos: daySessions.length
      });
    }
  }

  return weeklyProgress;
}

/**
 * Estatísticas por tecnologia baseadas nas sessões
 */
async function getTechnologiesDataFromSessions(sessions: any[]) {
  const techMap = new Map();

  for (const session of sessions) {
    if (session.event?.technology) {
      const techName = session.event.technology.title || session.event.technology.name;
      const studyTime = session.actualStudyTime || 0;
      
      if (techMap.has(techName)) {
        techMap.set(techName, techMap.get(techName) + studyTime);
      } else {
        techMap.set(techName, studyTime);
      }
    }
  }

  // Converter para array e ordenar
  const technologiesData = Array.from(techMap.entries())
    .map(([name, totalTime]) => ({
      name,
      value: Math.round((totalTime / 60) * 10) / 10 // converter para horas
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6); // Top 6

  return technologiesData;
}

/**
 * Atividade mensal baseada nas sessões
 */
async function getMonthlyActivityFromSessions(periodStart: Date, periodEnd: Date) {
  // Determinar período para atividade mensal
  const periodDurationMs = periodEnd.getTime() - periodStart.getTime();
  const threeMonthsMs = 3 * 30 * 24 * 60 * 60 * 1000;
  
  let activityStart: Date;
  let activityEnd: Date;
  
  if (periodDurationMs > threeMonthsMs) {
    activityStart = periodStart;
    activityEnd = periodEnd;
  } else {
    activityEnd = new Date();
    activityStart = new Date();
    activityStart.setMonth(activityStart.getMonth() - 12);
  }
  
  // Buscar sessões no período de atividade
  const sessions = await prisma.studySession.findMany({
    where: {
      startTime: { gte: activityStart, lte: activityEnd }
    }
  });

  // Agrupar por data
  const activityMap = new Map();
  
  for (const session of sessions) {
    const dateKey = session.startTime.toISOString().split('T')[0];
    if (activityMap.has(dateKey)) {
      activityMap.set(dateKey, activityMap.get(dateKey) + 1);
    } else {
      activityMap.set(dateKey, 1);
    }
  }

  // Converter para array
  const monthlyActivity = Array.from(activityMap.entries()).map(([dateStr, count]) => {
    const date = new Date(dateStr);
    return {
      date: dateStr,
      count,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  });

  return monthlyActivity;
}

/**
 * Função para salvar estatísticas consolidadas após conclusão de sessão
 * (Para uso futuro - manter study_statistics como cache/backup)
 */
export async function saveSessionStatistics(sessionData: {
  eventId: string;
  actualStudyTime: number;
  actualBreakTime: number;
  completed: boolean;
  sessionDate: Date;
}) {
  try {
    console.log('💾 Salvando estatísticas da sessão:', sessionData);

    // Buscar informações do evento
    const event = await prisma.studyEvent.findUnique({
      where: { id: sessionData.eventId },
      include: {
        technology: true,
        category: true
      }
    });

    if (!event) {
      console.error('❌ Evento não encontrado para salvar estatísticas');
      return;
    }

    const statsDate = new Date(
      sessionData.sessionDate.getFullYear(),
      sessionData.sessionDate.getMonth(),
      sessionData.sessionDate.getDate()
    );

    // Salvar/atualizar estatísticas consolidadas
    // 1. Geral
    await upsertStatistics({
      date: statsDate,
      technologyId: null,
      categoryId: null,
      studyTime: sessionData.actualStudyTime,
      sessions: 1,
      completedEvents: sessionData.completed ? 1 : 0
    });

    // 2. Por tecnologia
    if (event.technologyId) {
      await upsertStatistics({
        date: statsDate,
        technologyId: event.technologyId,
        categoryId: null,
        studyTime: sessionData.actualStudyTime,
        sessions: 1,
        completedEvents: sessionData.completed ? 1 : 0
      });
    }

    // 3. Por categoria
    if (event.categoryId) {
      await upsertStatistics({
        date: statsDate,
        technologyId: event.technologyId,
        categoryId: event.categoryId,
        studyTime: sessionData.actualStudyTime,
        sessions: 1,
        completedEvents: sessionData.completed ? 1 : 0
      });
    }

    console.log('✅ Estatísticas salvas com sucesso');

  } catch (error) {
    console.error('❌ Erro ao salvar estatísticas da sessão:', error);
  }
}

/**
 * Salva dados consolidados em study_statistics ao concluir uma sessão
 * Esta função é chamada sempre que uma sessão de estudo é finalizada
 */
export async function saveConsolidatedStatistics(sessionData: {
  eventId: string;
  actualStudyTime: number;
  sessionDate: Date;
  completed: boolean;
}) {
  try {
    if (!sessionData.completed) {
      console.log('📊 Sessão não foi concluída, não salvando estatísticas consolidadas');
      return;
    }

    console.log('📊 Salvando estatísticas consolidadas para sessão:', sessionData.eventId);

    // Buscar dados do evento para obter tecnologia e categoria
    const event = await prisma.studyEvent.findUnique({
      where: { id: sessionData.eventId },
      include: {
        technology: true,
        category: true
      }
    });

    if (!event) {
      console.error('❌ Evento não encontrado:', sessionData.eventId);
      return;
    }

    // Normalizar data para agregação (dia específico)
    const aggregationDate = new Date(
      sessionData.sessionDate.getFullYear(),
      sessionData.sessionDate.getMonth(),
      sessionData.sessionDate.getDate()
    );

    // Salvar estatísticas consolidadas:
    
    // 1. Geral do dia
    await upsertStatistics({
      date: aggregationDate,
      technologyId: null,
      categoryId: null,
      studyTime: sessionData.actualStudyTime,
      sessions: 1,
      completedEvents: 1
    });

    // 2. Por tecnologia (se existir)
    if (event.technologyId) {
      await upsertStatistics({
        date: aggregationDate,
        technologyId: event.technologyId,
        categoryId: null,
        studyTime: sessionData.actualStudyTime,
        sessions: 1,
        completedEvents: 1
      });
    }

    // 3. Por categoria (se existir)
    if (event.categoryId) {
      await upsertStatistics({
        date: aggregationDate,
        technologyId: null,
        categoryId: event.categoryId,
        studyTime: sessionData.actualStudyTime,
        sessions: 1,
        completedEvents: 1
      });
    }

    // 4. Por tecnologia + categoria (se ambos existirem)
    if (event.technologyId && event.categoryId) {
      await upsertStatistics({
        date: aggregationDate,
        technologyId: event.technologyId,
        categoryId: event.categoryId,
        studyTime: sessionData.actualStudyTime,
        sessions: 1,
        completedEvents: 1
      });
    }

    console.log('✅ Estatísticas consolidadas salvas com sucesso');

  } catch (error) {
    console.error('❌ Erro ao salvar estatísticas consolidadas:', error);
    // Não propagar o erro para não quebrar o fluxo principal
  }
}

/**
 * Função auxiliar para upsert de estatísticas
 */
async function upsertStatistics(params: {
  date: Date;
  technologyId: string | null;
  categoryId: string | null;
  studyTime: number;
  sessions: number;
  completedEvents: number;
}) {
  const { date, technologyId, categoryId, studyTime, sessions, completedEvents } = params;

  try {
    // Buscar registro existente
    const existing = await prisma.studyStatistics.findFirst({
      where: {
        date,
        technologyId,
        categoryId
      }
    });

    if (existing) {
      // Atualizar
      await prisma.studyStatistics.update({
        where: { id: existing.id },
        data: {
          totalStudyTime: existing.totalStudyTime + studyTime,
          totalSessions: existing.totalSessions + sessions,
          completedEvents: existing.completedEvents + completedEvents,
          updatedAt: new Date()
        }
      });
    } else {
      // Criar novo
      await prisma.studyStatistics.create({
        data: {
          date,
          technologyId: technologyId || undefined,
          categoryId: categoryId || undefined,
          totalStudyTime: studyTime,
          totalSessions: sessions,
          completedEvents: completedEvents
        }
      });
    }
  } catch (error) {
    console.error('❌ Erro no upsert de estatísticas:', error);
    throw error;
  }
}
