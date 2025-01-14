import React, { useState } from 'react'; 
import { Search, ChevronRight } from "lucide-react";
import { topics } from "../data/tsexamples";

interface HomeProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExampleClick: (id: string) => void;
}

export function Home({
  searchTerm,
  onSearchChange,
  onExampleClick,
}: HomeProps) {
  // Estado para o título dinâmico
  const [title, setTitle] = useState("TypeScript with example");

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
    <div className="max-w-6xl mx-auto p-6">
      {/* Título dinâmico */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        {title}
      </h1>

      {/* Botões abaixo do título */}
      <div className="flex gap-4 mb-8 items-center">
        {[
          {
            title: "JavaScript with example",
            color: "bg-yellow-500 hover:bg-yellow-600",
            logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
            alt: "JavaScript Logo",
            padding: "px-5 py-3",
          },
          {
            title: "TypeScript with example",
            color: "bg-blue-500 hover:bg-blue-600",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
            alt: "TypeScript Logo",
            padding: "px-5 py-3",
          },
          {
            title: "NodeJS with example",
            color: "bg-green-800 hover:bg-green-700",
            logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
            alt: "NodeJS Logo",
            padding: "px-8 py-3",
          },
          {
            title: "GoLang with example",
            color: "bg-gray-500 hover:bg-gray-600",
            logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
            alt: "GoLang Logo",
            padding: "px-8 py-3",
          },
          {
            title: "SQL with example",
            color: "bg-orange-500 hover:bg-orange-600",
            logo: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
            alt: "SQL Logo",
            padding: "px-12 py-3",
          },
        ].map(({ title, color, logo, alt, padding }, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 ${padding} ${color} text-white rounded-lg transition transform hover:scale-105`}
            onClick={() => setTitle(title)}
          >
            <img src={logo} alt={alt} className="w-[24px] h-[24px]" />
            <span className="font-medium">{title.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Campo de busca */}
      <div className="mb-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar função ou método..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Listagem de tópicos */}
      {filteredTopics.map((topic, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {topic.category}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onExampleClick(item.id)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <ChevronRight className="text-gray-400" size={25} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Mensagem quando não há resultados */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          Nenhum resultado encontrado para "{searchTerm}"
        </div>
      )}
    </div>
  );
}
