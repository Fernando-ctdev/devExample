import { useState, useEffect, useCallback } from 'react';

export type DateRangeType = 'this_week' | 'this_month' | 'this_year';

interface DashboardStats {
  totalStudyTime: number; // em minutos
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
    value: number; // em horas
  }>;
  monthlyActivity: Array<{
    date: string;
    count: number;
    day: number;
    month: number;
    year: number;
  }>;
}

const getDateRange = (type: DateRangeType): { startDate: Date; endDate: Date } => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (type) {
    case 'this_week': {
      // Encontrar segunda-feira (ajustar para segunda ser dia 1)
      const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Se domingo, volta 6 dias
      const monday = new Date(today);
      monday.setDate(today.getDate() - daysFromMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { startDate: monday, endDate: sunday };
    }
    case 'this_month': {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { startDate: firstDay, endDate: lastDay };
    }
    case 'this_year': {
      const firstDay = new Date(today.getFullYear(), 0, 1);
      const lastDay = new Date(today.getFullYear(), 11, 31);
      return { startDate: firstDay, endDate: lastDay };
    }
    default:
      return { startDate: today, endDate: today };
  }
};

export const useDashboardStats = (rangeType: DateRangeType = 'this_week') => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { startDate, endDate } = getDateRange(rangeType);
      
      const params = new URLSearchParams({
        type: 'dashboard',
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
      
      const response = await fetch(`http://localhost:3001/api/study-statistics?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Erro ao carregar estatísticas');
      }
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  }, [rangeType]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
