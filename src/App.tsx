import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { ExampleView } from "./components/ExampleView";
import LandingPage from "./components/LandingPage";

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

interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  itemId: string;
  categoryId: string;
}

interface HomeProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;  // Estava faltando
  onExampleClick: (id: string) => void;     // Estava faltando
  currentTech: string;
  onTechChange: (tech: string) => void;
  topics: any[]; 
  isDarkMode: boolean;
  toggleTheme: () => void;
  onCreateNewTechnology: (tech: NewTechnologyData) => Promise<boolean>;
  onCreateCategory: (category: string) => Promise<boolean>;
  onCreateItem: (item: NewItemData) => Promise<boolean>;
  technologies: Technology[];
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

interface ExampleViewProps {
  example: Example | null;
  technology: Technology | null;
  currentTech: string;
  onBackClick: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSave: (type: 'code' | 'explanation', content: string) => Promise<boolean>;
}

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | string>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTech, setCurrentTech] = useState("javascript");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [examples, setExamples] = useState<Record<string, Example>>({});
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [currentExample, setCurrentExample] = useState<Example | null>(null);
  const [currentTechnology, setCurrentTechnology] = useState<Technology | null>(null);

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
        console.log('Carregando dados para tecnologia:', currentTech);
        const [topicsResponse, examplesResponse] = await Promise.all([
          fetch(`/api/topics/${currentTech}`),
          fetch(`/api/examples/${currentTech}`)
        ]);

        const topicsData = await topicsResponse.json();
        const examplesData = await examplesResponse.json();

        if (topicsData.success) {
          setTopics(topicsData.data);
        }

        if (examplesData.success) {
          console.log('Exemplos carregados:', examplesData.data);
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
  }, []);

  // Atualizar exemplo atual
  useEffect(() => {
    if (currentPage !== 'home' && examples && Object.keys(examples).length > 0) {
      const currentExampleData = examples[currentPage];
      if (currentExampleData) {
        console.log('Atualizando exemplo atual:', currentExampleData);
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
    console.log('Debug - ID recebido:', id);
    setCurrentPage(id);
    if (examples && examples[id]) {
      const example = examples[id];
      console.log('Debug - Exemplo selecionado:', example);
      setCurrentExample(example);
    }
  };

  const handleBackClick = () => {
    setCurrentPage("home");
    setSearchTerm("");
  };

  const handleTechChange = (tech: string) => {
    console.log("Mudando para tecnologia:", tech);
    setCurrentTech(tech.toLowerCase());

    const currentTech = technologies.find((t) => t.name === tech.toLowerCase());
    if (currentTech) {
      setCurrentTechnology(currentTech);
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
      if (!currentExample?.itemId) {
        throw new Error('ID do exemplo não encontrado');
      }

      const response = await fetch(`/api/save-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentExample.itemId,
          code: newCode
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao salvar');
      }

      await fetchExamples(currentTech);
      return true;

    } catch (error) {
      console.error('Erro ao salvar código:', error);
      throw error;
    }
  };

  const handleSaveExplanation = async (newExplanation: string): Promise<boolean> => {
    try {
      if (!currentExample?.itemId) {
        throw new Error('Exemplo inválido ou sem itemId');
      }

      const response = await fetch(`/api/save-explanation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tech: currentTech,
          id: currentExample.itemId,
          explanation: newExplanation,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar explicação');
      }

      await fetchExamples(currentTech);
      return true;
    } catch (error) {
      console.error("Erro ao salvar explicação:", error);
      throw error;
    }
  };

  const handleCreateNewTechnology = async (newTech: NewTechnologyData): Promise<boolean> => {
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
      console.log('Criando categoria:', { category, technologyId: currentTech });
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.log('Resposta do servidor:', data);
  
      if (data.success) {
        await fetchTopics(currentTech);
        return true;
      }
      throw new Error(data.error || 'Erro ao criar categoria');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };

  const handleCreateItem = async (itemData: NewItemData): Promise<boolean> => {
    try {
      console.log('Enviando requisição para criar item:', itemData);
      
      const response = await fetch(`/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData)
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

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

  const MainApp = () => (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {currentPage === "home" ? (
        <Home
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExampleClick={handleExampleClick}
          currentTech={currentTech}
          onTechChange={handleTechChange}
          topics={topics}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onCreateNewTechnology={handleCreateNewTechnology}
          onCreateCategory={handleCreateCategory}
          onCreateItem={handleCreateItem}
          technologies={technologies}
        />
      ) : (
        <ExampleView
          example={currentExample}
          technology={currentTechnology}
          currentTech={currentTech}
          onBackClick={handleBackClick}
          onNavigateNext={handleNextTopic}
          onNavigatePrevious={handlePreviousTopic}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onSave={(type: 'code' | 'explanation', content: string) => 
            type === 'code' ? handleSaveCode(content) : handleSaveExplanation(content)}
        />
      )}
    </div>
  );

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