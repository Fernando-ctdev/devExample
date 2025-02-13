import {
  Search,
  ChevronRight,
  Code2,
  BookOpen,
  Moon,
  Sun,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; 

interface TopicItem {
  id: string;
  itemId: string;
  title: string;
}

interface Topic {
  id: string;
  name: string;
  technologyId: string;
  category: string; // Adicionado este campo
  items: TopicItem[];
}

interface Technology {
  id: string;
  name: string;
  title: string;
  color: string;
  hoverColor: string;
  logo: string;
  alt: string;
  padding: string;
}

interface HomeProps {
  searchTerm: string;
  onSearchChange: (value: string) => void; // Adicionado
  onExampleClick: (id: string) => void;    // Adicionado
  currentTech: string;
  onTechChange: (tech: string) => void;
  topics: Topic[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  onCreateNewTechnology: (tech: NewTechnologyData) => Promise<boolean>;
  onCreateCategory: (category: string) => Promise<boolean>;
  onCreateItem: (itemData: NewItemData) => Promise<boolean>;
  technologies: Technology[]; // Atualizado o tipo
}

interface NewTechnologyData {
  name: string;
  title: string;
  color: string;
  hoverColor: string;
  logo: string;
  alt: string;
  padding: string;
}

interface NewItemData {
  itemId: string;
  title: string;
  categoryId: string;
}


const getRandomColor = () => {
  const gradients = [
    {
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
    },
    {
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      hoverColor: "hover:from-purple-500 hover:to-purple-700",
    },
    {
      color: "bg-gradient-to-r from-red-400 to-red-600",
      hoverColor: "hover:from-red-500 hover:to-red-700",
    },
    {
      color: "bg-gradient-to-r from-green-400 to-green-600",
      hoverColor: "hover:from-green-500 hover:to-green-700",
    },
    {
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      hoverColor: "hover:from-yellow-500 hover:to-yellow-700",
    },
    {
      color: "bg-gradient-to-r from-pink-400 to-pink-600",
      hoverColor: "hover:from-pink-500 hover:to-pink-700",
    },
    {
      color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
      hoverColor: "hover:from-indigo-500 hover:to-indigo-700",
    },
    {
      color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
      hoverColor: "hover:from-cyan-500 hover:to-cyan-700",
    },
    {
      color: "bg-gradient-to-r from-teal-400 to-teal-600",
      hoverColor: "hover:from-teal-500 hover:to-teal-700",
    },
  ];

  const currentGradient =
    gradients[Math.floor(Math.random() * gradients.length)];
  return currentGradient;
};

export function Home({
  searchTerm,
  onSearchChange,
  onExampleClick,
  currentTech,
  onTechChange,
  topics,
  isDarkMode,
  toggleTheme,
  onCreateNewTechnology,
  onCreateCategory,
  onCreateItem, 
  technologies, 
}: HomeProps) {

  useEffect(() => {
    console.log("Topics received in Home:", topics);
  }, [topics]);

  const [showNewTechModal, setShowNewTechModal] = useState(false);
  const [newTech, setNewTech] = useState(() => {
    const gradient = getRandomColor();
    return {
      name: "",
      title: "",
      color: gradient.color,
      hoverColor: gradient.hoverColor,
      logo: "",
      alt: "",
      padding: "px-8 py-3",
    };
  });

  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    category: "",
    items: [],
  });

  //modal de novo item e a categoria selecionada
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newItem, setNewItem] = useState({
    id: "",
    title: "",
    categoryId: "", 
  });

  const techButtons = [
    {
      title: "JavaScript with example",
      tech: "javascript",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      hoverColor: "hover:from-yellow-500 hover:to-yellow-700",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
      alt: "JavaScript Logo",
      padding: "px-5 py-3",
    },
    {
      title: "TypeScript with example",
      tech: "typescript",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
      alt: "TypeScript Logo",
      padding: "px-5 py-3",
    },
    {
      title: "GoLang with example",
      tech: "golang",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      hoverColor: "hover:from-cyan-600 hover:to-blue-600",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
      alt: "GoLang Logo",
      padding: "px-8 py-3",
    },
    {
      title: "Gin Gonic with example",
      tech: "gin",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      hoverColor: "hover:from-cyan-600 hover:to-blue-600",
      logo: "https://avatars.githubusercontent.com/u/7894478?v=4",
      alt: "gin Logo",
      padding: "px-12 py-3",
    },
    {
      title: "NodeJS with example",
      tech: "nodejs",
      color: "bg-gradient-to-r from-cyan-600 to-green-700",
      hoverColor: "hover:from-cyan-800 hover:to-green-700",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
      alt: "NodeJS Logo",
      padding: "px-8 py-3",
    },
    {
      title: "NestJS with example",
      tech: "nestjs",
      color: "bg-gradient-to-r from-cyan-600 to-red-700",
      hoverColor: "hover:from-cyan-800 hover:to-red-700",
      logo: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
      alt: "NestJS Logo",
      padding: "px-8 py-3",
    },
    {
      title: "SQL with example",
      tech: "sql",
      color: "bg-gradient-to-r from-orange-300 to-orange-700",
      hoverColor: "hover:from-orange-400 hover:to-orange-800",
      logo: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
      alt: "SQL Logo",
      padding: "px-12 py-3",
    },
  ];


  const staticTechNames = techButtons.map((btn) => btn.tech);

  // Filtrar apenas as tecnologias que não estão nos botões estáticos
  const dynamicTechButtons =
    technologies
      ?.filter((tech) => !staticTechNames.includes(tech.name))
      .map((tech) => ({
        title: tech.title,
        tech: tech.name,
        color: tech.color,
        hoverColor: tech.hoverColor,
        logo: tech.logo,
        alt: tech.alt,
        padding: tech.padding,
      })) || [];

  // Combinar os botões estáticos com as tecnologias dinâmicas filtradas
  const allTechButtons = [...techButtons, ...dynamicTechButtons];

  const AddNewTechButton = (
    <button
      onClick={() => setShowNewTechModal(true)}
      className={`flex items-center gap-2 px-6 py-3 
        ${isDarkMode 
          ? "bg-gray-700 hover:bg-gray-600 text-gray-400" 
          : "bg-gray-200 hover:bg-gray-300 text-gray-400"}
        rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        hover:text-blue-400 group`}
    >
      <Plus size={24} className="transition-colors duration-200" />
      <span className="font-medium transition-colors duration-200">Nova Tech</span>
    </button>
  );

  const AddNewTopicButton = (
    <button
      onClick={() => setShowNewTopicModal(true)}
      className={`p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex items-center justify-center gap-2
        ${
          isDarkMode
            ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-400"
            : "bg-white hover:bg-gray-50 text-gray-400 hover:text-blue-500"
        }`}
    >
      <Plus size={24} />
      <span className="font-medium">Nova Categoria</span>
    </button>
  );

  // Função para salvar posição do scroll antes de navegar
  const handleExampleClick = (id: string) => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    onExampleClick(id);
  };

  // Restaura a posição do scroll quando o componente é montado
  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo({
        top: parseInt(savedPosition),
        behavior: "auto",
      });
      // Limpa a posição salva após restaurar
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  // Função para mudar de tecnologia e voltar ao topo
  const handleTechChange = (tech: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onTechChange(tech);
  };

  // Função para filtrar tópicos baseado no termo de busca
  const filteredTopics = topics && topics.length > 0
  ? topics
      .map((topic) => ({
        ...topic,
        items: topic.items?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [],
      }))
      .filter((topic) =>
        searchTerm
          ? topic.items.length > 0 ||
            topic.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
  : [];

  console.log("Filtered topics:", filteredTopics);


  const handleCancelTechModal = () => {
    setNewTech({
      name: "",
      title: "",
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      hoverColor: "hover:from-purple-600 hover:to-purple-800",
      logo: "",
      alt: "",
      padding: "px-8 py-3",
    });
    setShowNewTechModal(false);
  };

  const handleCancelTopicModal = () => {
    setNewTopic({
      category: "",
      items: [],
    });
    setShowNewTopicModal(false);
  };

  const handleCancelItemModal = () => {
    setNewItem({
      id: "",
      title: "",
      categoryId: "",
    });
    setSelectedCategory("");
    setShowNewItemModal(false);
  };

  // Adicionar função para gerar novo gradiente
  const generateNewGradient = () => {
    const gradient = getRandomColor();
    setNewTech((prev) => ({
      ...prev,
      color: gradient.color,
      hoverColor: gradient.hoverColor,
    }));
  };

  // Modificar o NewTechModal para usar toast
  const NewTechModal = (
    <>
      {showNewTechModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-xl max-w-md w-full mx-4`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Adicionar Nova Tecnologia
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  console.log("Dados da nova tecnologia:", newTech); // Debug
                  await onCreateNewTechnology(newTech);
                  setShowNewTechModal(false);
                  // Limpar form
                  setNewTech({
                    name: "",
                    title: "",
                    color: "bg-gradient-to-r from-purple-500 to-purple-700",
                    hoverColor: "hover:from-purple-600 hover:to-purple-800",
                    logo: "",
                    alt: "",
                    padding: "px-8 py-3",
                  });
                  toast.success("Tecnologia criada com sucesso!", {
                    style: {
                      background: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  });
                } catch (error: unknown) {
                  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                  toast.error("Erro ao criar tecnologia: " + errorMessage, {
                    style: {
                      background: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  });
                }
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome da tecnologia (ex: python)"
                  value={newTech.name}
                  onChange={(e) =>
                    setNewTech({
                      ...newTech,
                      name: e.target.value,
                      alt: `${e.target.value} Logo`,
                    })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                <input
                  type="text"
                  placeholder="Título de exibição (ex: Python with example)"
                  value={newTech.title}
                  onChange={(e) =>
                    setNewTech({ ...newTech, title: e.target.value })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                <input
                  type="url"
                  placeholder="URL da logo da tecnologia SEM FUNDO"
                  value={newTech.logo}
                  onChange={(e) =>
                    setNewTech({ ...newTech, logo: e.target.value })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                {/* Adicionar preview do botão e botão de gerar nova cor */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-3 px-8 py-3 ${newTech.color} ${newTech.hoverColor} text-white rounded-xl transition-all duration-300`}
                    onClick={(e) => {
                      e.preventDefault();
                      generateNewGradient();
                    }}
                  >
                    Clique para gerar cor do botão
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelTechModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  // Modificar o NewTopicModal para usar toast
  const NewTopicModal = (
    <>
      {showNewTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-xl max-w-md w-full mx-4`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Adicionar Nova Categoria em {currentTech}
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const categoryName = newTopic.category.trim();

                if (!categoryName) {
                  toast.error("Nome da categoria é obrigatório", {
                    style: {
                      background: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  });
                  return;
                }

                try {
                  console.log("Enviando requisição para criar categoria:", {
                    category: categoryName,
                    technologyId: currentTech,
                  });

                  const success = await onCreateCategory(categoryName);

                  if (success) {
                    toast.success("Categoria criada com sucesso!", {
                      style: {
                        background: isDarkMode ? "#333" : "#fff",
                        color: isDarkMode ? "#fff" : "#333",
                      },
                    });
                    setShowNewTopicModal(false);
                    setNewTopic({ category: "", items: [] });
                    window.location.reload(); // Recarrega para mostrar a nova categoria
                  } else {
                    throw new Error("Erro ao criar categoria");
                  }
                } catch (error: unknown) {
                  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                  toast.error("Erro ao criar categoria: " + errorMessage, {
                    style: {
                      background: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  });
                }
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome da categoria (ex: Arrays)"
                  value={newTopic.category}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, category: e.target.value })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelTopicModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  // Modificar o NewItemModal para usar toast
  const NewItemModal = (
    <>
      {showNewItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-xl max-w-md w-full mx-4`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Adicionar Novo Tópico em {selectedCategory}
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const itemData = {
                    itemId: newItem.id,
                    title: newItem.title,
                    categoryId: newItem.categoryId, // Usando o categoryId que já está no estado
                  };

                  console.log("Dados do novo item:", itemData); // Debug

                  const success = await onCreateItem(itemData);
                  if (success) {
                    toast.success("Tópico criado com sucesso!", {
                      style: {
                        background: isDarkMode ? "#333" : "#fff",
                        color: isDarkMode ? "#fff" : "#333",
                      },
                    });
                    setShowNewItemModal(false);
                    setNewItem({ id: "", title: "", categoryId: "" }); // Limpar também o categoryId
                    window.location.reload();
                  }
                } catch (error: unknown) {
                  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                  toast.error("Erro ao criar tópico: " + errorMessage, {
                    style: {
                      background: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  });
                }
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="ID do tópico (ex: arrays-map)"
                  value={newItem.id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, id: e.target.value })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                <input
                  type="text"
                  placeholder="Título do tópico"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className={`w-full p-2 rounded border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                  required
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelItemModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  // Renderização condicional dos botões
  const renderTopicSection = () => {
    if (filteredTopics.length === 0) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {AddNewTopicButton}
        </div>
      );
    }

    // Inverte a ordem das categorias antes de renderizar
    const reversedTopics = [...filteredTopics].reverse();

    return (
      <>
        {reversedTopics.map((topic) => (
          <div key={topic.id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen
                className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                size={24}
              />
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {topic.category}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Renderizar os items existentes */}
              {topic.items?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleExampleClick(item.id)}
                  className={`p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group
                    ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code2
                        className={`${
                          isDarkMode
                            ? "text-gray-500 group-hover:text-blue-400"
                            : "text-gray-400 group-hover:text-blue-500"
                        } transition-colors`}
                        size={20}
                      />
                      <h3
                        className={`text-lg font-medium transition-colors 
                        ${
                          isDarkMode
                            ? "text-gray-300 group-hover:text-blue-400"
                            : "text-gray-800 group-hover:text-blue-500"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`${
                        isDarkMode
                          ? "text-gray-500 group-hover:text-blue-400"
                          : "text-gray-400 group-hover:text-blue-500"
                      } transition-colors`}
                      size={20}
                    />
                  </div>
                </button>
              ))}
              {/* Botão de adicionar item */}
              <button
                onClick={() => {
                  console.log("Categoria selecionada:", topic);
                  setSelectedCategory(topic.category); // Use topic.category em vez de topic.name
                  setNewItem({
                    id: `${topic.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${Date.now()}`,
                    title: "",
                    categoryId: topic.id,
                  });
                  setShowNewItemModal(true);
                }}
                className={`p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group
                  flex items-center justify-center gap-2
                  ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                      : "bg-white hover:bg-gray-50 text-gray-400 hover:text-blue-500"
                  }`}
              >
                <Plus size={24} />
                <span className="font-medium">Novo Tópico</span>
              </button>
            </div>
          </div>
        ))}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {AddNewTopicButton}
        </div>
      </>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <Toaster position="top-right" /> {/* Adicionar este componente */}
      {/* Botão de alternância de tema */}
      <div
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-20 w-16 h-8 rounded-full cursor-pointer transition-all duration-300 
    ${
      isDarkMode
        ? "bg-gray-700 flex items-center justify-end"
        : "bg-gray-300 flex items-center justify-start"
    }`}
      >
        <div
          className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
      ${
        isDarkMode
          ? "bg-yellow-400 translate-x-[-4px]"
          : "bg-white translate-x-[4px]"
      }`}
        >
          {isDarkMode ? (
            <Sun size={16} className="text-gray-800" />
          ) : (
            <Moon size={16} className="text-gray-800" />
          )}
        </div>
      </div>
      {/* Fixed Header Section */}
      <div
        className={`fixed top-0 left-0 right-0 z-10 border-b border-none
       ${
         isDarkMode
           ? "bg-gradient-to-br from-gray-900 to-gray-800"
           : "bg-gradient-to-br from-gray-50 to-gray-100"
       }
     `}
      >
        <div className="max-w-6xl mx-auto p-2">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1
              className={`text-5xl font-extrabold mb-0 leading-tight
    ${
      isDarkMode
        ? "bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
        : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
    }`}
            >
              {allTechButtons.find((btn) => btn.tech === currentTech)?.title ||
                "Select a technology"}
            </h1>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explore, crie e organize seu conhecimento de programação
            </p>
          </div>

          {/* Tech Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            {allTechButtons.map((button, index) => (
              <button
                key={index}
                className={`flex items-center gap-3 ${button.padding} ${
                  button.color
                } ${button.hoverColor} 
                  ${
                    isDarkMode
                      ? "text-gray-100 opacity-90 hover:opacity-100"
                      : "text-white"
                  }
                  rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
                  ${
                    currentTech === button.tech
                      ? "ring-4 ring-offset-2 ring-offset-gray-100 ring-opacity-50"
                      : ""
                  }`}
                onClick={() => handleTechChange(button.tech)}
              >
                <img src={button.logo} alt={button.alt} className="w-6 h-6" />
                <span className="font-medium">
                  {button.title.split(" ")[0]}
                </span>
              </button>
            ))}
            {AddNewTechButton}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar tópico ou função..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={`w-full p-3 pr-12 rounded-xl border 
                   ${
                     isDarkMode
                       ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600"
                       : "bg-white border-gray-200 focus:ring-blue-500"
                   } focus:outline-none focus:ring-2 focus:border-transparent shadow-sm transition-all duration-300 group-hover:shadow-md`}
                />
                <Search
                  className={`absolute right-4 top-4     
                 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Section with top padding to account for fixed header */}
      <div className={`max-w-6xl mx-auto p-6 pt-[370px]`}>
        {renderTopicSection()}
      </div>
      <div className="text-center py-4">
        <a
          href="https://github.com/Fernando-ctdev"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm hover:opacity-75 transition-opacity ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>Desenvolvido por</span>
          <span
            className={`font-semibold ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Maicon Fernando
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-current"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
            />
          </svg>
        </a>
      </div>
      {NewTechModal}
      {NewTopicModal}
      {NewItemModal}
    </div>
  );
}
