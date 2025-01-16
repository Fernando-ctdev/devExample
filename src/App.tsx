import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { ExampleView } from "./components/ExampleView";
import { examplesjs } from "./data/jsexamples";
import { examplesgo } from "./data/goexamples";
import { examplests } from "./data/tsexamples";
import { examplesnode } from "./data/nodeexamples";
import { examplessql } from "./data/sqlexamples";
import { examplesgin } from "./data/ginexamples";
import { examplesnest } from "./data/nestexamples";
import { topics as jsTopics } from "./data/jsexamples";
import { topics as goTopics } from "./data/goexamples";
import { topics as tsTopics } from "./data/tsexamples";
import { topics as nodeTopics } from "./data/nodeexamples"
import { topics as sqlTopics } from "./data/sqlexamples";
import { topics as ginTopics } from "./data/ginexamples";
import { topics as nestTopics } from "./data/nestexamples";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | string>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTech, setCurrentTech] = useState("javascript");
  
  // estado para dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efeito para carregar preferência de tema na montagem do componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Objeto que mapeia a tecnologia para seus exemplos e tópicos
  const techData = {
    javascript: { examples: examplesjs, topics: jsTopics },
    typescript: { examples: examplests, topics: tsTopics },
    golang: { examples: examplesgo, topics: goTopics },
    nodejs: { examples: examplesnode, topics: nodeTopics },
    sql: { examples: examplessql , topics: sqlTopics },
    gin: { examples : examplesgin, topics: ginTopics },
    nestjs: { examples : examplesnest, topics: nestTopics }
  };

  const handleExampleClick = (id: string) => {
    setCurrentPage(id);
  };

  const handleBackClick = () => {
    setCurrentPage("home");
    setSearchTerm("");
  };

  const handleTechChange = (tech: string) => {
    setCurrentTech(tech.toLowerCase());
  };

  const handleNextTopic = () => {
    const currentExamples = techData[currentTech].examples;
    const keys = Object.keys(currentExamples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      setCurrentPage(keys[currentIndex + 1]);
    }
  };

  const handlePreviousTopic = () => {
    const currentExamples = techData[currentTech].examples;
    const keys = Object.keys(currentExamples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(keys[currentIndex - 1]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'
      }`}>
      {currentPage === "home" ? (
        <Home
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExampleClick={handleExampleClick}
          currentTech={currentTech}
          onTechChange={handleTechChange}
          topics={techData[currentTech].topics}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <ExampleView
          examples={techData[currentTech].examples[currentPage]}
          onBackClick={handleBackClick}
          onNavigateNext={handleNextTopic}
          onNavigatePrevious={handlePreviousTopic}
          currentTech={currentTech}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}

export default App;