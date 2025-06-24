import { StudySession } from '../types/types';
import { Play, Pause, Square, Clock, Coffee, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useEffect, useRef, memo, useCallback } from 'react';

/**
 * Z-Index Hierarchy:
 * z-40: StudyTimer (fixed position, must be below modals)
 * z-50: Modals (main content overlays)
 * z-60: Critical overlays (if any)
 */

interface StudyTimerProps {
  session: StudySession;
  isDarkMode: boolean;
  onSessionPause: () => void;
  onSessionResume: () => void;
  onSessionStop: () => void;
  onToggleMinimize: () => void;
  onSessionComplete?: () => void;
}

export const StudyTimer = memo(function StudyTimer({
  session,
  isDarkMode,
  onSessionPause,
  onSessionResume,
  onSessionStop,
  onToggleMinimize,
  onSessionComplete,
}: StudyTimerProps) {
  // Estado local para o timer (não afeta o componente pai)
  const [timeRemaining, setTimeRemaining] = useState(session.timeRemaining);
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(session.breakTimeRemaining);
  const [isBreakTime, setIsBreakTime] = useState(session.isBreakTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sincronizar com mudanças externas na sessão (pause/resume)
  useEffect(() => {
    setTimeRemaining(session.timeRemaining);
    setBreakTimeRemaining(session.breakTimeRemaining);
    setIsBreakTime(session.isBreakTime);
  }, [session.timeRemaining, session.breakTimeRemaining, session.isBreakTime]);

  // Lógica do timer interno
  useEffect(() => {
    if (!session.isActive || session.isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      if (isBreakTime) {
        // Durante o intervalo
        setBreakTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Fim do intervalo, volta para estudo
            setIsBreakTime(false);
            setTimeRemaining(session.duration * 60);
            setBreakTimeRemaining(session.breakDuration * 60);
            return session.breakDuration * 60;
          }
          return newTime;
        });
      } else {
        // Durante o estudo
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Fim do estudo
            if (session.breakDuration > 0) {
              // Iniciar intervalo
              setIsBreakTime(true);
              setBreakTimeRemaining(session.breakDuration * 60);
              return 0;
            } else {
              // Sessão completa (sem intervalo)
              if (onSessionComplete) {
                setTimeout(() => onSessionComplete(), 0);
              }
              return 0;
            }
          }
          return newTime;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session.isActive, session.isPaused, isBreakTime, session.duration, session.breakDuration, onSessionComplete]);
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handlePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSessionPause();
  }, [onSessionPause]);

  const handleResume = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSessionResume();
  }, [onSessionResume]);

  const handleStop = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSessionStop();
  }, [onSessionStop]);

  const handleToggleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMinimize();
  }, [onToggleMinimize]);

  const currentTime = isBreakTime ? breakTimeRemaining : timeRemaining;
  const totalTime = isBreakTime ? session.breakDuration * 60 : session.duration * 60;
  const progress = totalTime > 0 ? ((totalTime - currentTime) / totalTime) * 100 : 0;  return (
    <div
      className={`study-timer-container fixed bottom-6 right-6 rounded-2xl shadow-2xl border backdrop-blur-md z-40 transition-all duration-300 ${
        session.isMinimized ? 'w-48' : 'w-80'
      } ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50'
          : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/50'
      }`}
    >
      {session.isMinimized ? (
        // Versão Minimizada
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  isBreakTime
                    ? isDarkMode
                      ? 'bg-emerald-600/20'
                      : 'bg-emerald-100'
                    : isDarkMode
                    ? 'bg-violet-600/20'
                    : 'bg-violet-100'
                }`}
              >
                {isBreakTime ? (
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
                  isBreakTime
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
            
            <div className="flex items-center gap-1">              {session.isPaused ? (
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
                    isBreakTime
                      ? isDarkMode
                        ? 'bg-emerald-600/20'
                        : 'bg-emerald-100'
                      : isDarkMode
                      ? 'bg-violet-600/20'
                      : 'bg-violet-100'
                  }`}
                >
                  {isBreakTime ? (
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
                    {isBreakTime ? 'Pausa' : session.eventTitle}
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {isBreakTime ? 'Momento de descansar' : 'Sessão de estudo'}
                  </p>
                </div>
              </div>                <button
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
                isBreakTime
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
                  isBreakTime
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
              {isBreakTime
                ? `Pausa de ${session.breakDuration} minutos`
                : `Sessão de ${session.duration} minutos`}
            </p>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-slate-200/20">            <div className="flex gap-2">
              {session.isPaused ? (
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
        </>      )}
    </div>
  );
});
