import React, { useState } from 'react';
import { Bell, User, Database, Palette, Settings } from 'lucide-react';

interface ConfigProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Config: React.FC<ConfigProps> = ({ isDarkMode, onToggleTheme }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const configSections = [
    {
      title: 'Aparência',
      icon: Palette,
      items: [
        {
          label: 'Tema Escuro',
          description: 'Alternar entre modo claro e escuro',
          type: 'toggle',
          value: isDarkMode,
          onChange: onToggleTheme
        },
        {
          label: 'Modo Compacto',
          description: 'Interface mais compacta para economizar espaço',
          type: 'toggle',
          value: compactMode,
          onChange: setCompactMode
        }
      ]
    },
    {
      title: 'Notificações',
      icon: Bell,
      items: [
        {
          label: 'Notificações Push',
          description: 'Receber notificações sobre lembretes de estudo',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        }
      ]
    },
    {
      title: 'Dados',
      icon: Database,
      items: [
        {
          label: 'Auto-salvar',
          description: 'Salvar automaticamente alterações nos códigos',
          type: 'toggle',
          value: autoSave,
          onChange: setAutoSave
        },
        {
          label: 'Exportar Dados',
          description: 'Fazer backup dos seus dados de estudo',
          type: 'button',
          action: () => console.log('Exportar dados')
        },
        {
          label: 'Limpar Cache',
          description: 'Limpar dados temporários do aplicativo',
          type: 'button',
          action: () => console.log('Limpar cache')
        }
      ]
    },
    {
      title: 'Conta',
      icon: User,
      items: [
        {
          label: 'Perfil',
          description: 'Gerenciar informações do perfil',
          type: 'button',
          action: () => console.log('Abrir perfil')
        },
        {
          label: 'Privacidade',
          description: 'Configurações de privacidade e segurança',
          type: 'button',
          action: () => console.log('Abrir privacidade')
        }
      ]
    }
  ];  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'}`}>
      {/* Header Padrão - Mesmo template do Calendar */}
      <header
        className={`text-white shadow-2xl backdrop-blur-md border-b flex-shrink-0 rounded-t-2xl
        ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-900/90 to-violet-900/90 border-purple-700/30"
            : "bg-gradient-to-r from-purple-600/95 to-violet-600/95 border-purple-200/50"
        }`}
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Configurações
                </h1>
                <p className="text-lg text-white/80 font-medium">
                  Personalize sua experiência de estudo
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {/* Seções de Configuração */}
        <div className="space-y-6">
          {configSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            
            return (
              <div
                key={sectionIndex}
                className={`
                  rounded-2xl border backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50' 
                    : 'bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50'
                  }
                `}
              >
                {/* Header da Seção */}
                <div className={`
                  px-6 py-4 border-b
                  ${isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'}
                `}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                      <SectionIcon className={`
                        w-5 h-5
                        ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}
                      `} />
                    </div>
                    <h2 className={`
                      text-xl font-bold tracking-tight
                      ${isDarkMode ? 'text-white' : 'text-slate-900'}
                    `}>
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Itens da Seção */}
                <div className="p-6 space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                        isDarkMode
                          ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                          : 'bg-slate-50/50 border-slate-200/50 hover:bg-slate-100/50'
                      }`}
                    >
                      <div className="flex-1">
                        <h3 className={`
                          font-semibold mb-1
                          ${isDarkMode ? 'text-white' : 'text-slate-900'}
                        `}>
                          {item.label}
                        </h3>
                        <p className={`
                          text-sm
                          ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
                        `}>
                          {item.description}
                        </p>
                      </div>

                      <div className="ml-4">
                        {item.type === 'toggle' && item.onChange && (
                          <button
                            onClick={() => item.onChange!(!(item.value as boolean))}
                            className={`
                              relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 shadow-lg
                              ${item.value
                                ? 'bg-gradient-to-r from-violet-600 to-purple-600'
                                : isDarkMode
                                  ? 'bg-slate-600'
                                  : 'bg-slate-300'
                              }
                            `}
                          >
                            <span
                              className={`
                                inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md
                                ${item.value ? 'translate-x-6' : 'translate-x-1'}
                              `}
                            />
                          </button>
                        )}

                        {item.type === 'button' && (
                          <button
                            onClick={item.action}
                            className={`
                              px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md border
                              ${isDarkMode
                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50'
                                : 'bg-slate-100/80 border-slate-200/50 text-slate-700 hover:bg-slate-200/80'
                              }
                            `}
                          >
                            Abrir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informações do Sistema */}
        <div className={`
          mt-8 p-6 rounded-2xl border backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300
          ${isDarkMode 
            ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50' 
            : 'bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50'
          }
        `}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
              <Database className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <h2 className={`
              text-xl font-bold tracking-tight
              ${isDarkMode ? 'text-white' : 'text-slate-900'}
            `}>
              Informações do Sistema
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-700/30 border-slate-600/50'
                : 'bg-slate-50/50 border-slate-200/50'
            }`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Versão
              </p>
              <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                1.0.0
              </p>
            </div>
            
            <div className={`p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-700/30 border-slate-600/50'
                : 'bg-slate-50/50 border-slate-200/50'
            }`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Última Atualização
              </p>
              <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                23 de junho de 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.5)'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(71, 85, 105, 0.7)' : 'rgba(148, 163, 184, 0.7)'};
        }
      `}</style>
    </div>
  );
};
