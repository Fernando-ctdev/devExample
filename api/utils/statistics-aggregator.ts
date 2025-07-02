import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Sistema de agregação de estatísticas
 * Responsável por atualizar as estatísticas sempre que uma sessão de estudo é completada
 */

export interface SessionCompletionData {
  eventId: string;
  actualStudyTime: number; // em minutos
  actualBreakTime: number; // em minutos
  completed: boolean;
  sessionDate: Date;
}

/**
 * Atualiza as estatísticas quando uma sessão de estudo é completada
 */
export async function updateStatisticsOnSessionCompletion(data: SessionCompletionData) {
  try {
    console.log('📊 Atualizando estatísticas para sessão completada:', data);

    // Buscar informações do evento
    const event = await prisma.studyEvent.findUnique({
      where: { id: data.eventId },
      include: {
        technology: true,
        category: true,
        item: true
      }
    });

    if (!event) {
      throw new Error(`Evento ${data.eventId} não encontrado`);
    }

    const statisticsDate = new Date(data.sessionDate.getFullYear(), data.sessionDate.getMonth(), data.sessionDate.getDate());

    // 1. Atualizar estatísticas gerais (sem tecnologia/categoria específica)
    await upsertStatistics({
      date: statisticsDate,
      technologyId: null,
      categoryId: null,
      studyTime: data.actualStudyTime,
      sessions: 1,
      completedEvents: data.completed ? 1 : 0
    });

    // 2. Atualizar estatísticas por tecnologia (se disponível)
    if (event.technologyId) {
      await upsertStatistics({
        date: statisticsDate,
        technologyId: event.technologyId,
        categoryId: null,
        studyTime: data.actualStudyTime,
        sessions: 1,
        completedEvents: data.completed ? 1 : 0
      });
    }

    // 3. Atualizar estatísticas por categoria (se disponível)
    if (event.categoryId) {
      await upsertStatistics({
        date: statisticsDate,
        technologyId: event.technologyId,
        categoryId: event.categoryId,
        studyTime: data.actualStudyTime,
        sessions: 1,
        completedEvents: data.completed ? 1 : 0
      });
    }

    // 4. Marcar evento como completado se a sessão foi concluída
    if (data.completed && !event.completed) {
      await prisma.studyEvent.update({
        where: { id: data.eventId },
        data: { completed: true }
      });
    }

    console.log('✅ Estatísticas atualizadas com sucesso');

  } catch (error) {
    console.error('❌ Erro ao atualizar estatísticas:', error);
    throw error;
  }
}

/**
 * Função auxiliar para fazer upsert das estatísticas
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
    // Para campos opcionais no Prisma, usamos findFirst com where específico
    const whereClause: any = {
      date,
      technologyId: technologyId,
      categoryId: categoryId
    };

    const existing = await prisma.studyStatistics.findFirst({
      where: whereClause
    });

    if (existing) {
      // Atualizar registro existente
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
      // Criar novo registro
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
    console.error('Erro no upsert de estatísticas:', error);
    throw error;
  }
}

/**
 * Calcula a sequência atual de dias consecutivos de estudo
 */
export async function calculateCurrentStreak(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const currentDate = new Date(today);

    // Verificar se estudou hoje
    const todayStats = await prisma.studyStatistics.findFirst({
      where: {
        date: today,
        technologyId: null,
        categoryId: null,
        totalSessions: { gt: 0 }
      }
    });

    // Se não estudou hoje, verificar ontem como ponto de partida
    if (!todayStats) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Contar dias consecutivos para trás
    while (true) {
      const dayStats = await prisma.studyStatistics.findFirst({
        where: {
          date: currentDate,
          technologyId: null,
          categoryId: null,
          totalSessions: { gt: 0 }
        }
      });

      if (dayStats) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }

      // Limite de segurança para evitar loop infinito
      if (streak > 365) break;
    }

    return streak;
  } catch (error) {
    console.error('Erro ao calcular streak:', error);
    return 0;
  }
}

/**
 * Recupera estatísticas otimizadas para o dashboard
 */
export async function getDashboardStats(startDate: Date, endDate: Date) {
  try {
    // Normalizar datas para evitar problemas de timezone
    const periodStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const periodEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    // 1. Estatísticas gerais do período
    const generalStats = await prisma.studyStatistics.aggregate({
      where: {
        date: { gte: periodStart, lte: periodEnd },
        technologyId: null,
        categoryId: null
      },
      _sum: {
        totalStudyTime: true,
        totalSessions: true,
        completedEvents: true
      }
    });

    // 2. Total de eventos criados no período
    const totalEvents = await prisma.studyEvent.count({
      where: {
        date: {
          gte: periodStart,
          lte: periodEnd
        }
      }
    });

    // 3. Sequência atual
    const currentStreak = await calculateCurrentStreak();

    // 4. Progresso semanal (últimos 7 dias do período)
    const weeklyProgress = await getWeeklyProgress(periodStart, periodEnd);

    // 5. Dados por tecnologia
    const technologiesData = await getTechnologiesData(periodStart, periodEnd);

    // 6. Atividade mensal
    const monthlyActivity = await getMonthlyActivity(periodStart, periodEnd);

    return {
      totalStudyTime: generalStats._sum.totalStudyTime || 0,
      totalSessions: generalStats._sum.totalSessions || 0,
      totalEvents,
      completedEvents: generalStats._sum.completedEvents || 0,
      currentStreak,
      weeklyProgress,
      technologiesData,
      monthlyActivity
    };

  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    throw error;
  }
}

/**
 * Progresso dos últimos 7 dias do período
 */
async function getWeeklyProgress(periodStart: Date, periodEnd: Date) {
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
      const dayStats = await prisma.studyStatistics.findFirst({
        where: {
          date,
          technologyId: null,
          categoryId: null
        }
      });

      weeklyProgress.push({
        day: dayNames[date.getDay()],
        horas: dayStats ? Math.round((dayStats.totalStudyTime / 60) * 10) / 10 : 0,
        estudos: dayStats ? dayStats.totalSessions : 0
      });
    }
  }

  return weeklyProgress;
}

/**
 * Dados por tecnologia no período
 */
async function getTechnologiesData(periodStart: Date, periodEnd: Date) {
  const techStats = await prisma.studyStatistics.groupBy({
    by: ['technologyId'],
    where: {
      date: { gte: periodStart, lte: periodEnd },
      technologyId: { not: null },
      categoryId: null
    },
    _sum: { totalStudyTime: true },
    orderBy: { _sum: { totalStudyTime: 'desc' } },
    take: 6
  });

  const technologiesData = [];
  for (const stat of techStats) {
    if (stat.technologyId) {
      const tech = await prisma.technology.findUnique({
        where: { id: stat.technologyId },
        select: { name: true, title: true }
      });
      
      if (tech) {
        technologiesData.push({
          name: tech.title || tech.name,
          value: Math.round((stat._sum.totalStudyTime || 0) / 60 * 10) / 10
        });
      }
    }
  }

  return technologiesData;
}

/**
 * Atividade mensal
 */
async function getMonthlyActivity(periodStart: Date, periodEnd: Date) {
  const monthlyActivity = [];
  
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
  
  // Buscar atividades no período
  const activities = await prisma.studyStatistics.findMany({
    where: {
      date: { gte: activityStart, lte: activityEnd },
      technologyId: null,
      categoryId: null,
      totalSessions: { gt: 0 }
    },
    select: {
      date: true,
      totalSessions: true
    }
  });

  for (const activity of activities) {
    monthlyActivity.push({
      date: activity.date.toISOString().split('T')[0],
      count: activity.totalSessions,
      day: activity.date.getDate(),
      month: activity.date.getMonth() + 1,
      year: activity.date.getFullYear()
    });
  }

  return monthlyActivity;
}
