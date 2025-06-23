// src/components/home/TopicSection.tsx
import { ChevronRight, Code2, Plus } from "lucide-react";
import { Topic, TopicItem } from "../../types/types";

interface TopicSectionProps {
  topics: Topic[];
  searchTerm: string;
  isDarkMode: boolean;
  onExampleClick: (id: string) => void;
  onShowNewTopicModal: (category: string) => void;
}

export function TopicSection({ 
  topics, 
  searchTerm, 
  isDarkMode, 
  onExampleClick,
  onShowNewTopicModal 
}: TopicSectionProps) {
  const filteredTopics = topics
    .map((topic) => ({
      ...topic,
      items: topic.items?.filter((item: TopicItem) =>
        searchTerm
          ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      ) || [],
    }))
    .filter((topic) =>
      searchTerm
        ? topic.items.length > 0 ||
          topic.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  const handleExampleClick = (itemId: string) => {
    onExampleClick(itemId);
  };

  if (filteredTopics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {searchTerm 
            ? "Nenhum exemplo encontrado para sua busca." 
            : "Nenhum tópico disponível para esta tecnologia."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className={`text-3xl font-bold ${
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
                        ? "text-gray-600 group-hover:text-blue-400"
                        : "text-gray-400 group-hover:text-blue-500"
                    } transition-colors transform group-hover:translate-x-1`}
                    size={20}
                  />
                </div>
              </button>
            ))}
            
            {/* Botão para adicionar novo tópico */}
            <button
              onClick={() => onShowNewTopicModal(topic.category)}
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
    </div>
  );
}
