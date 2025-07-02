import { Play, Pause, Square, Clock, Coffee, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useEffect, useRef, memo, useCallback } from 'react';

// Funções para integração com a API
const createStudySession = async (eventId: string, studyDuration: number, breakDuration: number, startTime: Date) => {
  console.log('🔵 createStudySession chamada com:', {
    eventId,
    studyDuration,
    breakDuration,
    startTime: startTime.toISOString()
  });

  try {
    const payload = {
      eventId,
      studyDuration,
      breakDuration,
      startTime: startTime.toISOString(),
    };
    
    console.log('🔵 Enviando payload:', payload);
    
    const response = await fetch('http://localhost:3001/api/study-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('🔵 Response data:', data);
    
    if (data.success) {
      console.log('✅ Sessão criada com sucesso. ID:', data.data.id);
      return data.data.id;
    } else {
      console.error('❌ Erro ao criar sessão:', data.error);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro de rede ao criar sessão:', error);
    return null;
  }
};

const updateStudySession = async (sessionId: string, updateData: {
  endTime?: Date;
  actualStudyTime?: number;
  actualBreakTime?: number;
  completed?: boolean;
  paused?: boolean;
  pausedAt?: Date;
  resumedAt?: Date;
  totalPauseTime?: number;
}) => {
  try {
    const response = await fetch(`http://localhost:3001/api/study-sessions/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updateData,
        endTime: updateData.endTime?.toISOString(),
        pausedAt: updateData.pausedAt?.toISOString(),
        resumedAt: updateData.resumedAt?.toISOString(),
      }),
    });

    const data = await response.json();
    if (!data.success) {
      console.error('Erro ao atualizar sessão:', data.error);
    }
    return data.success;
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error);
    return false;
  }
};

/**
 * Z-Index Hierarchy:
 * z-40: StudyTimer (fixed position, must be below modals)
 * z-50: Modals (main content overlays)
 * z-60: Critical overlays (if any)
 */

interface StudyTimerProps {
  isDarkMode: boolean;
}

interface TimerState {
  eventTitle: string;
  eventId?: string; // ID do evento associado
  sessionId?: string; // ID da sessão no banco
  duration: number;
  breakDuration: number;
  timeRemaining: number;
  breakTimeRemaining: number;
  isBreakTime: boolean;
  isActive: boolean;
  isPaused: boolean;
  isMinimized: boolean;
  startTime: Date;
  actualStudyTime: number; // Tempo real de estudo (sem pausas)
  actualBreakTime: number; // Tempo real de intervalo
  totalPauseTime: number; // Tempo total pausado
  pausedAt?: Date; // Quando foi pausado
}

const STORAGE_KEY = 'study-timer-state';

// Hook personalizado para gerenciar o timer
const useStudyTimer = () => {
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('🔧 useStudyTimer: Hook chamado, isInitialized:', isInitialized);

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    if (isInitialized) {
      console.log('🔍 StudyTimer: Hook já foi inicializado, pulando');
      return;
    }
    
    console.log('🔍 StudyTimer: Carregando estado do localStorage...');
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        console.log('🔍 StudyTimer: Estado encontrado no localStorage:', parsed);
        
        // Converter strings de data em objetos Date
        if (parsed.startTime) {
          parsed.startTime = new Date(parsed.startTime);
        }
        if (parsed.pausedAt) {
          parsed.pausedAt = new Date(parsed.pausedAt);
        }
        
        // Recalcular o tempo restante baseado no tempo decorrido
        const now = new Date();
        const startTime = parsed.startTime;
        
        // Verificar se startTime é válido antes de calcular
        if (startTime && startTime instanceof Date && !isNaN(startTime.getTime())) {
          const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
          console.log('🔍 StudyTimer: Tempo decorrido desde o início:', elapsedSeconds, 'segundos');
          
          if (parsed.isActive && !parsed.isPaused) {
            if (parsed.isBreakTime) {
              parsed.breakTimeRemaining = Math.max(0, parsed.breakTimeRemaining - elapsedSeconds);
            } else {
              parsed.timeRemaining = Math.max(0, parsed.timeRemaining - elapsedSeconds);
            }
            console.log('🔍 StudyTimer: Tempo restante atualizado:', parsed.timeRemaining);
          }
        }
        
        console.log('🔍 StudyTimer: Restaurando estado:', parsed);
        setTimerState(parsed);
      } catch (error) {
        console.error('❌ StudyTimer: Erro ao carregar estado do timer:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      console.log('🔍 StudyTimer: Nenhum estado encontrado no localStorage');
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Definir startSession antes do listener
  const startSession = useCallback(async (sessionData: {
    eventTitle: string;
    eventId?: string;
    duration: number;
    breakDuration: number;
  }) => {
    console.log('🟡 startSession chamada com:', sessionData);
    
    const newState: TimerState = {
      eventTitle: sessionData.eventTitle,
      eventId: sessionData.eventId,
      duration: sessionData.duration,
      breakDuration: sessionData.breakDuration,
      timeRemaining: sessionData.duration * 60,
      breakTimeRemaining: sessionData.breakDuration * 60,
      isBreakTime: false,
      isActive: true,
      isPaused: false,
      isMinimized: false,
      startTime: new Date(),
      actualStudyTime: 0,
      actualBreakTime: 0,
      totalPauseTime: 0
    };
    
    console.log('🟡 Estado inicial criado:', newState);
    
    // Criar sessão no banco de dados se eventId foi fornecido
    if (sessionData.eventId) {
      console.log('🟡 Criando sessão no banco para eventId:', sessionData.eventId);
      const sessionId = await createStudySession(
        sessionData.eventId,
        sessionData.duration,
        sessionData.breakDuration,
        newState.startTime
      );
      if (sessionId) {
        console.log('🟡 SessionId obtido:', sessionId);
        newState.sessionId = sessionId;
      } else {
        console.log('🟡 Falha ao obter sessionId');
      }
    } else {
      console.log('🟡 Nenhum eventId fornecido, sessão não será salva no banco');
    }
    
    console.log('🟡 Estado final antes de setTimerState:', newState);
    setTimerState(newState);
  }, []);

  // Listener para eventos customizados de iniciar sessão
  useEffect(() => {
    const handleStartSession = (event: CustomEvent) => {
      console.log('🟢 Evento start-study-session recebido:', event.detail);
      const sessionData = event.detail;
      // Chama a função startSession que contém a lógica de criação no banco
      startSession(sessionData);
    };

    console.log('🟢 Registrando listener para start-study-session');
    window.addEventListener('start-study-session', handleStartSession as EventListener);
    
    return () => {
      console.log('🟢 Removendo listener para start-study-session');
      window.removeEventListener('start-study-session', handleStartSession as EventListener);
    };
  }, [startSession]);

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    if (timerState) {
      console.log('💾 StudyTimer: Salvando estado no localStorage:', timerState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timerState));
    } else {
      console.log('💾 StudyTimer: Removendo estado do localStorage');
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [timerState]);

  // Lógica do timer
  useEffect(() => {
    if (!timerState || !timerState.isActive || timerState.isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimerState(prevState => {
        if (!prevState) return null;

        if (prevState.isBreakTime) {
          // Durante o intervalo
          const newBreakTime = prevState.breakTimeRemaining - 1;
          const newActualBreakTime = prevState.actualBreakTime + 1;
          
          if (newBreakTime <= 0) {
            // Fim do intervalo - sessão completa!
            if (prevState.sessionId) {
              const now = new Date();
              updateStudySession(prevState.sessionId, {
                endTime: now,
                actualStudyTime: prevState.actualStudyTime,
                actualBreakTime: newActualBreakTime,
                completed: true,
                totalPauseTime: prevState.totalPauseTime,
              });
            }
            return null; // Remove o timer - sessão completamente finalizada
          }
          return {
            ...prevState,
            breakTimeRemaining: newBreakTime,
            actualBreakTime: newActualBreakTime
          };
        } else {
          // Durante o estudo
          const newTime = prevState.timeRemaining - 1;
          const newActualStudyTime = prevState.actualStudyTime + 1;
          
          if (newTime <= 0) {
            // Fim do estudo
            if (prevState.breakDuration > 0) {
              // Iniciar intervalo
              return {
                ...prevState,
                isBreakTime: true,
                timeRemaining: 0,
                actualStudyTime: newActualStudyTime,
                breakTimeRemaining: prevState.breakDuration * 60,
                startTime: new Date()
              };
            } else {
              // Sessão completa (sem intervalo) - salvar no banco
              if (prevState.sessionId) {
                const now = new Date();
                updateStudySession(prevState.sessionId, {
                  endTime: now,
                  actualStudyTime: newActualStudyTime,
                  actualBreakTime: prevState.actualBreakTime,
                  completed: true,
                  totalPauseTime: prevState.totalPauseTime,
                });
              }
              return null; // Remove o timer
            }
          }
          return {
            ...prevState,
            timeRemaining: newTime,
            actualStudyTime: newActualStudyTime
          };
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerState]);

  const pauseSession = useCallback(async () => {
    setTimerState(prev => {
      if (!prev) return null;
      
      const now = new Date();
      const updatedState = { ...prev, isPaused: true, pausedAt: now };
      
      // Atualizar no banco se há sessionId
      if (prev.sessionId) {
        updateStudySession(prev.sessionId, {
          paused: true,
          pausedAt: now,
        });
      }
      
      return updatedState;
    });
  }, []);

  const resumeSession = useCallback(async () => {
    setTimerState(prev => {
      if (!prev) return null;
      
      const now = new Date();
      let newTotalPauseTime = prev.totalPauseTime;
      
      // Calcular tempo de pausa se estava pausado
      if (prev.pausedAt) {
        const pausedAtDate = prev.pausedAt instanceof Date ? prev.pausedAt : new Date(prev.pausedAt);
        const pauseDuration = Math.floor((now.getTime() - pausedAtDate.getTime()) / 1000);
        newTotalPauseTime = prev.totalPauseTime + pauseDuration;
      }
      
      const updatedState = { 
        ...prev, 
        isPaused: false, 
        startTime: now,
        totalPauseTime: newTotalPauseTime,
        pausedAt: undefined
      };
      
      // Atualizar no banco se há sessionId
      if (prev.sessionId) {
        updateStudySession(prev.sessionId, {
          paused: false,
          resumedAt: now,
          totalPauseTime: newTotalPauseTime,
        });
      }
      
      return updatedState;
    });
  }, []);

  const stopSession = useCallback(async () => {
    setTimerState(prev => {
      if (!prev) return null;
      
      // Salvar sessão no banco se há sessionId
      if (prev.sessionId) {
        const now = new Date();
        const totalStudyTime = prev.duration * 60 - prev.timeRemaining;
        const totalBreakTime = prev.breakDuration * 60 - prev.breakTimeRemaining;
        
        updateStudySession(prev.sessionId, {
          endTime: now,
          actualStudyTime: totalStudyTime,
          actualBreakTime: totalBreakTime,
          completed: false, // Parado manualmente
          totalPauseTime: prev.totalPauseTime,
        });
      }
      
      return null;
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setTimerState(prev => prev ? { ...prev, isMinimized: !prev.isMinimized } : null);
  }, []);

  return {
    timerState,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    toggleMinimize
  };
};

export const StudyTimer = memo(function StudyTimer({ isDarkMode }: StudyTimerProps) {
  console.log('🔄 StudyTimer: Componente renderizado/re-renderizado');
  
  const {
    timerState,
    pauseSession,
    resumeSession,
    stopSession,
    toggleMinimize
  } = useStudyTimer();

  console.log('🔄 StudyTimer: Estado atual do timer:', timerState);

  // Monitor de lifecycle do componente
  useEffect(() => {
    console.log('🟢 StudyTimer: Componente montado');
    return () => {
      console.log('🔴 StudyTimer: Componente desmontado');
    };
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handlePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    pauseSession();
  }, [pauseSession]);

  const handleResume = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    resumeSession();
  }, [resumeSession]);

  const handleStop = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    stopSession();
  }, [stopSession]);

  const handleToggleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMinimize();
  }, [toggleMinimize]);

  // Se não há sessão ativa, não renderizar nada
  if (!timerState) return null;

  const currentTime = timerState.isBreakTime ? timerState.breakTimeRemaining : timerState.timeRemaining;
  const totalTime = timerState.isBreakTime ? timerState.breakDuration * 60 : timerState.duration * 60;
  const progress = totalTime > 0 ? ((totalTime - currentTime) / totalTime) * 100 : 0;  return (
    <div
      className={`study-timer-container fixed bottom-6 right-6 rounded-2xl shadow-2xl border backdrop-blur-md z-40 transition-all duration-300 ${
        timerState.isMinimized ? 'w-48' : 'w-80'
      } ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50'
          : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/50'
      }`}
    >
      {timerState.isMinimized ? (
        // Versão Minimizada
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  timerState.isBreakTime
                    ? isDarkMode
                      ? 'bg-emerald-600/20'
                      : 'bg-emerald-100'
                    : isDarkMode
                    ? 'bg-violet-600/20'
                    : 'bg-violet-100'
                }`}
              >
                {timerState.isBreakTime ? (
                  <Coffee
                    className={`w-4 h-4 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <Clock
                    className={`w-4 h-4 ${
                      isDarkMode ? 'text-violet-400' : 'text-violet-600'
                    }`}
                  />
                )}
              </div>
              <div
                className={`text-lg font-bold ${
                  timerState.isBreakTime
                    ? isDarkMode
                      ? 'text-emerald-300'
                      : 'text-emerald-600'
                    : isDarkMode
                    ? 'text-violet-300'
                    : 'text-violet-600'
                }`}
              >
                {formatTime(currentTime)}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {timerState.isPaused ? (
                <button
                  onClick={handleResume}
                  className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                    isDarkMode
                      ? 'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                      : 'bg-green-100 hover:bg-green-200 text-green-600'
                  }`}
                  title="Continuar"
                >
                  <Play className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                    isDarkMode
                      ? 'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400'
                      : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'
                  }`}
                  title="Pausar"
                >
                  <Pause className="w-3 h-3" />
                </button>
              )}
                <button
                onClick={handleToggleMinimize}
                className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Expandir"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Versão Expandida
        <>
          {/* Header */}
          <div className="p-4 border-b border-slate-200/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    timerState.isBreakTime
                      ? isDarkMode
                        ? 'bg-emerald-600/20'
                        : 'bg-emerald-100'
                      : isDarkMode
                      ? 'bg-violet-600/20'
                      : 'bg-violet-100'
                  }`}
                >
                  {timerState.isBreakTime ? (
                    <Coffee
                      className={`w-5 h-5 ${
                        isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    />
                  ) : (
                    <Clock
                      className={`w-5 h-5 ${
                        isDarkMode ? 'text-violet-400' : 'text-violet-600'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-sm font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {timerState.isBreakTime ? 'Pausa' : timerState.eventTitle}
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {timerState.isBreakTime ? 'Momento de descansar' : 'Sessão de estudo'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggleMinimize}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Minimizar"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timer Display */}
          <div className="p-6 text-center">
            <div
              className={`text-4xl font-bold mb-2 ${
                timerState.isBreakTime
                  ? isDarkMode
                    ? 'text-emerald-300'
                    : 'text-emerald-600'
                  : isDarkMode
                  ? 'text-violet-300'
                  : 'text-violet-600'
              }`}
            >
              {formatTime(currentTime)}
            </div>

            {/* Progress Bar */}
            <div
              className={`w-full h-2 rounded-full mb-4 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  timerState.isBreakTime
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                    : isDarkMode
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                    : 'bg-gradient-to-r from-violet-400 to-purple-400'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <p
              className={`text-xs ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {timerState.isBreakTime
                ? `Pausa de ${timerState.breakDuration} minutos`
                : `Sessão de ${timerState.duration} minutos`}
            </p>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-slate-200/20">
            <div className="flex gap-2">
              {timerState.isPaused ? (
                <button
                  onClick={handleResume}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Continuar
                  </div>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Pause className="w-4 h-4" />
                    Pausar
                  </div>
                </button>
              )}

              <button
                onClick={handleStop}
                className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700/50 text-slate-300 hover:bg-red-600/20 hover:text-red-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

// Função utilitária para iniciar uma sessão de estudo de outros componentes
declare global {
  interface Window {
    startStudySession: (sessionData: {
      eventTitle: string;
      eventId?: string;
      duration: number;
      breakDuration: number;
    }) => void;
  }
}

window.startStudySession = (sessionData: {
  eventTitle: string;
  eventId?: string;
  duration: number;
  breakDuration: number;
}) => {
  console.log('🟠 window.startStudySession chamada com:', sessionData);
  window.dispatchEvent(new CustomEvent('start-study-session', { 
    detail: sessionData 
  }));
  console.log('🟠 Evento start-study-session disparado');
};
