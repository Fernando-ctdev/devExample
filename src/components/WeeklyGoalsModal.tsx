import { useState, useEffect } from "react";
import { X, Target, Plus } from "lucide-react";

interface WeeklyGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: { title: string; description?: string }) => void;
  isDarkMode: boolean;
  editingGoal?: {
    id: string;
    title: string;
    description?: string;
  } | null;
}

export function WeeklyGoalsModal({
  isOpen,
  onClose,
  onSave,
  isDarkMode,
  editingGoal,
}: WeeklyGoalsModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Preencher campos quando editando
  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setDescription(editingGoal.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingGoal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      
      // Resetar formulário
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className={`modal-content relative w-full max-w-md rounded-2xl shadow-2xl border backdrop-blur-md z-[61] ${
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
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}
              >
                {editingGoal ? "Editar Meta" : "Nova Meta"}
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {editingGoal ? "Atualize sua meta semanal" : "Defina uma nova meta para esta semana"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Título da Meta */}
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Título da Meta *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar React por 5 horas"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-violet-500 focus:border-violet-500"
              }`}
              required
            />
          </div>

          {/* Descrição (opcional) */}
          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes sobre sua meta..."
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                isDarkMode
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-violet-500 focus:border-violet-500"
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200/20">
          <button
            onClick={handleClose}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              isDarkMode
                ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || isLoading}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  {editingGoal ? "Atualizar Meta" : "Criar Meta"}
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
