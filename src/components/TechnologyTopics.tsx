import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  BookOpen,
  Code2,
  Search,
  Target,
  Trash2,
} from "lucide-react";
import { Technology, Topic, NewItemData } from "../types/types";
import { ModalContainer } from "./home/ModalContainer";

interface TechnologyTopicsProps {
  technology: Technology;
  topics: Topic[];
  onBackClick: () => void;
  onTopicClick: (topicId: string) => void;
  onCreateCategory: (category: string) => Promise<boolean>;
  onCreateItem: (itemData: NewItemData) => Promise<boolean>;
  onDeleteItem?: (itemId: string) => Promise<boolean>;
  onDeleteCategory?: (categoryId: string) => Promise<boolean>;
  isDarkMode: boolean;
}

export const TechnologyTopics: React.FC<TechnologyTopicsProps> = ({
  technology,
  topics,
  onBackClick,
  onTopicClick,
  onCreateCategory,
  onCreateItem,
  onDeleteItem,
  onDeleteCategory,
  isDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);
  // Debug logs
  console.log("TechnologyTopics - Technology:", technology);
  console.log("TechnologyTopics - Topics recebidos:", topics);
  console.log("TechnologyTopics - Topics length:", topics.length);
  const filteredTopics = topics
    .filter((topic) => {
      const topicName = topic.name || "";
      const topicCategory = topic.category || "";
      return (
        topicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topicCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .reverse(); // Inverter a ordem para mostrar as mais recentes primeiro

  console.log("TechnologyTopics - Filtered topics:", filteredTopics);
  const handleShowNewItemModal = (category: string, categoryId: string) => {
    setSelectedCategory(category);
    setSelectedCategoryId(categoryId);
    setShowNewItemModal(true);
  };

  const handleDeleteItem = (item: { id: string; title: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDeleteItem = async () => {
    if (itemToDelete && onDeleteItem) {
      try {
        await onDeleteItem(itemToDelete.id);
        setShowDeleteModal(false);
        setItemToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar item:', error);
      }
    }
  };

  const cancelDeleteItem = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteCategory = (category: { id: string; name: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryToDelete(category);
    setShowDeleteCategoryModal(true);
  };

  const confirmDeleteCategory = async () => {
    if (categoryToDelete && onDeleteCategory) {
      try {
        await onDeleteCategory(categoryToDelete.id);
        setShowDeleteCategoryModal(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
      }
    }
  };

  const cancelDeleteCategory = () => {
    setShowDeleteCategoryModal(false);
    setCategoryToDelete(null);
  };

  const handleCloseModals = () => {
    setShowNewTopicModal(false);
    setShowNewItemModal(false);
    setSelectedCategory("");
    setSelectedCategoryId("");
  };
  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Header Modernizado */}
      <header
        className={`sticky top-0 z-50 text-white shadow-2xl backdrop-blur-md border-b
        ${
          isDarkMode
            ? "bg-gradient-to-r from-violet-900/90 to-purple-900/90 border-slate-700/50"
            : "bg-gradient-to-r from-violet-600/95 to-purple-600/95 border-slate-200/50"
        }`}
      >        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackClick}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl 
                       bg-white/10 hover:bg-white/20 
                       transition-all duration-300 hover:scale-105
                       shadow-lg hover:shadow-xl active:scale-95 backdrop-blur-md"
            >
              <ChevronLeft size={20} />
              <span className="font-semibold">Voltar</span>
            </button>

            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20"
                style={{ backgroundColor: technology.color + "40" }}
              >
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {technology.name.charAt(0).toUpperCase() +
                    technology.name.slice(1)}
                </h1>
                <p className="text-lg text-white/80 font-medium">
                  Explore os tópicos e conceitos
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>{" "}
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {" "}        {/* Stats Cards Modernizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className={`group p-6 rounded-2xl backdrop-blur-md border shadow-xl hover:shadow-2xl
                          transition-all duration-300
                          ${
                            isDarkMode
                              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                              : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                          }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl ${
                  isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <BookOpen
                  className={`w-7 h-7 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {topics.length}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Categorias
                </p>
              </div>
            </div>
          </div>
          <div
            className={`group p-6 rounded-2xl backdrop-blur-md border shadow-xl hover:shadow-2xl
                          transition-all duration-300
                          ${
                            isDarkMode
                              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                              : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                          }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl ${
                  isDarkMode ? "bg-green-500/20" : "bg-green-100"
                }`}
              >
                <Target
                  className={`w-7 h-7 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {topics.reduce(
                    (total, topic) => total + topic.items.length,
                    0
                  )}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Tópicos
                </p>
              </div>
            </div>          </div>{" "}
        </div>

        {/* Barra de pesquisa e botão de nova categoria */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Pesquisar tópicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-violet-500/50
                         ${isDarkMode 
                           ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:border-violet-500' 
                           : 'bg-white/80 border-slate-200 text-gray-900 placeholder-slate-500 focus:border-violet-500'
                         }`}
            />
          </div>
          
          <button
            onClick={() => setShowNewTopicModal(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold
                       transition-all duration-300 hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl
                       ${isDarkMode
                         ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white'
                         : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white'
                       }`}
          >
            <Plus size={20} />
            Nova Categoria
          </button>
        </div>
        {/* Topics Grid Modernizado */}
        {filteredTopics.length > 0 ? (
          <div className="space-y-8">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className={`group rounded-2xl backdrop-blur-md border shadow-xl hover:shadow-2xl
                           transition-all duration-300
                           ${
                             isDarkMode
                               ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                               : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
                           }`}
              >
                <div className="p-8">                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className={`text-2xl font-bold tracking-tight
                                   ${
                                     isDarkMode ? "text-white" : "text-gray-900"
                                   }`}
                    >
                      {topic.category}
                    </h3>
                    <div className="flex items-center gap-2">
                      {onDeleteCategory && (
                        <button
                          onClick={(e) => handleDeleteCategory({ id: topic.id, name: topic.category }, e)}
                          className={`p-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md border
                                     ${
                                       isDarkMode
                                         ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                                         : "bg-red-100/80 border-red-200/50 text-red-600 hover:bg-red-200/80 hover:text-red-700"
                                     }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleShowNewItemModal(topic.category, topic.id)
                        }
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                                   transition-all duration-300 hover:scale-105 active:scale-95
                                   ${
                                     isDarkMode
                                       ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 border border-slate-600/50"
                                       : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200/50"
                                   }`}
                      >
                        <Plus size={16} />
                        Adicionar Tópico
                      </button>
                    </div>
                  </div>

                  {topic.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                      {topic.items.map((item) => (                        <div
                          key={item.id}
                          className={`item-card relative p-6 rounded-xl border cursor-pointer
                                     transition-all duration-300 hover:scale-105 hover:-translate-y-1
                                     shadow-lg hover:shadow-xl
                                     ${
                                       isDarkMode
                                         ? "bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-slate-600/50 hover:border-slate-500/50"
                                         : "bg-gradient-to-br from-white/60 to-slate-50/60 border-slate-200/50 hover:border-slate-300/50"
                                     }`}
                          onClick={() => {
                            console.log(
                              "Clicou no tópico - item completo:",
                              item
                            );
                            console.log("item.itemId:", item.itemId);
                            console.log("item.id:", item.id);

                            const topicId = item.itemId || item.id;
                            console.log("Usando topicId:", topicId);
                            onTopicClick(topicId);
                          }}
                          onMouseEnter={(e) => {
                            const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                            if (deleteBtn) deleteBtn.style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                            if (deleteBtn) deleteBtn.style.opacity = '0';
                          }}
                        >                          {/* Botão de deletar */}
                          {onDeleteItem && (
                            <button
                              onClick={(e) => handleDeleteItem(item, e)}
                              className={`delete-btn absolute top-3 right-3 p-2 rounded-lg
                                         transition-all duration-300 hover:scale-110 z-10 shadow-lg backdrop-blur-md border
                                         ${
                                           isDarkMode
                                             ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                                             : "bg-red-100/80 border-red-200/50 text-red-600 hover:bg-red-200/80 hover:text-red-700"
                                         }`}
                              style={{ opacity: 0 }}
                            >
                              <Trash2 size={16} />
                            </button>                          )}<h4                          className={`font-semibold text-lg mb-2 transition-colors hover:text-violet-500
                                         ${
                                           isDarkMode
                                             ? "text-white"
                                             : "text-gray-900"
                                         }`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            Clique para explorar
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`text-center py-12 border-2 border-dashed rounded-2xl
                                    ${
                                      isDarkMode
                                        ? "border-slate-600 text-slate-400"
                                        : "border-slate-300 text-slate-500"
                                    }`}
                    >
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">
                        Nenhum tópico nesta categoria
                      </p>
                      <button
                        onClick={() =>
                          handleShowNewItemModal(topic.category, topic.id)
                        }
                        className={`mt-4 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105
                                   ${
                                     isDarkMode
                                       ? "text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20"
                                       : "text-blue-600 hover:text-blue-500 bg-blue-100/80 hover:bg-blue-200/80"
                                   }`}
                      >
                        Adicionar primeiro tópico
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-20 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <BookOpen className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold mb-4">
              {searchTerm
                ? "Nenhum tópico encontrado"
                : "Nenhuma categoria criada"}
            </h3>
            <p className="text-lg mb-8 max-w-md mx-auto">
              {searchTerm
                ? "Tente ajustar sua pesquisa para encontrar os tópicos desejados."
                : "Comece criando sua primeira categoria de estudos para organizar seus tópicos."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowNewTopicModal(true)}
                className={`flex items-center gap-3 mx-auto px-8 py-4 rounded-2xl font-semibold
                           transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl
                           ${
                             isDarkMode
                               ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                               : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                           }`}
              >
                <Plus size={20} />
                Criar primeira categoria
              </button>
            )}
          </div>
        )}
      </main>      {/* Modals */}
      <ModalContainer
        isDarkMode={isDarkMode}
        showNewTechModal={false}
        showNewTopicModal={showNewTopicModal}
        showNewItemModal={showNewItemModal}
        selectedCategory={selectedCategory}
        selectedCategoryId={selectedCategoryId}
        onCreateNewTechnology={async () => false}
        onCreateCategory={onCreateCategory}
        onCreateItem={onCreateItem}
        onCloseModals={handleCloseModals}
      />

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDeleteItem}
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
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Tem certeza de que deseja excluir este tópico? Esta ação não pode ser desfeita e todos os exemplos relacionados também serão removidos.
              </p>
              <div
                className={`p-4 rounded-xl border ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/50"
                    : "bg-slate-50/50 border-slate-200/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDarkMode 
                        ? "bg-gradient-to-br from-green-600 to-green-700" 
                        : "bg-gradient-to-br from-green-500 to-green-600"
                    }`}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {itemToDelete.title}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Tópico
                    </p>
                  </div>
                </div>
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
                  onClick={cancelDeleteItem}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                      : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteItem}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                  }`}
                >
                  Excluir Tópico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão de Categoria */}
      {showDeleteCategoryModal && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDeleteCategory}
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
                    Confirmar Exclusão de Categoria
                  </h3>
                </div>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Tem certeza de que deseja excluir esta categoria? Esta ação não pode ser desfeita e todos os tópicos e exemplos relacionados também serão removidos.
              </p>
              <div
                className={`p-4 rounded-xl border ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/50"
                    : "bg-slate-50/50 border-slate-200/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDarkMode 
                        ? "bg-gradient-to-br from-green-600 to-green-700" 
                        : "bg-gradient-to-br from-green-500 to-green-600"
                    }`}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {categoryToDelete.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Categoria
                    </p>
                  </div>
                </div>
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
                  onClick={cancelDeleteCategory}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                      : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteCategory}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                  }`}
                >
                  Excluir Categoria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
