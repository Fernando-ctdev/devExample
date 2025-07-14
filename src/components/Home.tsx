import { useState, useEffect, useCallback } from "react";
import { HomeProps } from "../types/types";
import { Calendar, Code2, TrendingUp, Clock, Play, BookOpen, Target, Home as HomeIcon, Plus, Edit2, Trash2, Check } from "lucide-react";
import { StudyModal } from "./StudyModal";
import { WeeklyGoalsModal } from "./WeeklyGoalsModal";
import { useStudyTimerControl } from "../hooks/useStudyTimer";
import { useWeeklyStats } from "../hooks/useWeeklyStats";
import { useWeeklyGoals } from "../hooks/useWeeklyGoals";

export function Home({ isDarkMode, technologies, onNavigate }: HomeProps) {
  const [currentDate] = useState(new Date());
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<{
    id: string;
    title: string;
    description?: string;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
    type: string;
  } | null>(null);
  const { startSession } = useStudyTimerControl();
  const { stats: weeklyStats, loading: weeklyStatsLoading } = useWeeklyStats();
  const { 
    goals, 
    loading: goalsLoading, 
    stats: goalsStats,
    addGoal,
    updateGoal,
    toggleGoalCompletion,
    removeGoal,
  } = useWeeklyGoals();

  // Tipos para eventos reais
  interface StudyEvent {
    id: string;
    title: string;
    description?: string;
    type: 'STUDY' | 'PROJECT' | 'REVIEW' | 'MEETING' | 'WORKSHOP' | 'PRESENTATION' | 'PLANNING' | 'DEADLINE';
    date: string;
    completed: boolean;
    technologyId?: string;
    categoryId?: string;
    itemId?: string;
    technology?: {
      id: string;
      name: string;
      title: string;
    };
    category?: {
      id: string;
      name: string;
    };
    item?: {
      id: string;
      title: string;
    };
  }

  // Tipos para sessões de estudo
  interface StudySession {
    id: string;
    eventId: string;
    startTime: string;
    endTime?: string;
    studyDuration: number;
    breakDuration: number;
    actualStudyTime: number;
    actualBreakTime: number;
    totalStudyTime: number;
    completed: boolean;
    createdAt: string;
    event: {
      id: string;
      title: string;
      type: string;
      description?: string;
      completed?: boolean;
      technology?: {
        id: string;
        name: string;
        title: string;
      };
      category?: {
        id: string;
        name: string;
      };
    };
  }

  // Tipo para sessões agrupadas por evento
  interface GroupedStudySession {
    eventId: string;
    eventTitle: string;
    eventDescription?: string;
    eventType: string;
    eventCompleted: boolean;
    technology?: {
      id: string;
      name: string;
      title: string;
    };
    category?: {
      id: string;
      name: string;
    };
    totalStudyTime: number;
    totalSessions: number;
    completedSessions: number;
    lastSessionDate: string;
    sessions: StudySession[];
  }

  const [events, setEvents] = useState<StudyEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [groupedStudySessions, setGroupedStudySessions] = useState<GroupedStudySession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // Função para agrupar sessões por evento
  const groupSessionsByEvent = useCallback((sessions: StudySession[]): GroupedStudySession[] => {
    console.log('Agrupando sessões, primeira sessão event.completed:', 
      sessions.length > 0 ? sessions[0].event.completed : 'sem sessões');
    
    const grouped = sessions.reduce((acc, session) => {
      const eventId = session.eventId;
      
      // Debug para verificar o campo completed do evento
      console.log(`Sessão do evento ${session.event.title} tem completed = ${session.event.completed}`);
      
      if (!acc[eventId]) {
        acc[eventId] = {
          eventId: session.eventId,
          eventTitle: session.event.title,
          eventDescription: session.event.description,
          eventType: session.event.type,
          // Garantir que o valor boolean do completed seja preservado
          eventCompleted: session.event.completed === true,
          technology: session.event.technology,
          category: session.event.category,
          totalStudyTime: 0,
          totalSessions: 0,
          completedSessions: 0,
          lastSessionDate: session.startTime,
          sessions: []
        };
      }
      
      // Atualizar estatísticas
      acc[eventId].totalStudyTime += session.totalStudyTime || 0;
      acc[eventId].totalSessions += 1;
      if (session.completed) {
        acc[eventId].completedSessions += 1;
      }
      
      // Atualizar última data se a sessão atual for mais recente
      if (new Date(session.startTime) > new Date(acc[eventId].lastSessionDate)) {
        acc[eventId].lastSessionDate = session.startTime;
      }
      
      acc[eventId].sessions.push(session);
      
      return acc;
    }, {} as Record<string, GroupedStudySession>);
    
    // Converter para array e ordenar por data da última sessão
    return Object.values(grouped).sort((a, b) => 
      new Date(b.lastSessionDate).getTime() - new Date(a.lastSessionDate).getTime()
    );
  }, []);

  // Função para carregar eventos do banco
  const loadEvents = useCallback(async () => {
    try {
      setEventsLoading(true);
      
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      const response = await fetch(`http://localhost:3001/api/study-events?year=${year}&month=${month}`);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data || []);
      } else {
        console.error('Erro ao carregar eventos:', data.error);
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setEventsLoading(false);
    }
  }, [currentDate]);

  // Função para carregar sessões de estudo da semana atual
  const loadWeeklyStudySessions = useCallback(async () => {
    try {
      setSessionsLoading(true);
      
      // Calcular início e fim da semana atual (segunda a domingo)
      const today = new Date();
      const startOfWeek = new Date(today);
      // Encontrar segunda-feira (ajustar para segunda ser dia 1)
      const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Se domingo, volta 6 dias
      startOfWeek.setDate(today.getDate() - daysFromMonday); // Segunda-feira
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Domingo
      endOfWeek.setHours(23, 59, 59, 999);
      
      console.log('🔍 Buscando sessões da semana (Segunda a Domingo):', {
        startOfWeek: startOfWeek.toISOString(),
        endOfWeek: endOfWeek.toISOString(),
        today: today.toISOString()
      });
      
      // Adicionar um timestamp para evitar cache
      const timestamp = new Date().getTime();
      const response = await fetch(
        `http://localhost:3001/api/study-sessions?startDate=${startOfWeek.toISOString()}&endDate=${endOfWeek.toISOString()}&limit=10&_=${timestamp}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Resposta da API de sessões:', data);
        if (data.success && data.data) {
          // Debug para verificar se os eventos têm o campo 'completed'
          data.data.forEach((session: StudySession) => {
            console.log(`Evento: ${session.event.title}, completed: ${session.event.completed}`);
          });
          
          setStudySessions(data.data);
          const grouped = groupSessionsByEvent(data.data);
          setGroupedStudySessions(grouped);
          
          // Debug para verificar se o agrupamento mantém o valor 'completed'
          grouped.forEach((group) => {
            console.log(`Grupo: ${group.eventTitle}, eventCompleted: ${group.eventCompleted}`);
          });
          
          console.log('✅ Sessões carregadas:', data.data.length);
        } else {
          setStudySessions([]);
          setGroupedStudySessions([]);
          console.log('⚠️ Nenhuma sessão encontrada');
        }
      } else {
        console.error('❌ Erro ao carregar sessões de estudo');
        setStudySessions([]);
        setGroupedStudySessions([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar sessões de estudo:', error);
    } finally {
      setSessionsLoading(false);
    }
  }, [groupSessionsByEvent]);

  // Carregar eventos e sessões quando o componente montar
  useEffect(() => {
    loadEvents();
    loadWeeklyStudySessions();
  }, [loadEvents, loadWeeklyStudySessions]);

  // Reprocessar sessões agrupadas quando studySessions mudar
  useEffect(() => {
    if (studySessions.length > 0) {
      setGroupedStudySessions(groupSessionsByEvent(studySessions));
    } else {
      setGroupedStudySessions([]);
    }
  }, [studySessions, groupSessionsByEvent]);

  // CSS customizado para scrollbar
  useEffect(() => {
    const scrollbarStyles = `
      .events-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .events-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .events-scrollbar::-webkit-scrollbar-thumb {
        background: ${
          isDarkMode
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(168, 85, 247, 0.5))"
            : "linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(147, 51, 234, 0.5))"
        };
        border-radius: 3px;
      }
      .events-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${
          isDarkMode
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(168, 85, 247, 0.7))"
            : "linear-gradient(135deg, rgba(124, 58, 237, 0.7), rgba(147, 51, 234, 0.7))"
        };
      }
    `;

    const style = document.createElement("style");
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);

  // Dados resumidos para o dashboard
  const totalTechnologies = technologies?.length || 0;

  // Função para obter eventos do dia atual
  const getTodayEvents = () => {
    const today = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === today.getDate() && 
             eventDate.getMonth() === today.getMonth() &&
             eventDate.getFullYear() === today.getFullYear() &&
             !event.completed; // Apenas eventos não concluídos
    });
  };

  // Função para obter eventos de um dia específico
  const getDayEvents = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  // Array de nomes de meses para referência
  const fullMonthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  // Função para formatar tempo em minutos para horas e minutos
  const formatStudyTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Função para formatar data relativa
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  // Funções para gerenciar metas
  const handleAddGoal = () => {
    setEditingGoal(null);
    setIsGoalsModalOpen(true);
  };

  const handleEditGoal = (goal: { id: string; title: string; description?: string }) => {
    setEditingGoal(goal);
    setIsGoalsModalOpen(true);
  };

  const handleSaveGoal = async (goalData: { title: string; description?: string }) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, goalData);
      } else {
        await addGoal(goalData);
      }
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
    }
  };

  const handleToggleGoal = async (goalId: string) => {
    try {
      await toggleGoalCompletion(goalId);
    } catch (error) {
      console.error('Erro ao alternar meta:', error);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await removeGoal(goalId);
    } catch (error) {
      console.error('Erro ao remover meta:', error);
    }
  };

  // Funções para gerenciar sessões de estudo
  const handleStartStudyClick = (eventId: string, eventTitle: string, eventType: string) => {
    setSelectedEvent({ id: eventId, title: eventTitle, type: eventType });
    setIsStudyModalOpen(true);
  };

  const handleStartStudy = (duration: number, breakDuration: number) => {
    if (!selectedEvent) return;

    startSession({
      eventTitle: selectedEvent.title,
      eventId: selectedEvent.id,
      duration,
      breakDuration,
    });

    setIsStudyModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Header Modernizado */}
      <header
        className={`flex-shrink-0 text-white shadow-2xl backdrop-blur-md border-b
        ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-900/90 to-violet-900/90 border-purple-700/30"
            : "bg-gradient-to-r from-purple-600/95 to-violet-600/95 border-purple-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
              <HomeIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Home
              </h1>
              <p className="text-lg text-white/80 font-medium">
                Bem-vindo de volta! Aqui está seu resumo de desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 pb-8">
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
            {/* Total de Tecnologias */}
            <div
              onClick={() => onNavigate("gallery")}
              className={`group p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl cursor-pointer hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-purple-500/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50 hover:border-purple-400/50"
              }`}
              title="Clique para ver a galeria de tecnologias"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Temas
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {totalTechnologies}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    Clique para ver galeria de estudo
                  </p>
                </div>
                <div
                  className={`p-2 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-blue-500/20 group-hover:bg-blue-500/30"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}
                >
                  <Code2
                    className={`w-6 h-6 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Progresso da Semana */}
            <div
              onClick={() => onNavigate("dashboard")}
              className={`group p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl cursor-pointer hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-purple-500/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50 hover:border-purple-400/50"
              }`}
              title="Clique para ver o dashboard"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Esta Semana
                  </p>
                  {weeklyStatsLoading ? (
                    <div className="flex items-center mt-1 gap-2">
                      <div className="w-4 h-4 border-2 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                      <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-500"}`}>
                        Carregando...
                      </span>
                    </div>
                  ) : (
                    <p
                      className={`text-2xl font-bold mt-1 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {weeklyStats?.formattedTime || "0h"}
                    </p>
                  )}
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    {weeklyStats?.totalSessions 
                      ? `${weeklyStats.totalSessions} sessões - Clique para dashboard` 
                      : "de estudos - Clique para dashboard"}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-purple-500/20 group-hover:bg-purple-500/30"
                      : "bg-purple-100 group-hover:bg-purple-200"
                  }`}
                >
                  <Clock
                    className={`w-6 h-6 ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Container para Histórico de Estudos e Metas da Semana */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            {/* Histórico de Estudos da Semana */}
            <div
              className={`rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl flex flex-col min-h-0 ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 border-b flex-shrink-0 ${
                  isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-4 rounded-xl ${
                        isDarkMode
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500"
                      } shadow-lg`}
                    >
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Histórico da Semana
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Últimos temas estudados
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        console.log('🔄 Recarregando sessões...');
                        // Força uma nova requisição sem cache
                        fetch('http://localhost:3001/api/study-sessions?nocache=' + new Date().getTime())
                          .then(r => r.text())
                          .then(console.log)
                          .catch(console.error);
                        loadWeeklyStudySessions();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      Atualizar Agora
                    </button>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Histórico com altura fixa e scroll */}
              <div 
                className="flex-1 overflow-y-auto min-h-0 events-scrollbar"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode
                    ? "rgba(71, 85, 105, 0.5) transparent"
                    : "rgba(148, 163, 184, 0.5) transparent",
                }}
              >
                <div className="p-4">
                  {sessionsLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className={`w-8 h-8 border-2 border-dashed rounded-full animate-spin ${
                        isDarkMode ? "border-emerald-400" : "border-emerald-600"
                      }`}></div>
                      <p className={`text-sm mt-2 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        Carregando histórico...
                      </p>
                    </div>
                  ) : groupedStudySessions.length > 0 ? (
                    <div className="space-y-4">
                      {groupedStudySessions.map((groupedSession) => (
                      <div
                        key={groupedSession.eventId}
                        onClick={() => onNavigate("dashboard")}
                        className={`p-4 rounded-xl border cursor-pointer ${
                          isDarkMode
                            ? "bg-slate-700/50 border-slate-600/50"
                            : "bg-slate-50/80 border-slate-200/50"
                        }`}
                      >
                        {/* Cabeçalho da Sessão */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {/* Linha do topo com título e badges */}
                            <div className="flex items-start gap-3 mb-1">
                              <h4
                                className={`font-semibold text-sm flex-1 ${
                                  isDarkMode ? "text-white" : "text-slate-800"
                                }`}
                              >
                                {groupedSession.eventTitle}
                              </h4>
                              
                              {/* Container dos badges com espaçamento adequado */}
                              <div className="flex items-center gap-2">
                                {/* Badge da Tecnologia */}
                                {groupedSession.technology && (
                                  <span
                                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                      isDarkMode
                                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                        : "bg-violet-100 text-violet-700 border border-violet-200"
                                    }`}
                                  >
                                    📚 {groupedSession.technology.name}
                                  </span>
                                )}
                                
                                {/* Badge do Tipo de Evento */}
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                                    groupedSession.eventType === "STUDY"
                                      ? isDarkMode 
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                      : groupedSession.eventType === "PROJECT"
                                      ? isDarkMode 
                                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                        : "bg-blue-100 text-blue-700 border border-blue-200"
                                      : isDarkMode 
                                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                        : "bg-violet-100 text-violet-700 border border-violet-200"
                                  }`}
                                >
                                  <Target className="w-3 h-3" />
                                  {groupedSession.eventType === "STUDY" 
                                    ? "Estudo" 
                                    : groupedSession.eventType === "PROJECT" 
                                    ? "Projeto" 
                                    : groupedSession.eventType === "REVIEW"
                                    ? "Revisão"
                                    : groupedSession.eventType === "MEETING"
                                    ? "Reunião"
                                    : groupedSession.eventType === "WORKSHOP"
                                    ? "Workshop"
                                    : groupedSession.eventType === "PRESENTATION"
                                    ? "Apresentação"
                                    : groupedSession.eventType === "PLANNING"
                                    ? "Planejamento"
                                    : groupedSession.eventType === "DEADLINE"
                                    ? "Prazo"
                                    : groupedSession.eventType}
                                </span>
                              </div>
                            </div>

                            {groupedSession.eventDescription && (
                              <p
                                className={`text-xs mb-1 ${
                                  isDarkMode ? "text-slate-300" : "text-slate-600"
                                }`}
                              >
                                {groupedSession.eventDescription}
                              </p>
                            )}
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {formatRelativeDate(groupedSession.lastSessionDate)}
                            </p>
                          </div>
                        </div>

                        {/* Estatísticas da Sessão */}
                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className={`p-3 rounded-lg ${
                              isDarkMode
                                ? "bg-slate-600/30 border border-slate-500/30"
                                : "bg-white/80 border border-slate-200/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className={`w-3 h-3 ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`} />
                              <span
                                className={`text-sm font-medium ${
                                  isDarkMode ? "text-slate-300" : "text-slate-700"
                                }`}
                              >
                                Sessões
                              </span>
                            </div>
                            <p
                              className={`text-lg font-bold ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {groupedSession.totalSessions} {groupedSession.totalSessions === 1 ? 'sessão' : 'sessões'}
                            </p>
                          </div>

                          <div
                            className={`p-3 rounded-lg ${
                              isDarkMode
                                ? "bg-slate-600/30 border border-slate-500/30"
                                : "bg-white/80 border border-slate-200/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className={`w-3 h-3 ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-600"
                              }`} />
                              <span
                                className={`text-sm font-medium ${
                                  isDarkMode ? "text-slate-300" : "text-slate-700"
                                }`}
                              >
                                Tempo Total
                              </span>
                            </div>
                            <p
                              className={`text-lg font-bold ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-600"
                              }`}
                            >
                              {formatStudyTime(groupedSession.totalStudyTime)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Estado vazio */
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center py-8">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                          isDarkMode
                            ? "bg-slate-700/50 border border-slate-600/50"
                            : "bg-slate-100/50 border border-slate-200/50"
                        }`}
                      >
                        <BookOpen
                          className={`w-8 h-8 ${
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <h4
                        className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Nenhum estudo esta semana
                      </h4>
                      <p
                        className={`text-sm mb-4 ${
                          isDarkMode ? "text-slate-500" : "text-slate-500"
                        }`}
                      >
                        Comece uma sessão de estudo para ver seu histórico aqui
                      </p>
                      <button
                        onClick={() => onNavigate("calendar")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          isDarkMode
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-emerald-500 hover:bg-emerald-600 text-white"
                        }`}
                      >
                        Criar Evento
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>

            {/* Metas da Semana */}
            <div
              className={`rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl flex flex-col min-h-0 ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 border-b flex-shrink-0 ${
                  isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-4 rounded-xl ${
                        isDarkMode
                          ? "bg-gradient-to-r from-violet-600 to-purple-600"
                          : "bg-gradient-to-r from-violet-500 to-purple-500"
                      } shadow-lg`}
                    >
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Metas da Semana
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {goalsStats.formattedPercentage} concluídas
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleAddGoal}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
                      isDarkMode
                        ? "bg-violet-600 hover:bg-violet-700 text-white"
                        : "bg-violet-500 hover:bg-violet-600 text-white"
                    }`}
                  >
                    <Plus className="w-3 h-3" />
                    Nova Meta
                  </button>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="p-4 flex-shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Progresso da Semana
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isDarkMode ? "text-violet-400" : "text-violet-600"
                      }`}
                    >
                      {goalsStats.completedGoals} de {goalsStats.totalGoals} metas
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      isDarkMode ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`h-full transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gradient-to-r from-violet-600 to-purple-600"
                          : "bg-gradient-to-r from-violet-500 to-purple-500"
                      }`}
                      style={{ width: `${goalsStats.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lista de Metas */}
              <div 
                className="flex-1 overflow-y-auto min-h-0 events-scrollbar"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode
                    ? "rgba(71, 85, 105, 0.5) transparent"
                    : "rgba(148, 163, 184, 0.5) transparent",
                }}
              >
                <div className="p-4">
                  {goalsLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className={`w-8 h-8 border-2 border-dashed rounded-full animate-spin ${
                        isDarkMode ? "border-violet-400" : "border-violet-600"
                      }`}></div>
                      <p className={`text-sm mt-2 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        Carregando metas...
                      </p>
                    </div>
                  ) : goals.length > 0 ? (
                    <div className="space-y-3">
                      {goals.map((goal) => (
                        <div
                          key={goal.id}
                          className={`p-4 rounded-xl border transition-all duration-200 ${
                            goal.completed
                              ? isDarkMode
                                ? "bg-emerald-500/10 border-emerald-500/30"
                                : "bg-emerald-50 border-emerald-200"
                              : isDarkMode
                              ? "bg-slate-700/50 border-slate-600/50"
                              : "bg-slate-50/80 border-slate-200/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <button
                              onClick={() => handleToggleGoal(goal.id)}
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                                goal.completed
                                  ? isDarkMode
                                    ? "bg-emerald-600 border-emerald-600"
                                    : "bg-emerald-500 border-emerald-500"
                                  : isDarkMode
                                  ? "border-slate-500 hover:border-violet-400"
                                  : "border-slate-300 hover:border-violet-500"
                              }`}
                            >
                              {goal.completed && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </button>

                            {/* Conteúdo da Meta */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-semibold text-sm ${
                                  goal.completed
                                    ? isDarkMode
                                      ? "text-emerald-300 line-through"
                                      : "text-emerald-700 line-through"
                                    : isDarkMode
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                              >
                                {goal.title}
                              </h4>
                              {goal.description && (
                                <p
                                  className={`text-xs mt-1 ${
                                    goal.completed
                                      ? isDarkMode
                                        ? "text-emerald-400/70"
                                        : "text-emerald-600/70"
                                      : isDarkMode
                                      ? "text-slate-400"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {goal.description}
                                </p>
                              )}
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditGoal({
                                  id: goal.id,
                                  title: goal.title,
                                  description: goal.description,
                                })}
                                className={`p-1.5 rounded-md transition-all duration-200 hover:scale-110 ${
                                  isDarkMode
                                    ? "text-slate-400 hover:text-violet-400 hover:bg-violet-500/20"
                                    : "text-slate-500 hover:text-violet-600 hover:bg-violet-100"
                                }`}
                                title="Editar meta"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteGoal(goal.id)}
                                className={`p-1.5 rounded-md transition-all duration-200 hover:scale-110 ${
                                  isDarkMode
                                    ? "text-slate-400 hover:text-red-400 hover:bg-red-500/20"
                                    : "text-slate-500 hover:text-red-600 hover:bg-red-100"
                                }`}
                                title="Remover meta"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Estado vazio */
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center py-8">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                            isDarkMode
                              ? "bg-slate-700/50 border border-slate-600/50"
                              : "bg-slate-100/50 border border-slate-200/50"
                          }`}
                        >
                          <Target
                            className={`w-8 h-8 ${
                              isDarkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <h4
                          className={`text-lg font-semibold mb-2 ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Nenhuma meta definida
                        </h4>
                        <p
                          className={`text-sm mb-4 ${
                            isDarkMode ? "text-slate-500" : "text-slate-500"
                          }`}
                        >
                          Defina suas metas para esta semana
                        </p>
                        <button
                          onClick={handleAddGoal}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto ${
                            isDarkMode
                              ? "bg-violet-600 hover:bg-violet-700 text-white"
                              : "bg-violet-500 hover:bg-violet-600 text-white"
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                          Nova Meta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Mini Calendário e Eventos */}
            <div className="w-full lg:w-96 flex flex-col gap-4 min-h-0">
              {/* Mini Calendário */}
              <div
                className={`p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl flex-1 flex flex-col min-h-0 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                    : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isDarkMode ? "bg-violet-500/20" : "bg-violet-100"
                    }`}
                  >
                    <Calendar
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-violet-400" : "text-violet-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        isDarkMode ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {fullMonthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Clique para ver calendário
                    </p>
                  </div>
                </div>

                {/* Cabeçalho dos dias da semana */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                    <div
                      key={i}
                      className={`py-1 font-bold ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Grid do calendário */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs flex-1">
                  {(() => {
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);
                    const startOfWeek = firstDay.getDay(); // 0 = domingo, 1 = segunda, etc.
                    const daysInMonth = lastDay.getDate();

                    const days: (number | null)[] = [];

                    // Adiciona dias vazios no início
                    for (let i = 0; i < startOfWeek; i++) {
                      days.push(null);
                    }

                    // Adiciona os dias do mês
                    for (let day = 1; day <= daysInMonth; day++) {
                      days.push(day);
                    }

                    // Completa até ter pelo menos 35 células (5 semanas)
                    while (days.length < 35) {
                      days.push(null);
                    }

                    return days.map((day, index) => {
                      // Verificar se o dia tem eventos
                      const dayEvents = day ? getDayEvents(day) : [];
                      const hasEvents = dayEvents.length > 0;

                      return (
                        <div
                          key={index}
                          onClick={() => day && onNavigate("calendar")}
                          className={`h-8 flex flex-col items-center justify-center rounded-md text-xs font-medium relative ${
                            day
                              ? `cursor-pointer transition-all duration-200 hover:scale-105 ${
                                  day === currentDate.getDate()
                                    ? isDarkMode
                                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105"
                                      : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg scale-105"
                                    : isDarkMode
                                    ? "text-slate-300 hover:bg-slate-700/50"
                                    : "text-slate-700 hover:bg-slate-200/70"
                                }`
                              : ""
                          }`}
                          title={
                            day
                              ? hasEvents
                                ? `${day} - ${dayEvents
                                    .map((e) => e.title)
                                    .join(", ")}. Clique para ver o calendário completo`
                                : "Clique para ver o calendário completo"
                              : ""
                          }
                        >
                          {day && (
                            <>
                              <span>{day}</span>
                              {hasEvents && (
                                <div className="flex justify-center mt-1">
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isDarkMode ? "bg-blue-400" : "bg-blue-500"
                                    }`}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Eventos do Dia */}
              <div
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl flex-1 flex flex-col min-h-0 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                    : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                }`}
              >
                <h4
                  className={`text-base font-bold mb-4 flex-shrink-0 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Eventos de Hoje
                </h4>

                {/* Container com rolagem interna */}
                <div className="flex-1 overflow-y-auto min-h-0 events-scrollbar">
                  {/* Conteúdo dos eventos */}
                  <div className="space-y-3 pr-2">
                    {eventsLoading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className={`w-8 h-8 border-2 border-dashed rounded-full animate-spin ${
                          isDarkMode ? "border-violet-400" : "border-violet-600"
                        }`}></div>
                        <p className={`text-sm mt-2 ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Carregando eventos...
                        </p>
                      </div>
                    ) : (() => {
                      const todayEvents = getTodayEvents();
                      
                      return todayEvents.length > 0 ? (
                        todayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`p-3 rounded-lg border-l-4 ${
                              event.type === "STUDY"
                                ? isDarkMode ? "border-emerald-400" : "border-emerald-500"
                                : event.type === "PROJECT"
                                ? isDarkMode ? "border-blue-400" : "border-blue-500"
                                : event.type === "REVIEW"
                                ? isDarkMode ? "border-amber-400" : "border-amber-500"
                                : isDarkMode ? "border-violet-400" : "border-violet-500"
                            } ${
                              isDarkMode
                                ? "bg-slate-700/50 border-slate-600"
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h5
                                  className={`font-semibold text-sm ${
                                    isDarkMode ? "text-white" : "text-slate-800"
                                  }`}
                                >
                                  {event.title}
                                </h5>
                                <p
                                  className={`text-xs mt-1 ${
                                    isDarkMode ? "text-slate-400" : "text-slate-600"
                                  }`}
                                >
                                  {event.description || "Sem descrição"}
                                </p>
                                {/* Mostrar tecnologia se disponível */}
                                {event.technology && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        isDarkMode
                                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                          : "bg-violet-100 text-violet-700 border border-violet-200"
                                      }`}
                                    >
                                      {event.technology.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  handleStartStudyClick(
                                    event.id,
                                    event.title,
                                    event.type
                                  )
                                }
                                className={`ml-3 p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                                  isDarkMode
                                    ? "bg-violet-600/20 hover:bg-violet-600/30 text-violet-400"
                                    : "bg-violet-100 hover:bg-violet-200 text-violet-600"
                                }`}
                                title="Iniciar sessão de estudo"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                              isDarkMode
                                ? "bg-slate-700/50 border border-slate-600/50"
                                : "bg-slate-100/50 border border-slate-200/50"
                            }`}
                          >
                            <Calendar
                              className={`w-8 h-8 ${
                                isDarkMode ? "text-slate-500" : "text-slate-400"
                              }`}
                            />
                          </div>
                          <h5
                            className={`text-sm font-semibold mb-2 ${
                              isDarkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            Nenhum evento hoje
                          </h5>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-slate-500" : "text-slate-500"
                            }`}
                          >
                            Aproveite o dia livre ou crie novos eventos no calendário
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>

      {/* Modal de Metas da Semana */}
      <WeeklyGoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => {
          setIsGoalsModalOpen(false);
          setEditingGoal(null);
        }}
        onSave={handleSaveGoal}
        isDarkMode={isDarkMode}
        editingGoal={editingGoal}
      />

      {/* Modal de Configuração de Estudo */}
      {selectedEvent && (
        <StudyModal
          isOpen={isStudyModalOpen}
          onClose={() => {
            setIsStudyModalOpen(false);
            setSelectedEvent(null);
          }}
          eventTitle={selectedEvent.title}
          eventType={selectedEvent.type}
          onStartStudy={handleStartStudy}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Modal de Metas Semanais */}
      <WeeklyGoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => setIsGoalsModalOpen(false)}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
