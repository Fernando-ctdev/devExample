import { useState, useEffect, useCallback } from 'react';

interface WeeklyStats {
  totalStudyTime: number; // em minutos
  formattedTime: string; // tempo formatado em horas
  totalSessions: number;
}

export const useWeeklyStats = () => {
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para formatar tempo em horas
  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const fetchWeeklyStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cálculo da data de início e fim da semana atual (segunda a domingo)
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Encontrar segunda-feira (ajustar para segunda ser dia 1)
      const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Se domingo, volta 6 dias
      const monday = new Date(today);
      monday.setDate(today.getDate() - daysFromMonday);
      
      // Encontrar domingo (último dia da semana)
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      const params = new URLSearchParams({
        type: 'dashboard',
        startDate: monday.toISOString().split('T')[0],
        endDate: sunday.toISOString().split('T')[0]
      });
      
      console.log('📊 useWeeklyStats - Enviando requisição:', {
        startDate: monday.toISOString().split('T')[0],
        endDate: sunday.toISOString().split('T')[0],
        url: `http://localhost:3001/api/study-statistics?${params}`
      });
      
      const response = await fetch(`http://localhost:3001/api/study-statistics?${params}`);
      const data = await response.json();
      
      console.log('📊 useWeeklyStats - Resposta recebida:', data);
      
      if (data.success) {
        const weeklyStats: WeeklyStats = {
          totalStudyTime: data.data.totalStudyTime || 0,
          formattedTime: formatStudyTime(data.data.totalStudyTime || 0),
          totalSessions: data.data.totalSessions || 0
        };
        
        setStats(weeklyStats);
      } else {
        setError(data.error || 'Erro ao carregar estatísticas');
      }
    } catch (err) {
      console.error('Erro ao buscar estatísticas da semana:', err);
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeeklyStats();
  }, [fetchWeeklyStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchWeeklyStats
  };
};
