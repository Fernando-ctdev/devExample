import React from "react";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
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

interface DashboardProps {
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  // Dados mockup para os gráficos
  const weeklyProgressData = [
    { day: "Seg", horas: 2.5, estudos: 3 },
    { day: "Ter", horas: 4.2, estudos: 5 },
    { day: "Qua", horas: 3.8, estudos: 4 },
    { day: "Qui", horas: 5.1, estudos: 6 },
    { day: "Sex", horas: 3.2, estudos: 4 },
    { day: "Sáb", horas: 6.3, estudos: 8 },
    { day: "Dom", horas: 2.1, estudos: 2 },
  ];

  const technologiesData = [
    { name: "React", value: 35 },
    { name: "TypeScript", value: 28 },
    { name: "Node.js", value: 22 },
    { name: "Python", value: 18 },
    { name: "Next.js", value: 15 },
    { name: "GraphQL", value: 12 },
  ];

  const stats = [
    {
      title: "Temas Estudados",
      value: "12",
      icon: BarChart3,
      color: "blue",
    },
    {
      title: "Exemplos Criados",
      value: "48",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Horas de Estudo",
      value: "127h",
      icon: Activity,
      color: "purple",
    },
    {
      title: "Projetos Concluídos",
      value: "8",
      icon: Users,
      color: "orange",
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-6 py-8 flex flex-col h-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 flex-shrink-0">
            {stats.map((stat, index) => {
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
                      {stat.color === "blue"
                        ? "12"
                        : stat.color === "green"
                        ? "+15%"
                        : stat.color === "purple"
                        ? "ATIVO"
                        : "META"}
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
                </div>                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData}>
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
                          fontWeight: 500
                        }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ 
                          fill: isDarkMode ? "#94a3b8" : "#64748b", 
                          fontSize: 12,
                          fontWeight: 500
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
                          r: 5 
                        }}
                        activeDot={{ 
                          r: 7, 
                          stroke: isDarkMode ? "#8b5cf6" : "#7c3aed",
                          strokeWidth: 2,
                          fill: isDarkMode ? "#1e293b" : "#ffffff"
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
                    Temas Mais Estudadas
                  </h3>
                </div>                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={technologiesData} layout="horizontal">
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
                          fontWeight: 500
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
                          fontWeight: 500
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
