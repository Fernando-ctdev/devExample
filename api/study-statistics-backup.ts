import { PrismaClient } from '@prisma/client';
import { getDashboardStats } from './utils/statistics-aggregator';

const prisma = new PrismaClient();

export interface StudyStatisticsResponse {
  date: string;
  totalStudyTime: number;
  totalSessions: number;
  completedEvents: number;
  technology?: {
    id: string;
    name: string;
    title: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface DashboardStatsResponse {
  totalStudyTime: number;
  totalSessions: number;
  totalEvents: number;
  completedEvents: number;
  currentStreak: number;
  weeklyProgress: Array<{
    day: string;
    horas: number;
    estudos: number;
  }>;
  technologiesData: Array<{
    name: string;
    value: number;
  }>;
  monthlyActivity: Array<{
    date: string;
    count: number;
    day: number;
    month: number;
    year: number;
  }>;
}

// GET /api/study-statistics - Obter estatísticas
export default async function handler(req: any, res: any) {
  try {
    switch (req.method) {
      case 'GET':
        return await getStudyStatistics(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Study Statistics API Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

async function getStudyStatistics(req: any, res: any) {
  const { 
    type = 'dashboard', // 'dashboard' | 'detailed'
    startDate,
    endDate,
    technologyId,
    categoryId
  } = req.query;

  if (type === 'dashboard') {
    return await getDashboardStatistics(req, res);
  } else {
    return await getDetailedStatistics(req, res);
  }
}

async function getDashboardStatistics(req: any, res: any) {
  try {
    const { startDate, endDate } = req.query;
    
    // Definir período baseado nos parâmetros ou usar padrão (mês atual)
    let periodStart: Date;
    let periodEnd: Date;
    
    if (startDate && endDate) {
      periodStart = new Date(startDate);
      periodEnd = new Date(endDate);
    } else {
      // Padrão: mês atual
      const now = new Date();
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
    
    // Usar o novo sistema de agregação
    const dashboardData = await getDashboardStats(periodStart, periodEnd);
    
    return res.status(200).json({
      success: true,
      data: dashboardData
    });
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao carregar estatísticas do dashboard'
    });
  }
}
  const generalStats = await prisma.studyStatistics.aggregate({
    where: {
      date: {
        gte: periodStart,
        lte: periodEnd
      },
      technologyId: null,
      categoryId: null
    },
    _sum: {
      totalStudyTime: true,
      totalSessions: true,
      completedEvents: true
    }
  });

  // Total de eventos criados
  const totalEvents = await prisma.studyEvent.count();

  // Progresso semanal baseado no período selecionado (últimos 7 dias do período)
  const weeklyProgress = [];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Calcular os últimos 7 dias do período ou do período atual se for menor
  const weekStart = new Date(Math.max(periodEnd.getTime() - (6 * 24 * 60 * 60 * 1000), periodStart.getTime()));
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    
    if (date <= periodEnd) {
      const dayStats = await prisma.studyStatistics.findFirst({
        where: {
          date: date,
          technologyId: null,
          categoryId: null
        }
      });

      weeklyProgress.push({
        day: dayNames[date.getDay()],
        horas: dayStats ? dayStats.totalStudyTime / 60 : 0, // converter para horas
        estudos: dayStats ? dayStats.totalSessions : 0
      });
    }
  }

  // Estatísticas por tecnologia no período selecionado
  const techStats = await prisma.studyStatistics.groupBy({
    by: ['technologyId'],
    where: {
      date: {
        gte: periodStart,
        lte: periodEnd
      },
      technologyId: { not: null },
      categoryId: null
    },
    _sum: {
      totalStudyTime: true
    },
    orderBy: {
      _sum: {
        totalStudyTime: 'desc'
      }
    },
    take: 6
  });

  // Buscar nomes das tecnologias
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
          value: Math.round((stat._sum.totalStudyTime || 0) / 60 * 10) / 10 // horas com 1 decimal
        });
      }
    }
  }

  // Atividade mensal - mostrar atividade do período selecionado ou últimos 12 meses
  const monthlyActivity = [];
  let activityStart: Date;
  let activityEnd: Date;
  
  // Se o período selecionado for maior que 3 meses, usar o período selecionado
  // Caso contrário, usar últimos 12 meses para ter dados suficientes
  const periodDurationMs = periodEnd.getTime() - periodStart.getTime();
  const threeMonthsMs = 3 * 30 * 24 * 60 * 60 * 1000;
  
  if (periodDurationMs > threeMonthsMs) {
    activityStart = periodStart;
    activityEnd = periodEnd;
  } else {
    activityEnd = new Date();
    activityStart = new Date(activityEnd);
    activityStart.setMonth(activityStart.getMonth() - 12);
  }

  const monthlyStats = await prisma.studyStatistics.findMany({
    where: {
      date: {
        gte: activityStart,
        lte: activityEnd
      },
      technologyId: null,
      categoryId: null
    },
    orderBy: {
      date: 'asc'
    }
  });

  // Converter em formato para o calendário de atividades
  for (const stat of monthlyStats) {
    const date = new Date(stat.date);
    const sessionsCount = Math.min(stat.totalSessions, 4); // máximo 4 para intensidade
    
    monthlyActivity.push({
      date: stat.date.toISOString().split('T')[0],
      count: sessionsCount,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
  }

  // Calcular sequência atual
  let currentStreak = 0;
  const streakStats = await prisma.studyStatistics.findMany({
    where: {
      technologyId: null,
      categoryId: null,
      totalSessions: { gt: 0 }
    },
    orderBy: {
      date: 'desc'
    },
    take: 365 // último ano
  });

  for (const stat of streakStats) {
    const statDate = new Date(stat.date);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - currentStreak);
    
    if (statDate.toDateString() === expectedDate.toDateString()) {
      currentStreak++;
    } else {
      break;
    }
  }

  const response: DashboardStatsResponse = {
    totalStudyTime: generalStats._sum.totalStudyTime || 0,
    totalSessions: generalStats._sum.totalSessions || 0,
    totalEvents: totalEvents,
    completedEvents: generalStats._sum.completedEvents || 0,
    currentStreak: currentStreak,
    weeklyProgress: weeklyProgress,
    technologiesData: technologiesData,
    monthlyActivity: monthlyActivity
  };

  return res.status(200).json({ success: true, data: response });
}

async function getDetailedStatistics(req: any, res: any) {
  const { 
    startDate,
    endDate,
    technologyId,
    categoryId,
    limit = '50',
    offset = '0'
  } = req.query;

  const where: Record<string, unknown> = {};

  if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  if (technologyId) {
    where.technologyId = technologyId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const statistics = await prisma.studyStatistics.findMany({
    where,
    include: {
      technology: {
        select: {
          id: true,
          name: true,
          title: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: parseInt(limit as string),
    skip: parseInt(offset as string)
  });

  return res.status(200).json({ success: true, data: statistics });
}
