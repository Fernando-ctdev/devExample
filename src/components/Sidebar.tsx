import React, { useState } from "react";
import {
  Home,
  LogOut,
  Book,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calendar,
  Settings,
  Award,
  Brain,
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
    },
    {
      id: "gallery",
      label: "Galeria",
      icon: Book,
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
      id: "certificates",
      label: "Certificados",
      icon: Award,
      onClick: () => onNavigate("certificates"),
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
          ? "bg-gradient-to-b from-slate-900/90 to-purple-900/80 border-purple-700/30"
          : "bg-gradient-to-b from-white/90 to-purple-50/90 border-purple-200/50"
      }
      border rounded-3xl shadow-2xl backdrop-blur-md
      ${!isExpanded ? "md:block hidden" : "block"}
    `}
    >
      {/* Header com logo */}
      <div
        className={`flex items-center border-b backdrop-blur-md rounded-t-3xl ${
          isExpanded ? "p-6" : "px-3 py-6"
        } ${isDarkMode ? "border-purple-700/30" : "border-purple-200/50"}`}
      >
        <div
          className={`flex items-center ${
            !isExpanded ? "w-full justify-center" : "space-x-4"
          }`}
        >
          <div
            className={`
            flex items-center justify-center w-10 h-10 rounded-2xl shadow-lg
            bg-gradient-to-r from-purple-500 to-violet-500
          `}
          >
            <Brain className="w-6 h-6 text-white" />
          </div>
          {isExpanded && (
            <div>
              <h1
                className={`font-bold text-xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent`}
              >
                Mindra
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Aprendizado Inteligente
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botão de expansão - posicionado no meio da borda direita */}
      <button
        onClick={toggleExpansion}
        className={`
          absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hover:scale-110
          flex items-center justify-center w-8 h-8 rounded-lg
          -right-4
          ${
            isDarkMode
              ? "hover:bg-purple-700/50 text-purple-400 hover:text-purple-200 bg-purple-800/80"
              : "hover:bg-purple-100 text-purple-600 hover:text-purple-900 bg-white/80"
          }
          backdrop-blur-sm border shadow-lg
          ${isDarkMode ? "border-purple-600/30" : "border-purple-300/30"}
        `}
        title={isExpanded ? "Fechar sidebar" : "Expandir sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Menu principal */}
      <nav className={`flex-1 ${isExpanded ? "p-6" : "px-3 py-6"}`}>
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
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
                        ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30"
                        : isDarkMode
                        ? "text-slate-300 hover:bg-purple-700/30 hover:text-purple-200"
                        : "text-slate-700 hover:bg-purple-100/70 hover:text-purple-800"
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
      </nav>

      {/* Menu inferior */}
      <div
        className={`border-t backdrop-blur-md rounded-b-3xl ${
          isExpanded ? "p-6" : "px-3 py-6"
        } ${isDarkMode ? "border-purple-700/30" : "border-purple-200/50"}`}
      >
        <ul className="space-y-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
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
      </div>
    </div>
  );
};
