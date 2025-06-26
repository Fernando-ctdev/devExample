import { Play, Pause, Square, Clock, Coffee, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useEffect, useRef, memo, useCallback } from 'react';

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
  duration: number;
  breakDuration: number;
  timeRemaining: number;
  breakTimeRemaining: number;
  isBreakTime: boolean;
  isActive: boolean;
  isPaused: boolean;
  isMinimized: boolean;
  startTime: Date;
}

const STORAGE_KEY = 'study-timer-state';

// Hook personalizado para gerenciar o timer
const useStudyTimer = () => {
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Recalcular o tempo restante baseado no tempo decorrido
        const now = new Date();
        const startTime = new Date(parsed.startTime);
        const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        
        if (parsed.isActive && !parsed.isPaused) {
          if (parsed.isBreakTime) {
            parsed.breakTimeRemaining = Math.max(0, parsed.breakTimeRemaining - elapsedSeconds);
          } else {
            parsed.timeRemaining = Math.max(0, parsed.timeRemaining - elapsedSeconds);
          }
        }
        
        setTimerState(parsed);
      } catch (error) {
        console.error('Erro ao carregar estado do timer:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Listener para eventos customizados de iniciar sessão
  useEffect(() => {
    const handleStartSession = (event: CustomEvent) => {
      const sessionData = event.detail;
      const newState: TimerState = {
        eventTitle: sessionData.eventTitle,
        duration: sessionData.duration,
        breakDuration: sessionData.breakDuration,
        timeRemaining: sessionData.duration * 60,
        breakTimeRemaining: sessionData.breakDuration * 60,
        isBreakTime: false,
        isActive: true,
        isPaused: false,
        isMinimized: false,
        startTime: new Date()
      };
      setTimerState(newState);
    };

    window.addEventListener('start-study-session', handleStartSession as EventListener);
    
    return () => {
      window.removeEventListener('start-study-session', handleStartSession as EventListener);
    };
  }, []);

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    if (timerState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timerState));
    } else {
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
          if (newBreakTime <= 0) {
            // Fim do intervalo, volta para estudo
            return {
              ...prevState,
              isBreakTime: false,
              timeRemaining: prevState.duration * 60,
              breakTimeRemaining: prevState.breakDuration * 60,
              startTime: new Date()
            };
          }
          return {
            ...prevState,
            breakTimeRemaining: newBreakTime
          };
        } else {
          // Durante o estudo
          const newTime = prevState.timeRemaining - 1;
          if (newTime <= 0) {
            // Fim do estudo
            if (prevState.breakDuration > 0) {
              // Iniciar intervalo
              return {
                ...prevState,
                isBreakTime: true,
                timeRemaining: 0,
                breakTimeRemaining: prevState.breakDuration * 60,
                startTime: new Date()
              };
            } else {
              // Sessão completa (sem intervalo)
              return null; // Remove o timer
            }
          }
          return {
            ...prevState,
            timeRemaining: newTime
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

  const startSession = useCallback((sessionData: {
    eventTitle: string;
    duration: number;
    breakDuration: number;
  }) => {
    const newState: TimerState = {
      eventTitle: sessionData.eventTitle,
      duration: sessionData.duration,
      breakDuration: sessionData.breakDuration,
      timeRemaining: sessionData.duration * 60,
      breakTimeRemaining: sessionData.breakDuration * 60,
      isBreakTime: false,
      isActive: true,
      isPaused: false,
      isMinimized: false,
      startTime: new Date()
    };
    setTimerState(newState);
  }, []);

  const pauseSession = useCallback(() => {
    setTimerState(prev => prev ? { ...prev, isPaused: true } : null);
  }, []);

  const resumeSession = useCallback(() => {
    setTimerState(prev => prev ? { ...prev, isPaused: false, startTime: new Date() } : null);
  }, []);

  const stopSession = useCallback(() => {
    setTimerState(null);
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
  const {
    timerState,
    pauseSession,
    resumeSession,
    stopSession,
    toggleMinimize
  } = useStudyTimer();

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
      duration: number;
      breakDuration: number;
    }) => void;
  }
}

window.startStudySession = (sessionData: {
  eventTitle: string;
  duration: number;
  breakDuration: number;
}) => {
  window.dispatchEvent(new CustomEvent('start-study-session', { 
    detail: sessionData 
  }));
};
