// src/components/home/SearchHeader.tsx
import { Search, Moon, Sun } from "lucide-react";

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function SearchHeader({ 
  searchTerm, 
  onSearchChange, 
  isDarkMode, 
  toggleTheme 
}: SearchHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1
          className={`text-5xl font-extrabold mb-0 leading-tight
            ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            }`}
        >
          Dev
          <span
            className={`${
              isDarkMode
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            Example
          </span>
        </h1>
        <p
          className={`text-xl mt-4 max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Exemplos práticos de código para acelerar seu desenvolvimento
        </p>
      </div>

      {/* Search and Theme Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              placeholder="Buscar por exemplo, tecnologia ou tópico..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full px-6 py-4 pr-12 rounded-2xl text-lg border-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600"
                  : "bg-white border-gray-200 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:border-transparent shadow-sm transition-all duration-300 group-hover:shadow-md`}
            />
            <Search
              className={`absolute right-4 top-4     
               ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
              size={20}
            />
          </div>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`ml-4 p-3 rounded-xl transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <div
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
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
        </button>
      </div>
    </div>
  );
}
