import { PrismaClient } from '@prisma/client';
import { getDashboardStatsFromSessions } from './utils/session-based-statistics';

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
  const { type = 'dashboard' } = req.query;

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
    
    // Usar o novo sistema de agregação baseado em sessões
    const dashboardData = await getDashboardStatsFromSessions(periodStart, periodEnd);
    
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

async function getDetailedStatistics(req: any, res: any) {
  try {
    const { 
      startDate, 
      endDate, 
      technologyId, 
      categoryId 
    } = req.query;
    
    let periodStart: Date;
    let periodEnd: Date;
    
    if (startDate && endDate) {
      periodStart = new Date(startDate);
      periodEnd = new Date(endDate);
    } else {
      const now = new Date();
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    const whereClause: any = {
      date: {
        gte: periodStart,
        lte: periodEnd
      }
    };

    if (technologyId) {
      whereClause.technologyId = technologyId;
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const statistics = await prisma.studyStatistics.findMany({
      where: whereClause,
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
      }
    });

    const formattedStats: StudyStatisticsResponse[] = statistics.map(stat => ({
      date: stat.date.toISOString().split('T')[0],
      totalStudyTime: stat.totalStudyTime,
      totalSessions: stat.totalSessions,
      completedEvents: stat.completedEvents,
      technology: stat.technology || undefined,
      category: stat.category || undefined
    }));

    return res.status(200).json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas detalhadas:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao carregar estatísticas detalhadas'
    });
  }
}
