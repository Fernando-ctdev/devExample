// src/components/home/ModalContainer.tsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { NewTechnologyData, NewItemData } from "../../types/types";

interface ModalContainerProps {
  isDarkMode: boolean;
  showNewTechModal: boolean;
  showNewTopicModal: boolean;
  showNewItemModal: boolean;
  selectedCategory: string;
  selectedCategoryId: string;
  onCreateNewTechnology: (tech: NewTechnologyData) => Promise<boolean>;
  onCreateCategory: (category: string) => Promise<boolean>;
  onCreateItem: (itemData: NewItemData) => Promise<boolean>;
  onCloseModals: () => void;
}

export function ModalContainer({
  isDarkMode,
  showNewTechModal,
  showNewTopicModal,
  showNewItemModal,
  selectedCategory,
  selectedCategoryId,
  onCreateNewTechnology,
  onCreateCategory,
  onCreateItem,
  onCloseModals
}: ModalContainerProps) {  const [newTech, setNewTech] = useState<NewTechnologyData>({
    name: "",
  });

  const [newTopic, setNewTopic] = useState({
    name: "",
    categoryId: "",
  });
  const [newItem, setNewItem] = useState({
    title: "",
    categoryId: "",
  });

  // Configurar categoryId quando o modal for aberto
  useEffect(() => {
    if (showNewItemModal && selectedCategoryId) {
      setNewItem(prev => ({
        ...prev,
        categoryId: selectedCategoryId
      }));
    }
  }, [showNewItemModal, selectedCategoryId]);  const handleCancelTechModal = () => {
    setNewTech({
      name: "",
    });
    onCloseModals();
  };

  const handleCancelTopicModal = () => {
    setNewTopic({
      name: "",
      categoryId: "",
    });
    onCloseModals();
  };
  const handleCancelItemModal = () => {
    setNewItem({
      title: "",
      categoryId: "",
    });
    onCloseModals();
  };
  // Modal para Nova Tecnologia
  const NewTechModal = showNewTechModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancelTechModal}
      />
      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50"
            : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50"
        }`}
      >
        {/* Header do Modal */}
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  isDarkMode ? "bg-violet-500/20" : "bg-violet-100"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-violet-400" : "text-violet-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Nova Tecnologia
              </h3>
            </div>
            <button
              onClick={handleCancelTechModal}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "hover:bg-slate-700/50 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100/50 text-slate-500 hover:text-slate-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <form          onSubmit={async (e) => {
            e.preventDefault();
            try {
              // Enviar apenas o nome, o backend gerará os valores padrão
              const techData = {
                name: newTech.name.trim(),
              };
              
              console.log("Dados da nova tecnologia:", techData);
              await onCreateNewTechnology(techData);
              onCloseModals();              // Limpar form
              setNewTech({
                name: "",
              });
              toast.success("Tecnologia criada com sucesso!", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            } catch (error: unknown) {
              console.error("Erro ao criar tecnologia:", error);
              toast.error("Erro ao criar tecnologia", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            }
          }}
        >          <div className="p-6 space-y-6">
            {/* Nome da Tecnologia */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Nome da Tecnologia
              </label>              <input
                type="text"
                value={newTech.name}                onChange={(e) => {
                  setNewTech({ 
                    name: e.target.value
                  });
                }}
                placeholder="Ex: python, react, nodejs..."
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 focus:ring-violet-500/50 focus:border-violet-500/50"
                    : "bg-white/50 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-violet-400/50 focus:border-violet-400/50"
                }`}
                required
              /></div>
          </div>

          {/* Footer do Modal */}
          <div
            className={`p-6 border-t ${
              isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
            }`}
          >
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelTechModal}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                    : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                }`}
              >
                Cancelar
              </button>              <button
                type="submit"
                disabled={!newTech.name.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  newTech.name.trim()
                    ? isDarkMode
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                    : isDarkMode
                    ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                    : "bg-slate-200/50 text-slate-400 cursor-not-allowed"
                }`}
              >
                Criar Tecnologia
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  // Modal para Novo Tópico
  const NewTopicModal = showNewTopicModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancelTopicModal}
      />
      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50"
            : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50"
        }`}
      >
        {/* Header do Modal */}
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Nova Categoria
              </h3>
            </div>
            <button
              onClick={handleCancelTopicModal}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "hover:bg-slate-700/50 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100/50 text-slate-500 hover:text-slate-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await onCreateCategory(newTopic.name);
              handleCancelTopicModal();
              toast.success("Categoria criada com sucesso!", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            } catch (error: unknown) {
              console.error("Erro ao criar categoria:", error);
              toast.error("Erro ao criar categoria", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            }
          }}
        >
          <div className="p-6 space-y-6">
            {/* Nome da Categoria */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Nome da Categoria
              </label>
              <input
                type="text"
                value={newTopic.name}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, name: e.target.value })
                }
                placeholder="Ex: Fundamentos, Avançado, Frameworks..."
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-500/50"
                    : "bg-white/50 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-blue-400/50 focus:border-blue-400/50"
                }`}
                required
              />
            </div>

            {/* Informação adicional */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-700/20 border-slate-600/30"
                  : "bg-slate-50/50 border-slate-200/30"
              }`}
            >
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                💡 <strong>Dica:</strong> Crie categorias para organizar seus tópicos de estudo de forma clara e estruturada.
              </p>
            </div>
          </div>

          {/* Footer do Modal */}
          <div
            className={`p-6 border-t ${
              isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
            }`}
          >
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelTopicModal}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                    : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                }`}
              >
                Cancelar
              </button>              <button
                type="submit"
                disabled={!newTopic.name.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  newTopic.name.trim()
                    ? isDarkMode
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                    : isDarkMode
                    ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                    : "bg-slate-200/50 text-slate-400 cursor-not-allowed"
                }`}
              >
                Criar Categoria
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  // Modal para Novo Item
  const NewItemModal = showNewItemModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancelItemModal}
      />
      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50"
            : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50"
        }`}
      >
        {/* Header do Modal */}
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  isDarkMode ? "bg-green-500/20" : "bg-green-100"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Novo Tópico
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {selectedCategory}
                </p>
              </div>
            </div>
            <button
              onClick={handleCancelItemModal}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "hover:bg-slate-700/50 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100/50 text-slate-500 hover:text-slate-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const itemData = {
                title: newItem.title,
                categoryId: newItem.categoryId,
              };
              await onCreateItem(itemData);
              handleCancelItemModal();
              toast.success("Tópico criado com sucesso!", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            } catch (error: unknown) {
              console.error("Erro ao criar tópico:", error);
              toast.error("Erro ao criar tópico", {
                style: {
                  background: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              });
            }
          }}
        >
          <div className="p-6 space-y-6">
            {/* Título do Tópico */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Título do Tópico
              </label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                placeholder="Ex: Conceitos básicos, Sintaxe, Exemplos práticos..."
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 focus:ring-green-500/50 focus:border-green-500/50"
                    : "bg-white/50 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-green-400/50 focus:border-green-400/50"
                }`}
                required
              />
            </div>

            {/* Informação da categoria */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-700/20 border-slate-600/30"
                  : "bg-slate-50/50 border-slate-200/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-medium text-sm ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {selectedCategory}
                  </p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Categoria selecionada
                  </p>
                </div>
              </div>
            </div>

            {/* Dica */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-green-50/50 border-green-200/30"
              }`}
            >
              <p
                className={`text-sm ${
                  isDarkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                💡 <strong>Dica:</strong> Escolha um título claro e descritivo para facilitar a organização e busca dos seus estudos.
              </p>
            </div>
          </div>

          {/* Footer do Modal */}
          <div
            className={`p-6 border-t ${
              isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
            }`}
          >
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelItemModal}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                    : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                }`}
              >
                Cancelar
              </button>              <button
                type="submit"
                disabled={!newItem.title.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  newItem.title.trim()
                    ? isDarkMode
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                    : isDarkMode
                    ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                    : "bg-slate-200/50 text-slate-400 cursor-not-allowed"
                }`}
              >
                Criar Tópico
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {NewTechModal}
      {NewTopicModal}
      {NewItemModal}
    </>
  );
}
