import React, { useState } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { DateRangeType } from '../hooks/useDashboardStats';

interface DateRangePickerProps {
  currentRange: DateRangeType;
  onChange: (range: DateRangeType) => void;
  isDarkMode: boolean;
}

const rangeOptions = [
  { value: 'this_week', label: 'Esta Semana' },
  { value: 'this_month', label: 'Este Mês' },
  { value: 'this_year', label: 'Este Ano' }
] as const;

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  currentRange,
  onChange,
  isDarkMode
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = rangeOptions.find(option => option.value === currentRange)?.label || 'Esta Semana';

  const handleRangeSelect = (range: DateRangeType) => {
    onChange(range);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105 ${
          isDarkMode
            ? 'bg-slate-800/60 border-slate-700/50 text-white hover:bg-slate-700/60'
            : 'bg-white/80 border-slate-200/50 text-slate-700 hover:bg-white'
        } backdrop-blur-md shadow-lg hover:shadow-xl`}
      >
        <Calendar className="w-4 h-4" />
        <span className="font-medium text-sm">
          {currentLabel}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div 
          className={`absolute top-full right-0 mt-2 w-80 rounded-xl border shadow-2xl backdrop-blur-xl z-[9999] ${
            isDarkMode
              ? 'bg-slate-800/95 border-slate-700/50'
              : 'bg-white/95 border-slate-200/50'
          }`}
        >
          <div className="p-4">
            <h4 className={`font-semibold text-sm mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-700'
            }`}>
              Selecionar Período
            </h4>
            
            <div className="space-y-2">
              {rangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRangeSelect(option.value)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    currentRange === option.value
                      ? isDarkMode
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                        : 'bg-violet-100 text-violet-700 border border-violet-200'
                      : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-700/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  {currentRange === option.value && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay para fechar o dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
