import { Search, ChevronRight, Code2, BookOpen, Moon, Sun } from "lucide-react";
import { useEffect } from "react";

interface HomeProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExampleClick: (id: string) => void;
  currentTech: string;
  onTechChange: (tech: string) => void;
  topics: any[];
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function Home({
  searchTerm,
  onSearchChange,
  onExampleClick,
  currentTech,
  onTechChange,
  topics,
  isDarkMode,
  toggleTheme,
}: HomeProps) {
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
      logo: "https://seeklogo.com/images/G/gin-logo-BD71D14076-seeklogo.com.png",
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
        behavior: "auto"
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

  const filteredTopics = topics
    .map((topic) => ({
      ...topic,
      items: topic.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((topic) => topic.items.length > 0);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 
     ${
       isDarkMode
         ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
         : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
     }`}
    >
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
        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1
              className={`text-5xl font-extrabold mb-6 
             ${
               isDarkMode
                 ? "bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
                 : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
             }`}
            >
              {techButtons.find((btn) => btn.tech === currentTech)?.title ||
                "Select a technology"}
            </h1>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explore, aprenda e domine diferentes tecnologias de programação
            </p>
          </div>

          {/* Tech Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            {techButtons.map(
              (
                { title, tech, color, hoverColor, logo, alt, padding },
                index
              ) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 ${padding} ${color} ${hoverColor} 
                 ${
                   isDarkMode
                     ? "text-gray-100 opacity-90 hover:opacity-100"
                     : "text-white"
                 } rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    currentTech === tech
                      ? "ring-4 ring-offset-2 ring-offset-gray-100 ring-opacity-50"
                      : ""
                  }`}
                  onClick={() => handleTechChange(tech)}
                >
                  <img src={logo} alt={alt} className="w-6 h-6" />
                  <span className="font-medium">{title.split(" ")[0]}</span>
                </button>
              )
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar função ou método..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={`w-full p-4 pr-12 rounded-xl border 
                   ${
                     isDarkMode
                       ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600"
                       : "bg-white border-gray-200 focus:ring-blue-500"
                   } focus:outline-none focus:ring-2 focus:border-transparent shadow-sm transition-all duration-300 group-hover:shadow-md`}
                />
                <Search
                  className={`absolute right-4 top-5 
                 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with top padding to account for fixed header */}
      <div
        className={`max-w-6xl mx-auto p-6 pt-[420px] 
       ${isDarkMode ? "text-gray-200" : "text-gray-800"}
     `}
      >
        {/* Topics Grid */}
        {filteredTopics.map((topic, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
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
              {topic.items.map((item) => (
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
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search
                className={`mx-auto ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
                size={48}
              />
            </div>
            <p
              className={`text-xl ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Nenhum resultado encontrado para "{searchTerm}"
            </p>
          </div>
        )}
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
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
