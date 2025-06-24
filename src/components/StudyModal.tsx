import { useState } from 'react';
import { StudyModalProps } from '../types/types';
import { Play, Clock, Coffee, X } from 'lucide-react';

export function StudyModal({ 
  isOpen, 
  onClose, 
  eventTitle, 
  onStartStudy, 
  isDarkMode 
}: StudyModalProps) {
  const [selectedDuration, setSelectedDuration] = useState(25); // 25 minutos (Pomodoro padrão)
  const [selectedBreakDuration, setSelectedBreakDuration] = useState(5); // 5 minutos de pausa

  const studyDurations = [
    { value: 15, label: '15 min', description: 'Sessão rápida' },
    { value: 25, label: '25 min', description: 'Pomodoro tradicional' },
    { value: 30, label: '30 min', description: 'Sessão média' },
    { value: 45, label: '45 min', description: 'Sessão longa' },
    { value: 60, label: '1 hora', description: 'Foco intenso' },
    { value: 120, label: '2 horas', description: 'Estudo profundo' },
  ];

  const breakDurations = [
    { value: 5, label: '5 min' },
    { value: 10, label: '10 min' },
    { value: 15, label: '15 min' },
    { value: 20, label: '20 min' },
  ];

  const handleStartStudy = () => {
    onStartStudy(selectedDuration, selectedBreakDuration);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className={`modal-content relative w-full max-w-lg rounded-2xl shadow-2xl border backdrop-blur-md z-[61] ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50'
            : 'bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/50'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/20">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600'
                  : 'bg-gradient-to-r from-violet-500 to-purple-500'
              } shadow-lg`}
            >
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}
              >
                Iniciar Sessão de Estudo
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {eventTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Duração do Estudo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-violet-400' : 'text-violet-600'
                }`}
              />
              <h3
                className={`text-base font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}
              >
                Duração do Estudo
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {studyDurations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] ${
                    selectedDuration === duration.value
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/50 shadow-lg'
                        : 'bg-gradient-to-r from-violet-100 to-purple-100 border-violet-400/50 shadow-lg'
                      : isDarkMode
                      ? 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                      : 'bg-slate-50/50 border-slate-200/50 hover:border-slate-300/50'
                  }`}
                >
                  <div
                    className={`text-lg font-bold ${
                      selectedDuration === duration.value
                        ? isDarkMode
                          ? 'text-violet-300'
                          : 'text-violet-700'
                        : isDarkMode
                        ? 'text-white'
                        : 'text-slate-800'
                    }`}
                  >
                    {duration.label}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      selectedDuration === duration.value
                        ? isDarkMode
                          ? 'text-violet-400'
                          : 'text-violet-600'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }`}
                  >
                    {duration.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duração da Pausa */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <h3
                className={`text-base font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}
              >
                Duração da Pausa
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {breakDurations.map((breakDur) => (
                <button
                  key={breakDur.value}
                  onClick={() => setSelectedBreakDuration(breakDur.value)}
                  className={`p-3 rounded-xl border text-center transition-all duration-200 hover:scale-[1.02] ${
                    selectedBreakDuration === breakDur.value
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-emerald-500/50 shadow-lg'
                        : 'bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-400/50 shadow-lg'
                      : isDarkMode
                      ? 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                      : 'bg-slate-50/50 border-slate-200/50 hover:border-slate-300/50'
                  }`}
                >
                  <div
                    className={`text-sm font-bold ${
                      selectedBreakDuration === breakDur.value
                        ? isDarkMode
                          ? 'text-emerald-300'
                          : 'text-emerald-700'
                        : isDarkMode
                        ? 'text-white'
                        : 'text-slate-800'
                    }`}
                  >
                    {breakDur.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div
            className={`p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-700/30 border-slate-600/30'
                : 'bg-slate-50/50 border-slate-200/50'
            }`}
          >
            <h4
              className={`text-sm font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}
            >
              Resumo da Sessão
            </h4>
            <div className="space-y-1 text-sm">
              <div
                className={`flex justify-between ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>Evento:</span>
                <span className="font-medium">{eventTitle}</span>
              </div>
              <div
                className={`flex justify-between ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>Duração do estudo:</span>
                <span className="font-medium">{selectedDuration} minutos</span>
              </div>
              <div
                className={`flex justify-between ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>Duração da pausa:</span>
                <span className="font-medium">{selectedBreakDuration} minutos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200/20">
          <button
            onClick={onClose}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              isDarkMode
                ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={handleStartStudy}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:scale-[1.02] shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Iniciar Estudo
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
