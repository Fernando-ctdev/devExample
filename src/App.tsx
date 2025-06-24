import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { ExampleView } from "./components/ExampleView";
import { Sidebar } from "./components/Sidebar";
import { Gallery } from "./components/Gallery";
import { Dashboard } from "./components/Dashboard";
import { Calendar } from "./components/Calendar";
import { Config } from "./components/Config";
import { TechnologyTopics } from "./components/TechnologyTopics";
import { StudyTimer } from "./components/StudyTimer";
import LandingPage from "./components/LandingPage";
import {
  Technology,
  Example,
  NewTechnologyData,
  NewItemData,
  Topic,
  StudySession,
} from "./types/types";

// Valores padrão para Example e Technology
const defaultExample: Example = {
  id: "default",
  title: "Default Example",
  description: "This is a default example.",
  code: "// Default code",
  explanation: "This is a default explanation.",
  itemId: "default",
  categoryId: "default",
};

const defaultTechnology: Technology = {
  id: "default",
  name: "Default Technology",
  title: "Default Technology",
  color: "#000000",
  hoverColor: "#FFFFFF",
  logo: "default-logo.png",
  alt: "Default Technology Logo",
  padding: "0",
};

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | string>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTech, setCurrentTech] = useState("javascript");
  const [selectedTechnology, setSelectedTechnology] =
    useState<Technology | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [examples, setExamples] = useState<Record<string, Example>>({});
  const [technologies, setTechnologies] = useState<Technology[]>([]);  const [currentExample, setCurrentExample] = useState<Example>(defaultExample); // Sempre tem um valor padrão
  const [currentTechnology, setCurrentTechnology] =
    useState<Technology>(defaultTechnology); // Sempre tem um valor padrão  // Estado global do StudyTimer
  const [activeStudySession, setActiveStudySession] = useState<StudySession | null>(null);
  // Funções do timer
  const handleStartStudySession = (session: StudySession) => {
    const newSession: StudySession = {
      ...session,
      timeRemaining: session.duration * 60,
      breakTimeRemaining: session.breakDuration * 60,
      isBreakTime: false,
      isActive: true,
      isPaused: false,
      isMinimized: false,
      startTime: new Date()
    };
    setActiveStudySession(newSession);
  };

  const handlePauseSession = () => {
    if (activeStudySession) {
      setActiveStudySession({
        ...activeStudySession,
        isPaused: true
      });
    }
  };

  const handleResumeSession = () => {
    if (activeStudySession) {
      setActiveStudySession({
        ...activeStudySession,
        isPaused: false
      });
    }
  };

  const handleStopSession = () => {
    setActiveStudySession(null);
  };

  const handleSessionComplete = () => {
    setActiveStudySession(null);
  };

  const handleToggleMinimize = () => {
    if (activeStudySession) {
      setActiveStudySession({
        ...activeStudySession,
        isMinimized: !activeStudySession.isMinimized
      });
    }
  };

  // Carregar tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Carregando dados para tecnologia:", currentTech);
        const [topicsResponse, examplesResponse] = await Promise.all([
          fetch(`/api/topics/${currentTech}`),
          fetch(`/api/examples/${currentTech}`),
        ]);

        const topicsData = await topicsResponse.json();
        const examplesData = await examplesResponse.json();

        console.log("Topics data received:", topicsData);
        console.log("Examples data received:", examplesData);

        if (topicsData.success) {
          console.log("Setting topics from useEffect:", topicsData.data);
          setTopics(topicsData.data);
        }

        if (examplesData.success) {
          console.log("Exemplos carregados:", examplesData.data);
          setExamples(examplesData.data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    if (currentTech) {
      loadData();
    }
  }, [currentTech]);

  // Carregar tecnologias do banco
  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const response = await fetch(`/api/technologies`);
        if (!response.ok) {
          throw new Error("Falha ao carregar tecnologias");
        }
        const data = await response.json();
        console.log("Tecnologias carregadas:", data);

        setTechnologies(data);

        if (data.length > 0) {
          const tech = data.find((t: Technology) => t.name === currentTech);
          if (tech) {
            setCurrentTechnology(tech);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
      }
    };
    loadTechnologies();
  }, [currentTech]);

  // Atualizar exemplo atual
  useEffect(() => {
    if (
      currentPage !== "home" &&
      examples &&
      Object.keys(examples).length > 0
    ) {
      const currentExampleData = examples[currentPage];
      if (currentExampleData) {
        console.log("Atualizando exemplo atual:", currentExampleData);
        setCurrentExample(currentExampleData);
      }
    }
  }, [currentPage, examples]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const fetchTopics = async (tech: string) => {
    try {
      console.log("Fetching topics for tech:", tech);
      const response = await fetch(`/api/topics/${tech}`);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        console.log("Setting topics:", data.data);
        setTopics(data.data);
      } else {
        console.error("API returned success: false");
      }
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    }
  };

  const fetchExamples = async (tech: string) => {
    try {
      const response = await fetch(`/api/examples/${tech}`);
      const data = await response.json();
      if (data.success) {
        setExamples(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar exemplos:", error);
    }
  };
  const handleExampleClick = (id: string) => {
    console.log("Debug - ID recebido:", id);
    console.log("Debug - Examples disponíveis:", Object.keys(examples));
    setCurrentPage(id);
    if (examples && examples[id]) {
      const example = examples[id];
      console.log("Debug - Exemplo selecionado:", example);
      setCurrentExample(example);
    } else {
      console.log("Debug - Exemplo não encontrado para ID:", id);
    }
  };
  const handleBackClick = () => {
    // Se estamos vindo da página de tópicos (selectedTechnology existe), voltar para ela
    if (selectedTechnology) {
      setCurrentPage("tech-topics");
    } else {
      setCurrentPage("home");
    }
    setSearchTerm("");
  };
  const handleTechClickFromGallery = async (tech: string) => {
    console.log("Navegando para tópicos da tecnologia:", tech);
    setCurrentTech(tech.toLowerCase());

    const selectedTech = technologies.find(
      (t) => t.name === tech.toLowerCase()
    );
    if (selectedTech) {
      setCurrentTechnology(selectedTech);
      setSelectedTechnology(selectedTech);

      // Carregar tópicos da tecnologia selecionada
      await fetchTopics(tech.toLowerCase());
      await fetchExamples(tech.toLowerCase());

      setCurrentPage("tech-topics");
    }
  };

  const handleNextTopic = () => {
    const keys = Object.keys(examples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      setCurrentPage(keys[currentIndex + 1]);
    }
  };

  const handlePreviousTopic = () => {
    const keys = Object.keys(examples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(keys[currentIndex - 1]);
    }
  };
  const handleSaveCode = async (newCode: string): Promise<boolean> => {
    try {
      // Usar o id do exemplo diretamente
      const exampleId = currentExample.id || currentExample.itemId;
      
      if (!exampleId) {
        throw new Error("ID do exemplo não encontrado");
      }

      console.log("Salvando código para exemplo:", { exampleId, currentExample });

      const response = await fetch(`http://localhost:3001/api/save-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: exampleId,
          code: newCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Falha ao salvar");
      }

      await fetchExamples(currentTech);
      return true;
    } catch (error) {
      console.error("Erro ao salvar código:", error);
      throw error;
    }
  };
  const handleSaveExplanation = async (
    newExplanation: string
  ): Promise<boolean> => {
    try {
      // Usar o id do exemplo diretamente
      const exampleId = currentExample.id || currentExample.itemId;
      
      if (!exampleId) {
        throw new Error("Exemplo inválido ou sem ID");
      }

      console.log("Salvando explicação para exemplo:", { exampleId, currentExample });

      const response = await fetch(`http://localhost:3001/api/save-explanation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: exampleId,
          explanation: newExplanation,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Falha ao salvar");
      }

      await fetchExamples(currentTech);
      return true;
    } catch (error) {
      console.error("Erro ao salvar explicação:", error);
      throw error;
    }
  };

  const handleCreateNewTechnology = async (
    newTech: NewTechnologyData
  ): Promise<boolean> => {
    try {
      console.log("Enviando dados para criar tecnologia:", newTech);

      const response = await fetch(`/api/technologies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newTech),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resposta de erro completa:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.success) {
        const techResponse = await fetch(`/api/technologies`);
        const techData = await techResponse.json();
        setTechnologies(techData);
        setCurrentTech(newTech.name.toLowerCase());
        return true;
      } else {
        throw new Error(data.error || "Erro ao criar tecnologia");
      }
    } catch (error) {
      console.error("Erro ao criar tecnologia:", error);
      throw error;
    }
  };

  const handleCreateCategory = async (category: string): Promise<boolean> => {
    try {
      console.log("Criando categoria:", {
        category,
        technologyId: currentTech,
      });

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          technologyId: currentTech,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.success) {
        await fetchTopics(currentTech);
        return true;
      }
      throw new Error(data.error || "Erro ao criar categoria");
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      throw error;
    }
  };

  const handleCreateItem = async (itemData: NewItemData): Promise<boolean> => {
    try {
      console.log("Enviando requisição para criar item:", itemData);

      const response = await fetch(`/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.success) {
        await Promise.all([
          fetchTopics(currentTech),
          fetchExamples(currentTech),
        ]);
        return true;
      }
      throw new Error(data.error || "Erro ao criar item");
    } catch (error) {
      console.error("Erro ao criar item:", error);
      throw error;
    }
  };
  const handleDeleteItem = async (itemId: string): Promise<boolean> => {
    try {
      console.log("Enviando requisição para deletar item:", itemId);

      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.success) {
        // Recarregar os dados após deletar
        await Promise.all([
          fetchTopics(currentTech),
          fetchExamples(currentTech),
        ]);
        return true;
      }
      throw new Error(data.error || "Erro ao deletar item");
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      throw error;
    }
  };
  const handleDeleteCategory = async (categoryId: string): Promise<boolean> => {
    try {
      console.log("Enviando requisição para deletar categoria:", categoryId);

      const response = await fetch(`http://localhost:3001/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.success) {
        // Recarregar os dados após deletar
        await Promise.all([
          fetchTopics(currentTech),
          fetchExamples(currentTech),
        ]);
        return true;
      }
      throw new Error(data.error || "Erro ao deletar categoria");
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    }
  };

  const MainApp = () => {    const handleNavigate = (page: string) => {
      setCurrentPage(page);
      if (page === "home") {
        setSearchTerm("");
      }    };

    const renderCurrentPage = () => {
      // Se a página atual não é uma das páginas da sidebar e não é 'home',
      // então é uma página de exemplo
      const sidebarPages = [
        "home",
        "gallery",
        "dashboard",
        "calendar",
        "config",
        "tech-topics",
      ];

      if (!sidebarPages.includes(currentPage) && currentPage !== "home") {        return (
          <ExampleView
            example={currentExample}
            technology={currentTechnology}
            currentTech={currentTech}
            onBackClick={handleBackClick}
            onNavigateNext={handleNextTopic}
            onNavigatePrevious={handlePreviousTopic}
            isDarkMode={isDarkMode}
            onSave={(type: "code" | "explanation", content: string) =>
              type === "code"
                ? handleSaveCode(content)
                : handleSaveExplanation(content)
            }
          />
        );
      }

      switch (currentPage) {        case "home":
          return (
            <Home
              isDarkMode={isDarkMode}
              technologies={technologies}
              topics={topics}
              onNavigate={handleNavigate}
              onStartStudySession={handleStartStudySession}
            />
          );
        case "gallery":
          return (
            <Gallery
              technologies={technologies}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onTechClick={handleTechClickFromGallery}
              onCreateNewTechnology={handleCreateNewTechnology}
              isDarkMode={isDarkMode}
            />
          );
        case "tech-topics": {
          console.log("Renderizando tech-topics");
          console.log("selectedTechnology:", selectedTechnology);
          console.log("topics disponíveis:", topics);
          console.log("currentTech atual:", currentTech);

          // Simplificar a filtragem - usar apenas currentTech pois é o que está sendo carregado
          const filteredTopicsForTech = topics.length > 0 ? topics : [];

          console.log(
            "topics filtrados para a tecnologia:",
            filteredTopicsForTech
          );          return selectedTechnology ? (            <TechnologyTopics
              technology={selectedTechnology}
              topics={filteredTopicsForTech}
              onBackClick={() => setCurrentPage("gallery")}
              onTopicClick={(topicId) => {
                console.log("onTopicClick chamado com topicId:", topicId);
                handleExampleClick(topicId);
              }}
              onCreateCategory={handleCreateCategory}
              onCreateItem={handleCreateItem}
              onDeleteItem={handleDeleteItem}
              onDeleteCategory={handleDeleteCategory}
              isDarkMode={isDarkMode}
            />
          ) : (
            <Gallery
              technologies={technologies}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onTechClick={handleTechClickFromGallery}
              onCreateNewTechnology={handleCreateNewTechnology}
              isDarkMode={isDarkMode}
            />
          );
        }
        case "dashboard":
          return <Dashboard isDarkMode={isDarkMode} />;        case "calendar":
          return <Calendar isDarkMode={isDarkMode} onStartStudySession={handleStartStudySession} />;
        case "config":
          return <Config isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;        default:          return (
            <Home
              isDarkMode={isDarkMode}
              technologies={technologies}
              topics={topics}
              onNavigate={handleNavigate}
              onStartStudySession={handleStartStudySession}
            />
          );
      }
    };    return (
      <div className={`h-screen w-full overflow-hidden ${isDarkMode ? "dark" : ""}`} style={{backgroundColor: isDarkMode ? '#111827' : '#f8fafc'}}>
        <div className="flex h-full w-full">
          {/* Sidebar */}
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isDarkMode={isDarkMode}
            isExpanded={isSidebarExpanded}
            onToggleExpansion={setIsSidebarExpanded}
          />{/* Main Content */}          <div
            className={`
            flex-1 transition-all duration-300 h-full w-full min-w-0
            ${isSidebarExpanded ? "ml-80" : "ml-24"}
            pt-4 pb-4 pr-4
          `}
          >
            {/* Layout limpo para todas as páginas - igual ao Calendar/Dashboard */}
            <div className="h-full w-full rounded-2xl overflow-hidden">
              {renderCurrentPage()}
            </div>
          </div>
        </div>        {/* StudyTimer Global - aparece em todas as páginas */}
        {activeStudySession && (          <StudyTimer
            session={activeStudySession}
            isDarkMode={isDarkMode}            onSessionPause={handlePauseSession}
            onSessionResume={handleResumeSession}
            onSessionStop={handleStopSession}
            onToggleMinimize={handleToggleMinimize}
            onSessionComplete={handleSessionComplete}
          />
        )}
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/platform/*" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
