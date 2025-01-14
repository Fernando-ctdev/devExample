import { useState } from 'react';
import { Home } from './components/Home';
import { ExampleView } from './components/ExampleView';
import { examplesjs } from './data/jsexamples';
import { examplesgo } from './data/goexamples';
import { examplests } from './data/tsexamples';
import { topics as jsTopics } from './data/jsexamples';
import { topics as goTopics } from './data/goexamples';
import { topics as tsTopics } from './data/tsexamples';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | string>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTech, setCurrentTech] = useState('javascript'); // Novo estado

  // Objeto que mapeia a tecnologia para seus exemplos e tópicos
  const techData = {
    javascript: { examples: examplesjs, topics: jsTopics },
    typescript: { examples: examplests, topics: tsTopics },
    golang: { examples: examplesgo, topics: goTopics }
  };

  const handleExampleClick = (id: string) => {
    setCurrentPage(id);
  };

  const handleBackClick = () => {
    setCurrentPage('home');
    setSearchTerm('');
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
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' ? (
        <Home
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExampleClick={handleExampleClick}
          currentTech={currentTech}
          onTechChange={handleTechChange}
          topics={techData[currentTech].topics}
        />
      ) : (
        <ExampleView
          examples={techData[currentTech].examples[currentPage]}
          onBackClick={handleBackClick}
          onNavigateNext={handleNextTopic}
          onNavigatePrevious={handlePreviousTopic}
        />
      )}
    </div>
  );
}

export default App;