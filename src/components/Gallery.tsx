import { useState, useEffect } from "react";
import { Technology, NewTechnologyData } from "../types/types";
import {
  Search,
  Plus,
  Code2,
  ChevronRight,
  Sparkles,
  Trash2,
} from "lucide-react";
import { ModalContainer } from "./home/ModalContainer";

interface GalleryProps {
  technologies: Technology[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onTechClick: (tech: string) => void;
  onCreateNewTechnology: (tech: NewTechnologyData) => Promise<boolean>;
  onDeleteTechnology?: (techId: string) => Promise<boolean>;
  isDarkMode: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({
  technologies,
  searchTerm,
  setSearchTerm,
  onTechClick,
  onCreateNewTechnology,
  onDeleteTechnology,
  isDarkMode,
}) => {
  const [showNewTechModal, setShowNewTechModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [techToDelete, setTechToDelete] = useState<Technology | null>(null);

  // CSS customizado para scrollbar
  useEffect(() => {
    const scrollbarStyles = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${
          isDarkMode ? "rgba(71, 85, 105, 0.5)" : "rgba(148, 163, 184, 0.5)"
        };
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${
          isDarkMode ? "rgba(71, 85, 105, 0.7)" : "rgba(148, 163, 184, 0.7)"
        };
      }
    `;

    const style = document.createElement("style");
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);

  // Debug logs
  console.log("Gallery - Technologies recebidas:", technologies);
  console.log("Gallery - Technologies length:", technologies.length);
  const filteredTechnologies = technologies.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Encontrar a tecnologia mais recente baseada no createdAt
  const mostRecentTech = filteredTechnologies.reduce((latest, current) => {
    if (!latest || !current.createdAt || !latest.createdAt) return current;

    const currentDate = new Date(current.createdAt);
    const latestDate = new Date(latest.createdAt);

    return currentDate > latestDate ? current : latest;
  }, null as Technology | null);

  console.log("Gallery - Filtered technologies:", filteredTechnologies);
  console.log("Gallery - Most recent tech:", mostRecentTech);
  const handleTechClick = (tech: string) => {
    console.log("Gallery - Tech clicada:", tech);
    onTechClick(tech);
  };

  const handleDeleteTech = (tech: Technology, e: React.MouseEvent) => {
    e.stopPropagation();
    setTechToDelete(tech);
    setShowDeleteModal(true);
  };
  const confirmDeleteTech = async () => {
    if (techToDelete) {
      try {
        if (onDeleteTechnology) {
          // Usar a função do componente pai
          await onDeleteTechnology(techToDelete.id);
        } else {
          // Fallback para API direta
          const response = await fetch(`/api/technologies/${techToDelete.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao excluir tecnologia");
          }
        }

        console.log("Tecnologia excluída com sucesso");
        setShowDeleteModal(false);
        setTechToDelete(null);
      } catch (error) {
        console.error("Erro ao excluir tecnologia:", error);
        alert("Erro ao excluir tecnologia. Tente novamente.");
      }
    }
  };

  const cancelDeleteTech = () => {
    setShowDeleteModal(false);
    setTechToDelete(null);
  };
  return (
    <div
      className={`h-full overflow-y-auto custom-scrollbar ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: isDarkMode
          ? "rgba(71, 85, 105, 0.5) transparent"
          : "rgba(148, 163, 184, 0.5) transparent",
      }}
    >
      {/* Header Modernizado */}{" "}
      <header
        className={`sticky top-0 z-50 text-white shadow-2xl backdrop-blur-md border-b
        ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-900/90 to-violet-900/90 border-purple-700/30"
            : "bg-gradient-to-r from-purple-600/95 to-violet-600/95 border-purple-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Galeria de Estudo
              </h1>
              <p className="text-lg text-white/80 font-medium">
                Explore e selecione os temas para ver seus tópicos
              </p>
            </div>
          </div>
        </div>
      </header>{" "}
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Título e controles */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {searchTerm
              ? `Resultados para "${searchTerm}"`
              : "Todos os temas"}
          </h2>
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-semibold px-4 py-2 rounded-2xl backdrop-blur-md border shadow-lg ${
                isDarkMode
                  ? "bg-slate-800/80 border-slate-700/50 text-slate-300"
                  : "bg-white/80 border-slate-200/50 text-slate-600"
              }`}
            >
              {filteredTechnologies.length}{" "}
              {filteredTechnologies.length === 1 ? "Tema" : "Temas"}
            </span>
            {/* Botão Nova Tecnologia */}
            <button
              onClick={() => setShowNewTechModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 ${
                isDarkMode
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-violet-500/30"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white border-violet-400/30"
              }`}
            >
              <Plus size={16} />
              Novo Tema
            </button>
          </div>
        </div>
        {/* Barra de pesquisa */}
        <div className="relative max-w-md mb-8">
          <Search
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 shadow-lg ${
              isDarkMode
                ? "bg-slate-800/80 border-slate-700/50 text-white placeholder-slate-400 focus:ring-violet-500/50 focus:border-violet-500/50"
                : "bg-white/80 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-violet-400/50 focus:border-violet-400/50"
            }`}
          />
        </div>{" "}
        {filteredTechnologies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTechnologies.map((tech) => (
              <div
                key={tech.name}
                onClick={() => handleTechClick(tech.name)}
                className={`group relative p-4 rounded-2xl border cursor-pointer backdrop-blur-md
                           transition-all duration-300 hover:scale-105 hover:shadow-2xl
                           ${
                             isDarkMode
                               ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-purple-600/50"
                               : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50 hover:border-purple-300/60"
                           }
                           flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl min-h-[200px]`}
                style={{ backgroundColor: `${tech.color}08` }}
              >
                {" "}
                {/* Ícone da tecnologia */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${
                    isDarkMode
                      ? "bg-gradient-to-br from-violet-600 to-purple-600"
                      : "bg-gradient-to-br from-violet-500 to-purple-500"
                  }`}
                >
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                {/* Nome da tecnologia */}
                <h3
                  className={`font-bold text-lg mb-2 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {tech.name.charAt(0).toUpperCase() + tech.name.slice(1)}
                </h3>
                {/* Descrição */}
                <p
                  className={`text-xs mb-3 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Clique para explorar os tópicos
                </p>
                {/* Botão de ação */}
                <div
                  className={`flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300
                               ${
                                 isDarkMode
                                   ? "text-violet-400"
                                   : "text-violet-600"
                               }`}
                >
                  <span>Explorar</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>{" "}
                {/* Indicador de novidade (apenas para a tecnologia mais recente) */}
                {mostRecentTech && tech.id === mostRecentTech.id && (
                  <div className="absolute top-4 right-4">
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-lg
                                   ${
                                     isDarkMode
                                       ? "bg-amber-900/80 text-amber-300"
                                       : "bg-amber-100 text-amber-700"
                                   }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      Novo
                    </div>
                  </div>
                )}
                {/* Botão de Exclusão */}
                <button
                  onClick={(e) => handleDeleteTech(tech, e)}
                  className={`absolute top-4 left-4 p-2 rounded-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-md border ${
                    isDarkMode
                      ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                      : "bg-red-100/80 border-red-200/50 text-red-600 hover:bg-red-200/80 hover:text-red-700"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-20 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <div
              className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center backdrop-blur-md border shadow-xl
                           ${
                             isDarkMode
                               ? "bg-slate-800/80 border-slate-700/50"
                               : "bg-white/80 border-slate-200/50"
                           }`}
            >
              <Code2 className="w-12 h-12 opacity-50" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {searchTerm
                ? "Nenhuma tecnologia encontrada"
                : "Nenhuma tecnologia disponível"}
            </h3>
            <p className="text-lg mb-8 max-w-md mx-auto">
              {searchTerm
                ? "Tente ajustar sua pesquisa para encontrar as tecnologias desejadas."
                : "Comece criando sua primeira tecnologia para organizar seus estudos."}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border shadow-lg
                           ${
                             isDarkMode
                               ? "bg-slate-800/80 border-slate-700/50 hover:bg-slate-700/80 text-slate-200"
                               : "bg-white/80 border-slate-200/50 hover:bg-slate-50/80 text-slate-800"
                           }`}
              >
                Limpar pesquisa
              </button>
            ) : (
              <button
                onClick={() => setShowNewTechModal(true)}
                className={`flex items-center gap-3 mx-auto px-8 py-4 rounded-2xl font-semibold
                           transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl
                           ${
                             isDarkMode
                               ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                               : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                           }`}
              >
                <Plus className="w-6 h-6" />
                Criar primeira tecnologia
              </button>
            )}
          </div>
        )}
      </main>{" "}
      {/* Modal de Nova Tecnologia */}
      <ModalContainer
        isDarkMode={isDarkMode}
        showNewTechModal={showNewTechModal}
        showNewTopicModal={false}
        showNewItemModal={false}
        selectedCategory=""
        selectedCategoryId=""
        onCreateNewTechnology={onCreateNewTechnology}
        onCreateCategory={async () => false}
        onCreateItem={async () => false}
        onCloseModals={() => setShowNewTechModal(false)}
      />
      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDeleteTech}
          />
          {/* Modal */}
          <div
            className={`relative w-full max-w-sm rounded-3xl border backdrop-blur-xl shadow-2xl ${
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
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    isDarkMode ? "bg-red-500/20" : "bg-red-100"
                  }`}
                >
                  <Trash2
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Confirmar Exclusão
                </h3>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Tem certeza de que deseja excluir esta tecnologia? Esta ação não
                pode ser desfeita e todos os tópicos e exemplos relacionados
                também serão removidos.
              </p>
              {techToDelete && (
                <div
                  className={`p-4 rounded-xl border ${
                    isDarkMode
                      ? "bg-slate-700/30 border-slate-600/50"
                      : "bg-slate-50/50 border-slate-200/50"
                  }`}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDarkMode
                          ? "bg-gradient-to-br from-violet-600 to-purple-600"
                          : "bg-gradient-to-br from-violet-500 to-purple-500"
                      }`}
                    >
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {techToDelete.name.charAt(0).toUpperCase() +
                          techToDelete.name.slice(1)}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Tecnologia
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer do Modal */}
            <div
              className={`p-6 border-t ${
                isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex gap-3">
                <button
                  onClick={cancelDeleteTech}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                      : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteTech}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                  }`}
                >
                  Excluir Tecnologia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
