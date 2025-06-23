import { StudySession } from '../types/types';
import { Play, Pause, Square, Clock, Coffee, Minimize2, Maximize2 } from 'lucide-react';

interface StudyTimerProps {
  session: StudySession;
  isDarkMode: boolean;
  onSessionComplete: () => void;
  onSessionPause: () => void;
  onSessionResume: () => void;
  onSessionStop: () => void;
  onToggleMinimize: () => void;
}

export function StudyTimer({
  session,
  isDarkMode,
  onSessionComplete,
  onSessionPause,
  onSessionResume,
  onSessionStop,
  onToggleMinimize,
}: StudyTimerProps) {
  // Agora usamos os valores do session que vem das props (gerenciado pelo App)
  const { timeRemaining, breakTimeRemaining, isBreakTime, isMinimized } = session;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = isBreakTime ? breakTimeRemaining : timeRemaining;
  const totalTime = isBreakTime ? session.breakDuration * 60 : session.duration * 60;
  const progress = ((totalTime - currentTime) / totalTime) * 100;
  return (
    <div
      className={`fixed bottom-6 right-6 rounded-2xl shadow-2xl border backdrop-blur-md z-50 transition-all duration-300 ${
        isMinimized ? 'w-48' : 'w-80'
      } ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50'
          : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/50'
      }`}
    >
      {isMinimized ? (
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
            
            <div className="flex items-center gap-1">
              {session.isPaused ? (
                <button
                  onClick={onSessionResume}
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
                  onClick={onSessionPause}
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
                onClick={onToggleMinimize}
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
              </div>
                <button
                onClick={onToggleMinimize}
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
          <div className="p-4 border-t border-slate-200/20">
            <div className="flex gap-2">
              {session.isPaused ? (
                <button
                  onClick={onSessionResume}
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
                  onClick={onSessionPause}
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
                onClick={onSessionStop}
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
}
