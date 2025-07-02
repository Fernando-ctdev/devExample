import { useState, useEffect, useCallback } from "react";
import { HomeProps } from "../types/types";
import { Calendar, Code2, TrendingUp, Clock, Play, Loader2 } from "lucide-react";
import { StudyModal } from "./StudyModal";
import { useStudyTimerControl } from "../hooks/useStudyTimer";
import { useWeeklyStats } from "../hooks/useWeeklyStats";

export function Home({ isDarkMode, technologies, onNavigate }: HomeProps) {
  const [currentDate] = useState(new Date());
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    type: string;
  } | null>(null);
  const { startSession } = useStudyTimerControl();
  const { stats: weeklyStats, loading: weeklyStatsLoading } = useWeeklyStats();

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

  const [events, setEvents] = useState<StudyEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

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

  // Carregar eventos quando o componente montar
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

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
  }, [isDarkMode]);  // Dados resumidos para o dashboard
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

  // Gerar dados de atividade de estudos baseado no conteúdo real
  const generateStudyActivity = () => {
    const data = [];
    const today = new Date();

    // Gerar dados dos últimos 12 meses
    for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
      const currentMonth = new Date(
        today.getFullYear(),
        today.getMonth() - monthOffset,
        1
      );
      const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        );

        // Parar se passou de hoje
        if (date > today) break;

        // Simular atividade de estudos
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        const studyChance = isWeekend ? 0.2 : 0.6;
        const hasStudy = Math.random() < studyChance;

        let intensity = 0;
        if (hasStudy) {
          const topicsStudied = Math.floor(Math.random() * 4) + 1;
          intensity = Math.min(topicsStudied, 4);
        }

        data.push({
          date: date.toISOString().split("T")[0],
          count: intensity,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          dayOfWeek: date.getDay(),
          formattedDate: date.toLocaleDateString("pt-BR"),
        });
      }
    }

    return data;
  };

  const studyData = generateStudyActivity();
  const totalStudyDays = studyData.filter((day) => day.count > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = studyData.length - 1; i >= 0; i--) {
      if (studyData[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();
  // Agrupar dados por mês
  const monthlyData = [];
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const fullMonthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (let i = 0; i < 12; i++) {
    const monthData = studyData.filter((day) => {
      const monthIndex = (new Date().getMonth() - 11 + i + 12) % 12;
      return day.month === monthIndex;
    });

    monthlyData.push({
      name: monthNames[i],
      days: monthData,
    });
  }
  const getIntensityColor = (count: number) => {
    if (count === 0) {
      return isDarkMode
        ? "bg-slate-800/50 border-slate-700/30"
        : "bg-slate-100 border-slate-200/50";
    }

    const colors = isDarkMode
      ? [
          "bg-emerald-900/60 border-emerald-800/40", // 1 tópico
          "bg-emerald-700/70 border-emerald-600/50", // 2 tópicos
          "bg-emerald-500/80 border-emerald-400/60", // 3 tópicos
          "bg-emerald-400/90 border-emerald-300/70", // 4+ tópicos
        ]
      : [
          "bg-emerald-200 border-emerald-300/60", // 1 tópico
          "bg-emerald-300 border-emerald-400/70", // 2 tópicos
          "bg-emerald-400 border-emerald-500/80", // 3 tópicos
          "bg-emerald-500 border-emerald-600/90", // 4+ tópicos
        ];

    return colors[Math.min(count - 1, 3)];
  };

  // Funções para gerenciar sessões de estudo
  const handleStartStudyClick = (eventTitle: string, eventType: string) => {
    setSelectedEvent({ title: eventTitle, type: eventType });
    setIsStudyModalOpen(true);
  };
  const handleStartStudy = (duration: number, breakDuration: number) => {
    if (!selectedEvent) return;

    startSession({
      eventTitle: selectedEvent.title,
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
            ? "bg-gradient-to-r from-violet-900/90 to-purple-900/90 border-slate-700/50"
            : "bg-gradient-to-r from-violet-600/95 to-purple-600/95 border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
              <TrendingUp className="w-7 h-7 text-white" />
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
      </header>{" "}
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-6 py-6 pb-14 flex flex-col h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Cards de Estatísticas */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
                {/* Total de Tecnologias */}
                <div
                  onClick={() => onNavigate("gallery")}
                  className={`group p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl cursor-pointer hover:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-blue-500/50"
                      : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50 hover:border-blue-400/50"
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
                      </p>{" "}
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
                        Clique para ver galeria
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
                </div>{" "}
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
                    </div>{" "}
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
              </div>{" "}
              {/* Gráfico de Atividade de Estudos */}
              <div
                className={`rounded-2xl border backdrop-blur-md p-6 transition-all duration-300 hover:shadow-2xl shadow-xl flex-1 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                    : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        isDarkMode
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500"
                      } shadow-lg`}
                    >
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Atividade de Estudos
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {totalStudyDays} dias de estudo • {currentStreak} dias
                        consecutivos
                      </p>
                    </div>
                  </div>
                </div>{" "}
                {/* Grid de Contribuições */}
                <div className="overflow-x-auto flex-1">
                  <div className="min-w-full space-y-3 h-full flex flex-col justify-center py-6">
                    {/* Primeira linha - 6 meses */}
                    <div className="grid grid-cols-6 gap-2 lg:gap-4">
                      {monthlyData.slice(0, 6).map((month, monthIndex) => (
                        <div
                          key={month.name}
                          className="flex flex-col items-center"
                        >
                          {/* Nome do Mês */}
                          <div className="mb-1.5">
                            <span
                              className={`text-xs lg:text-sm font-medium ${
                                isDarkMode ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {month.name}
                            </span>
                          </div>

                          {/* Indicadores de dias da semana */}
                          <div className="grid grid-cols-7 gap-0.5 lg:gap-1 mb-1">
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              S
                            </span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              Q
                            </span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              D
                            </span>
                          </div>

                          {/* Dias do Mês */}
                          <div className="grid grid-cols-7 gap-0.5 lg:gap-1">
                            {Array.from({ length: 35 }, (_, index) => {
                              // Encontrar o primeiro dia do mês para calcular offset
                              const firstDay =
                                month.days.length > 0 ? month.days[0] : null;
                              const startOffset = firstDay
                                ? (firstDay.dayOfWeek + 6) % 7
                                : 0; // Ajuste para segunda = 0

                              const dayIndex = index - startOffset;
                              const day = month.days[dayIndex];

                              if (
                                !day ||
                                dayIndex < 0 ||
                                dayIndex >= month.days.length
                              ) {
                                return (
                                  <div
                                    key={`${monthIndex}-${index}`}
                                    className="w-2 h-2 lg:w-3 lg:h-3"
                                  />
                                );
                              }

                              return (
                                <div
                                  key={`${monthIndex}-${index}`}
                                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm border transition-all duration-200 hover:scale-110 cursor-pointer ${getIntensityColor(
                                    day.count
                                  )}`}
                                  title={`${day.formattedDate}: ${
                                    day.count === 0
                                      ? "Sem estudos"
                                      : `${day.count} tópico${
                                          day.count > 1 ? "s" : ""
                                        } estudado${day.count > 1 ? "s" : ""}`
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Segunda linha - 6 meses */}
                    <div className="grid grid-cols-6 gap-2 lg:gap-4">
                      {monthlyData.slice(6, 12).map((month, monthIndex) => (
                        <div
                          key={month.name}
                          className="flex flex-col items-center"
                        >
                          {/* Nome do Mês */}
                          <div className="mb-1.5">
                            <span
                              className={`text-xs lg:text-sm font-medium ${
                                isDarkMode ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {month.name}
                            </span>
                          </div>

                          {/* Indicadores de dias da semana */}
                          <div className="grid grid-cols-7 gap-0.5 lg:gap-1 mb-1">
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              S
                            </span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              Q
                            </span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span className="w-2 h-2 lg:w-3 lg:h-3"></span>
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-slate-500" : "text-slate-500"
                              } text-center`}
                            >
                              D
                            </span>
                          </div>

                          {/* Dias do Mês */}
                          <div className="grid grid-cols-7 gap-0.5 lg:gap-1">
                            {Array.from({ length: 35 }, (_, index) => {
                              // Encontrar o primeiro dia do mês para calcular offset
                              const firstDay =
                                month.days.length > 0 ? month.days[0] : null;
                              const startOffset = firstDay
                                ? (firstDay.dayOfWeek + 6) % 7
                                : 0; // Ajuste para segunda = 0

                              const dayIndex = index - startOffset;
                              const day = month.days[dayIndex];

                              if (
                                !day ||
                                dayIndex < 0 ||
                                dayIndex >= month.days.length
                              ) {
                                return (
                                  <div
                                    key={`${monthIndex + 6}-${index}`}
                                    className="w-2 h-2 lg:w-3 lg:h-3"
                                  />
                                );
                              }

                              return (
                                <div
                                  key={`${monthIndex + 6}-${index}`}
                                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm border transition-all duration-200 hover:scale-110 cursor-pointer ${getIntensityColor(
                                    day.count
                                  )}`}
                                  title={`${day.formattedDate}: ${
                                    day.count === 0
                                      ? "Sem estudos"
                                      : `${day.count} tópico${
                                          day.count > 1 ? "s" : ""
                                        } estudado${day.count > 1 ? "s" : ""}`
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Legenda */}
                    <div className="flex items-center justify-between mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-slate-200/50">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs lg:text-sm ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Menos
                        </span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm border ${getIntensityColor(
                                level
                              )}`}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-xs lg:text-sm ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Mais
                        </span>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-xs lg:text-sm ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Baseado em tópicos e tecnologias estudadas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Mini Calendário e Eventos */}
            <div className="flex flex-col gap-4 h-full min-h-0">
              {" "}
              {/* Mini Calendário */}{" "}
              <div
                className={`p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-2xl shadow-xl h-1/2 flex flex-col min-h-0 ${
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
                      {fullMonthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h3>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Clique para ver calendário
                    </p>
                  </div>
                </div>{" "}
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
                </div>{" "}
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
                      const dayEvents = day
                        ? getDayEvents(day)
                        : [];
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
                                    .join(
                                      ", "
                                    )}. Clique para ver o calendário completo`
                                : "Clique para ver o calendário completo"
                              : ""
                          }
                        >
                          {" "}
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
                </h4>{" "}
                {/* Container com rolagem interna */}
                <div className="flex-1 overflow-y-auto min-h-0 events-scrollbar">
                  {" "}
                  {/* Conteúdo dos eventos */}{" "}
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
                                </h5>{" "}
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
                            Aproveite o dia livre ou crie novos eventos no
                            calendário{" "}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </main>
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
    </div>
  );
}
