// src/components/home/TechnologyGrid.tsx
import { Plus } from "lucide-react";
import { Technology } from "../../types/types";
import { TECH_BUTTONS } from "../../constants/technologies";

interface TechnologyGridProps {
  currentTech: string;
  technologies: Technology[];
  isDarkMode: boolean;
  onTechChange: (tech: string) => void;
  onShowNewTechModal: () => void;
}

export function TechnologyGrid({ 
  currentTech, 
  technologies, 
  isDarkMode, 
  onTechChange,
  onShowNewTechModal 
}: TechnologyGridProps) {
  const staticTechNames = TECH_BUTTONS.map((btn) => btn.tech);

  // Filtrar apenas as tecnologias que não estão nos botões estáticos
  const dynamicTechButtons = technologies
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
  const allTechButtons = [...TECH_BUTTONS, ...dynamicTechButtons];

  const handleTechChange = (tech: string) => {
    onTechChange(tech);
  };

  const AddNewTechButton = (
    <button
      onClick={onShowNewTechModal}
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

  return (
    <div className="flex flex-wrap gap-4 justify-center">
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
          <img
            src={button.logo}
            alt={button.alt}
            className="w-6 h-6 object-contain"
          />
          <span className="font-medium hidden sm:inline">{button.title}</span>
          <span className="font-medium sm:hidden capitalize">{button.tech}</span>
        </button>
      ))}
      {AddNewTechButton}
    </div>
  );
}
