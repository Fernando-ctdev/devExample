import { Search, ChevronRight, Code2, BookOpen } from "lucide-react";

interface HomeProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExampleClick: (id: string) => void;
  currentTech: string;
  onTechChange: (tech: string) => void;
  topics: any[];
}

export function Home({
  searchTerm,
  onSearchChange,
  onExampleClick,
  currentTech,
  onTechChange,
  topics
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
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-br from-gray-50 to-gray-100 z-10 border-b border-none">
        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {techButtons.find(btn => btn.tech === currentTech)?.title || 'Select a technology'}
            </h1>
            <p className="text-gray-600 text-lg">Explore, aprenda e domine diferentes tecnologias de programação</p>
          </div>

          {/* Tech Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            {techButtons.map(({ title, tech, color, hoverColor, logo, alt, padding }, index) => (
              <button
                key={index}
                className={`flex items-center gap-3 ${padding} ${color} ${hoverColor} text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  currentTech === tech 
                    ? "ring-4 ring-offset-2 ring-offset-gray-100 ring-opacity-50" 
                    : ""
                }`}
                onClick={() => onTechChange(tech)}
              >
                <img src={logo} alt={alt} className="w-6 h-6" />
                <span className="font-medium">{title.split(" ")[0]}</span>
              </button>
            ))}
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
                  className="w-full p-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-300 group-hover:shadow-md"
                />
                <Search className="absolute right-4 top-4 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with top padding to account for fixed header */}
      <div className="max-w-6xl mx-auto p-6 pt-[360px]">
        {/* Topics Grid */}
        {filteredTopics.map((topic, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-gray-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                {topic.category}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topic.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onExampleClick(item.id)}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code2 className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-500 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
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
              <Search className="mx-auto text-gray-400" size={48} />
            </div>
            <p className="text-xl text-gray-600">
              Nenhum resultado encontrado para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}