import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { ExampleView } from "./components/ExampleView";

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

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | string>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTech, setCurrentTech] = useState("javascript");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [topics, setTopics] = useState([]);
  const [examples, setExamples] = useState({});
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [currentExample, setCurrentExample] = useState<any>(null);
  const [currentTechnology, setCurrentTechnology] = useState<Technology | null>(
    null
  );

  // Carregar tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Modifique o useEffect que carrega os dados
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

        // Atualizar o estado com as tecnologias do banco
        setTechnologies(data);
        
        // Atualizar tecnologia atual se necessário
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

  // Modifique o useEffect que atualiza o exemplo atual
  useEffect(() => {
    if (currentPage !== 'home' && examples && Object.keys(examples).length > 0) {
      console.log('Atualizando exemplo atual:', examples[currentPage]);
      setCurrentExample(examples[currentPage]);
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

  // O currentPage está sendo usado como ID, mas deveria ser o itemId
  const handleExampleClick = (id: string) => {
    console.log('Debug - ID recebido:', id);
    setCurrentPage(id); // Aqui está guardando o itemId
    if (examples && examples[id]) {
      const example = examples[id];
      console.log('Debug - Exemplo selecionado:', example);
      setCurrentExample(example); // Este exemplo já deve conter o itemId
    }
  };

  const handleBackClick = () => {
    setCurrentPage("home");
    setSearchTerm("");
  };

  const handleTechChange = (tech: string) => {
    console.log("Mudando para tecnologia:", tech);
    setCurrentTech(tech.toLowerCase());

    // Atualizar a tecnologia atual
    const currentTech = technologies.find((t) => t.name === tech.toLowerCase());
    if (currentTech) {
      setCurrentTechnology(currentTech);
    }
  };

  const handleNextTopic = () => {
    const currentExamples = examples;
    const keys = Object.keys(currentExamples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      setCurrentPage(keys[currentIndex + 1]);
    }
  };

  const handlePreviousTopic = () => {
    const currentExamples = examples;
    const keys = Object.keys(currentExamples);
    const currentIndex = keys.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(keys[currentIndex - 1]);
    }
  };

  const handleSaveCode = async (newCode: string) => {
    try {
      console.log('Tentativa de salvamento de código:', {
        id: currentExample?.itemId,
        code: newCode
      });
  
      if (!currentExample?.itemId) {
        throw new Error('ID do exemplo não encontrado');
      }
  
      const payload = {
        id: currentExample.itemId,
        code: newCode
      };
  
      const response = await fetch(`/api/save-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao salvar');
      }
  
      console.log('Código salvo com sucesso!');
      await fetchExamples(currentTech);
      return true;
  
    } catch (error) {
      console.error('Erro ao salvar código:', error);
      throw error;
    }
  };
  
  const handleSaveExplanation = async (newExplanation: string) => {
    try {
      if (!currentExample || !currentExample.itemId) {
        throw new Error('Exemplo inválido ou sem itemId');
      }
  
      const response = await fetch(`/api/save-explanation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tech: currentTech,
          id: currentExample.itemId,
          explanation: newExplanation,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar explicação');
      }
  
      // Recarregar exemplos após salvar
      await fetchExamples(currentTech);
      return true;
    } catch (error) {
      console.error("Erro ao salvar explicação:", error);
      throw error;
    }
  };

  const handleCreateNewTechnology = async (newTech: {
    name: string;
    title: string;
    color: string;
    hoverColor: string;
    logo: string;
    alt: string;
    padding: string;
  }) => {
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
        // Atualizar a lista de tecnologias
        const techResponse = await fetch(`/api/technologies`);
        const techData = await techResponse.json();
        setTechnologies(techData);
        
        // Mudar para a nova tecnologia
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

  const handleCreateCategory = async (category: string) => {
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
        // Recarregar os tópicos após criar a categoria
        await fetchTopics(currentTech);
        return true;
      }
      throw new Error(data.error || 'Erro ao criar categoria');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };

  const handleCreateItem = async (itemData: {
    itemId: string;
    title: string;
    categoryId: string;
  }) => {
    try {
      console.log('Enviando requisição para criar item:', itemData);
      
      const response = await fetch(`/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData) // Removi o spread e o technologyId
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

  // Na renderização do ExampleView, passe o currentExample
  return (
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
          onCreateItem={handleCreateItem}  // Certifique-se que esta linha existe
          technologies={technologies}
        />
      ) : (
        <ExampleView
          example={currentExample} // Modificado para usar currentExample
          technology={currentTechnology}
          currentTech={currentTech} // Garanta que esta prop está sendo passada
          onBackClick={handleBackClick}
          onNavigateNext={handleNextTopic}
          onNavigatePrevious={handlePreviousTopic}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onSave={(type, content) => type === 'code' ? handleSaveCode(content) : handleSaveExplanation(content)}
        />
      )}
    </div>
  );
}

export default App;

