import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStats, DateRangeType } from "../hooks/useDashboardStats";
import { DateRangePicker } from "./DateRangePicker";

interface DashboardProps {
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [dateRange, setDateRange] = useState<DateRangeType>("this_week");

  const { stats, loading, error, refetch } = useDashboardStats(dateRange);

  const handleDateRangeChange = (range: DateRangeType) => {
    setDateRange(range);
  };

  // Função para formatar tempo em horas
  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
  };

  // Garantir que sempre temos os 7 dias da semana no gráfico
  const getWeeklyProgressData = () => {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // Criar array com todos os dias da semana
    const weeklyData = daysOfWeek.map((day) => {
      // Procurar se existe dados para este dia
      const dayData = stats?.weeklyProgress?.find((item) => item.day === day);
      return {
        day,
        horas: dayData?.horas || 0,
        estudos: dayData?.estudos || 0,
      };
    });

    return weeklyData;
  };

  // Se está carregando, mostrar loading
  if (loading) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          <p
            className={`text-lg font-medium ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Carregando estatísticas...
          </p>
        </div>
      </div>
    );
  }

  // Se há erro, mostrar erro
  if (error) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-500 text-center">
            <p className="text-lg font-medium">Erro ao carregar estatísticas</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Se não há dados, mostrar mensagem
  if (!stats) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        }`}
      >
        <p
          className={`text-lg font-medium ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Nenhuma estatística encontrada
        </p>
      </div>
    );
  }

  // Dados para os cards de estatísticas
  const statsCards = [
    {
      title: "Eventos Criados",
      value: stats.totalEvents.toString(),
      icon: BarChart3,
      color: "blue",
      subtitle: `${stats.completedEvents} concluídos`,
    },
    {
      title: "Sessões de Estudo",
      value: stats.totalSessions.toString(),
      icon: TrendingUp,
      color: "green",
      subtitle: "Total de sessões",
    },
    {
      title: "Tempo de Estudo",
      value: formatStudyTime(stats.totalStudyTime),
      icon: Activity,
      color: "purple",
      subtitle: "Tempo total",
    },
    {
      title: "Sequência Atual",
      value: `${stats.currentStreak} dias`,
      icon: Users,
      color: "orange",
      subtitle: "Dias consecutivos",
    },
  ];
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
        className={`flex-shrink-0 text-white shadow-2xl backdrop-blur-md border-b relative z-50
        ${
          isDarkMode
            ? "bg-gradient-to-r from-violet-900/90 to-purple-900/90 border-slate-700/50"
            : "bg-gradient-to-r from-violet-600/95 to-purple-600/95 border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Analytics
                </h1>
                <p className="text-lg text-white/80 font-medium">
                  Acompanhe seu progresso detalhado nos estudos
                </p>
              </div>
            </div>

            {/* Date Range Picker */}
            <DateRangePicker
              currentRange={dateRange}
              onChange={handleDateRangeChange}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <div className="container mx-auto px-6 py-8 flex flex-col h-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 flex-shrink-0">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl border cursor-pointer backdrop-blur-md
                         transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         ${
                           isDarkMode
                             ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-slate-600/50"
                             : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50 hover:border-slate-300/60"
                         }
                         shadow-xl hover:shadow-2xl`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`
                  p-3 rounded-2xl transition-all duration-300 shadow-lg group-hover:scale-110
                  ${
                    stat.color === "blue"
                      ? isDarkMode
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                      : stat.color === "green"
                      ? isDarkMode
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-emerald-100 text-emerald-600"
                      : stat.color === "purple"
                      ? isDarkMode
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-violet-100 text-violet-600"
                      : isDarkMode
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-amber-100 text-amber-600"
                  }
                `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        stat.color === "blue"
                          ? isDarkMode
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                          : stat.color === "green"
                          ? isDarkMode
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                          : stat.color === "purple"
                          ? isDarkMode
                            ? "bg-violet-500/20 text-violet-300"
                            : "bg-violet-100 text-violet-700"
                          : isDarkMode
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {stat.subtitle}
                    </span>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {stat.title}
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}{" "}
          </div>{" "}
          {/* Seções de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 pb-6">
            {" "}
            <div
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl flex flex-col ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-700/30"
                  : "bg-gradient-to-br from-white/80 via-white/60 to-slate-50/80 border-slate-200/50"
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                  <div
                    className={`p-3 rounded-2xl ${
                      isDarkMode
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                        : "bg-gradient-to-r from-indigo-100 to-purple-100"
                    }`}
                  >
                    <TrendingUp
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Progresso Semanal
                  </h3>
                </div>{" "}
                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getWeeklyProgressData()}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: isDarkMode ? "#94a3b8" : "#64748b",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: isDarkMode ? "#94a3b8" : "#64748b",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="horas"
                        stroke={isDarkMode ? "#8b5cf6" : "#7c3aed"}
                        strokeWidth={3}
                        dot={{
                          fill: isDarkMode ? "#8b5cf6" : "#7c3aed",
                          strokeWidth: 2,
                          r: 5,
                        }}
                        activeDot={{
                          r: 7,
                          stroke: isDarkMode ? "#8b5cf6" : "#7c3aed",
                          strokeWidth: 2,
                          fill: isDarkMode ? "#1e293b" : "#ffffff",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>{" "}
            <div
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl flex flex-col ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-700/30"
                  : "bg-gradient-to-br from-white/80 via-white/60 to-slate-50/80 border-slate-200/50"
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                  <div
                    className={`p-3 rounded-2xl ${
                      isDarkMode
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                        : "bg-gradient-to-r from-emerald-100 to-teal-100"
                    }`}
                  >
                    <BarChart3
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Temas Mais Estudados
                  </h3>
                </div>{" "}
                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.technologiesData} layout="horizontal">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                        opacity={0.5}
                      />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: isDarkMode ? "#94a3b8" : "#64748b",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: isDarkMode ? "#94a3b8" : "#64748b",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        width={80}
                      />
                      <Bar
                        dataKey="value"
                        fill={isDarkMode ? "#10b981" : "#059669"}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
