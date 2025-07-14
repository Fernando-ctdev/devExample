import { useState, useEffect, useCallback } from "react";

interface WeeklyGoal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  weekYear: number;
  weekNumber: number;
}

interface WeeklyGoalInput {
  title: string;
  description?: string;
}

interface WeeklyGoalsStats {
  totalGoals: number;
  completedGoals: number;
  completionPercentage: number;
  formattedPercentage: string;
}

// Função para obter o número da semana do ano
const getWeekNumber = (date: Date): { year: number; week: number } => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return {
    year: d.getFullYear(),
    week: 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
  };
};

export function useWeeklyGoals() {
  const [goals, setGoals] = useState<WeeklyGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obter semana atual
  const getCurrentWeek = useCallback(() => {
    return getWeekNumber(new Date());
  }, []);

  // Carregar metas da semana atual
  const loadWeeklyGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { year, week } = getCurrentWeek();
      
      // Chamar API do banco de dados
      const response = await fetch(`http://localhost:3001/api/weekly-goals?weekYear=${year}&weekNumber=${week}`);
      const data = await response.json();
      
      if (data.success) {
        setGoals(data.data || []);
      } else {
        console.error('Erro ao carregar metas:', data.error);
        setError(data.error || 'Erro ao carregar metas da semana');
        setGoals([]);
      }
    } catch (err) {
      console.error('Erro ao carregar metas:', err);
      setError('Erro de conexão com o servidor');
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }, [getCurrentWeek]);

  // Adicionar nova meta
  const addGoal = useCallback(async (goalData: WeeklyGoalInput) => {
    try {
      const { year, week } = getCurrentWeek();
      
      const response = await fetch('http://localhost:3001/api/weekly-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: goalData.title,
          description: goalData.description,
          weekYear: year,
          weekNumber: week,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await loadWeeklyGoals(); // Recarregar a lista
        return data.data;
      } else {
        throw new Error(data.error || 'Erro ao adicionar meta');
      }
    } catch (err) {
      console.error('Erro ao adicionar meta:', err);
      throw new Error('Erro ao adicionar meta');
    }
  }, [getCurrentWeek, loadWeeklyGoals]);

  // Atualizar meta
  const updateGoal = useCallback(async (goalId: string, updates: Partial<WeeklyGoal>) => {
    try {
      const response = await fetch('http://localhost:3001/api/weekly-goals', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: goalId,
          ...updates,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await loadWeeklyGoals(); // Recarregar a lista
        return data.data;
      } else {
        throw new Error(data.error || 'Erro ao atualizar meta');
      }
    } catch (err) {
      console.error('Erro ao atualizar meta:', err);
      throw new Error('Erro ao atualizar meta');
    }
  }, [loadWeeklyGoals]);

  // Marcar meta como concluída/não concluída
  const toggleGoalCompletion = useCallback(async (goalId: string) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const updates: Partial<WeeklyGoal> = {
        completed: !goal.completed,
        completedAt: !goal.completed ? new Date().toISOString() : undefined,
      };

      return await updateGoal(goalId, updates);
    } catch (err) {
      console.error('Erro ao alternar conclusão da meta:', err);
      throw new Error('Erro ao alterar status da meta');
    }
  }, [goals, updateGoal]);

  // Remover meta
  const removeGoal = useCallback(async (goalId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/weekly-goals?id=${goalId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        await loadWeeklyGoals(); // Recarregar a lista
      } else {
        throw new Error(data.error || 'Erro ao remover meta');
      }
    } catch (err) {
      console.error('Erro ao remover meta:', err);
      throw new Error('Erro ao remover meta');
    }
  }, [loadWeeklyGoals]);

  // Calcular estatísticas
  const stats: WeeklyGoalsStats = {
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.completed).length,
    completionPercentage: goals.length > 0 ? (goals.filter(g => g.completed).length / goals.length) * 100 : 0,
    formattedPercentage: goals.length > 0 ? `${Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%` : '0%',
  };

  // Carregar metas na inicialização
  useEffect(() => {
    loadWeeklyGoals();
  }, [loadWeeklyGoals]);

  return {
    goals,
    loading,
    error,
    stats,
    addGoal,
    updateGoal,
    toggleGoalCompletion,
    removeGoal,
    refreshGoals: loadWeeklyGoals,
  };
}
