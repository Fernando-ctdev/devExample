import React, { useState } from "react";
import {
  Home,
  LogOut,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calendar,
  Settings,
  Code2,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  isExpanded?: boolean;
  onToggleExpansion?: (expanded: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  isExpanded: externalIsExpanded,
  onToggleExpansion,
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isExpanded =
    externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;

  const toggleExpansion = () => {
    const newExpanded = !isExpanded;
    if (onToggleExpansion) {
      onToggleExpansion(newExpanded);
    } else {
      setInternalIsExpanded(newExpanded);
    }
  };

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      onClick: () => onNavigate("home"),
    },    {
      id: "gallery",
      label: "Galeria",
      icon: ImageIcon,
      onClick: () => onNavigate("gallery"),
    },
    {
      id: "calendar",
      label: "Calendário",
      icon: Calendar,
      onClick: () => onNavigate("calendar"),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      onClick: () => onNavigate("dashboard"),
    },
    {
      id: "config",
      label: "Configurações",
      icon: Settings,
      onClick: () => onNavigate("config"),
    },
  ];

  const bottomItems = [
    {
      id: "logout",
      label: "Sair",
      icon: LogOut,
      onClick: () => {
        // TODO: Implementar logout quando tiver sistema de login
        console.log("Logout clicked");
      },
    },
  ];
  return (
    <div
      className={`
      fixed left-4 top-4 bottom-4 z-40 transition-all duration-500 ease-in-out
      ${isExpanded ? "w-72" : "w-16"}
      ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700/50"
          : "bg-gradient-to-b from-white to-slate-50/50 border-slate-200/50"
      }
      border rounded-3xl shadow-2xl backdrop-blur-md
      ${/* Hide on mobile when collapsed */ ""}
      ${!isExpanded ? "md:block hidden" : "block"}
    `}
    >
      {" "}      {/* Header com logo */}
      <div
        className={`flex items-center border-b backdrop-blur-md rounded-t-3xl ${
          isExpanded ? 'p-6' : 'px-3 py-6'
        } ${
          isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
        }`}
      >
        <div
          className={`flex items-center ${
            !isExpanded ? "w-full justify-center" : "space-x-4"
          }`}
        >
          <div
            className={`
            flex items-center justify-center w-10 h-10 rounded-2xl shadow-lg
            ${
              isDarkMode
                ? "bg-gradient-to-r from-violet-600 to-purple-600"
                : "bg-gradient-to-r from-violet-500 to-purple-500"
            }
          `}
          >
            <Code2 className="w-6 h-6 text-white" />
          </div>
          {isExpanded && (
            <div>
              <h1
                className={`font-bold text-xl bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-slate-300"
                    : "from-slate-900 to-slate-700"
                } bg-clip-text text-transparent`}
              >
                DevExamples
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                v1.0.0
              </p>
            </div>
          )}        </div>
      </div>{/* Botão de expansão - posicionado no meio da borda direita */}
      <button
        onClick={toggleExpansion}
        className={`
          absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hover:scale-110
          flex items-center justify-center w-8 h-8 rounded-lg
          ${isExpanded ? "-right-4" : "-right-4"}
          ${
            isDarkMode
              ? "hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 bg-slate-800/80"
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900 bg-white/80"
          }
          backdrop-blur-sm border shadow-lg
          ${isDarkMode ? "border-slate-600/30" : "border-slate-300/30"}
        `}
        title={isExpanded ? "Fechar sidebar" : "Expandir sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>{/* Menu principal */}
      <nav className={`flex-1 ${isExpanded ? 'p-6' : 'px-3 py-6'}`}>
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
                {" "}
                <button
                  onClick={item.onClick}
                  className={`
                    flex items-center rounded-2xl
                    transition-all duration-300 hover:scale-[1.02]
                    ${
                      !isExpanded
                        ? "w-10 h-10 justify-center mx-auto"
                        : "w-full px-4 py-3 space-x-4"
                    }
                    ${
                      isActive
                        ? isDarkMode
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                          : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                        : isDarkMode
                        ? "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                        : "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                    }
                  `}
                  title={!isExpanded ? item.label : ""}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  {isExpanded && (
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>{" "}      {/* Menu inferior */}
      <div
        className={`border-t backdrop-blur-md rounded-b-3xl ${
          isExpanded ? 'p-6' : 'px-3 py-6'
        } ${
          isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
        }`}
      >
        <ul className="space-y-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                {" "}
                <button
                  onClick={item.onClick}
                  className={`
                    flex items-center rounded-2xl
                    transition-all duration-300 hover:scale-[1.02]
                    ${
                      !isExpanded
                        ? "w-10 h-10 justify-center mx-auto"
                        : "w-full px-4 py-3 space-x-4"
                    }
                    ${
                      isDarkMode
                        ? "text-slate-300 hover:bg-red-900/20 hover:text-red-400"
                        : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                    }
                  `}
                  title={!isExpanded ? item.label : ""}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  {isExpanded && (
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>{" "}
      {/* Versão no modo compacto */}
      {!isExpanded && (
        <div
          className={`p-3 border-t backdrop-blur-md rounded-b-3xl ${
            isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
          }`}
        >
          <div
            className={`
            text-center text-xs font-semibold
            ${isDarkMode ? "text-slate-400" : "text-slate-500"}
          `}
          >
            v1.0
          </div>
        </div>
      )}
    </div>
  );
};
