import React, { useEffect } from "react";
import {
  Home,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { Example } from "../data/goexamples";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";

interface ExampleViewProps {
  examples: Example;
  onBackClick: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  currentTech: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Configuração dos logos (mantido igual)
const techLogos = {
  javascript: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
    alt: "JavaScript Logo",
    bgColor: "bg-yellow-500",
  },
  typescript: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
    alt: "TypeScript Logo",
    bgColor: "bg-blue-500",
  },
  golang: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
    alt: "GoLang Logo",
    bgColor: "bg-cyan-600",
  },
  nodejs: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
    alt: "Nodejs logo",
    bgColor: "bg-gradient-to-r from-cyan-600 to-green-700",
  },
  nestjs: {
    src: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
    bgColor: "bg-gradient-to-r from-cyan-600 to-red-700",
  },
  sql: {
    src: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
    alt: "sql logo",
    bgColor: "bg-orange-500",
  },
  gin: {
    src: "https://seeklogo.com/images/G/gin-logo-BD71D14076-seeklogo.com.png",
    alt: "gin logo",
    bgColor: "bg-cyan-600",
  },
};

export function ExampleView({
  examples,
  onBackClick,
  onNavigateNext,
  onNavigatePrevious,
  currentTech,
  isDarkMode,
  toggleTheme,
}: ExampleViewProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [examples]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(examples.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const explanationLines = examples.explanation
    .split("\n")
    .map((line, index) => {
      if (line.startsWith("//")) {
        return (
          <div
            key={index}
            className={`mb-4 font-bold ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            {line}
          </div>
        );
      }
      return (
        <div
          key={index}
          className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}
        >
          {line}
        </div>
      );
    });

  const logo = techLogos[currentTech];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* Botão de alternância de tema */}
      <div
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-20 w-16 h-8 rounded-full cursor-pointer transition-all duration-300 
    ${
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

      <div className="max-w-[90rem] mx-auto p-4">
        {/* Navigation Bar */}
        <div
          className={`mb-8 flex items-center justify-between rounded-xl shadow-sm p-4 
          ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <button
            onClick={onBackClick}
            className={`flex items-center gap-2 transition-colors px-4 py-2 rounded-lg 
              ${
                isDarkMode
                  ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
          >
            <Home size={20} />
            <span>Voltar para Home</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onNavigatePrevious}
              className={`flex items-center gap-2 transition-colors px-4 py-2 rounded-lg 
                ${
                  isDarkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
            >
              <ChevronLeft size={20} />
              <span>Anterior</span>
            </button>
            <button
              onClick={onNavigateNext}
              className={`flex items-center gap-2 transition-colors px-4 py-2 rounded-lg 
                ${
                  isDarkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
            >
              <span>Próximo</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className={`rounded-xl shadow-lg overflow-hidden 
          ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
        >
          {/* Header com Logo */}
          <div
            className={`relative p-6 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-800 to-gray-900"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2
                  className={`text-3xl font-bold mb-4 
                  ${isDarkMode ? "text-gray-200" : "text-white"}`}
                >
                  {examples.title}
                </h2>
                <p
                  className={`text-lg 
                  ${isDarkMode ? "text-gray-400" : "text-blue-100"}`}
                >
                  {examples.description}
                </p>
              </div>
              {logo && (
                <div className={`${logo.bgColor} p-4 rounded-xl shadow-lg`}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Code Section */}
            <div className="relative">
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={handleCopy}
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105
                    ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    }`}
                  title="Copiar código"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
                <div
                  className={`px-4 py-2 flex items-center gap-2 
                  ${isDarkMode ? "bg-gray-900" : "bg-gray-800"}`}
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div
                  className={`p-6 h-[calc(100%-28px)] 
                  ${isDarkMode ? "bg-[#121212]" : "bg-[#1E1E1E]"}`}
                >
                  <pre className="h-full overflow-y-auto rounded-lg">
                    {examples.code.split("\n").map((line, index) => {
                      const hasReturn = line.includes("// retorno:");
                      const output = line.includes("// retorno:")
                        ? line.split("// retorno:")[1]?.trim()
                        : null;

                      return (
                        <React.Fragment key={index}>
                          {/* Só renderiza a linha se NÃO for um comentário de retorno */}
                          {!hasReturn && (
                            <code className="language-typescript font-['Fira_Code'] text-sm block">
                              {line}
                            </code>
                          )}
                          {/* Se for uma linha de retorno, mostra apenas o terminal */}
                          {hasReturn && (
                            <div
                              className={`${
                                isDarkMode
                                  ? "bg-[#1B2B4A] border border-[#2C3D5A]"
                                  : "bg-[#012456] border border-[#1B3A6A]"
                              } 
                              rounded-md my-3 overflow-hidden`}
                            >
                              <div
                                className={`${
                                  isDarkMode ? "bg-[#0F1A2E]" : "bg-[#0C2850]"
                                } 
                                px-2 py-1 flex items-center justify-between`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-[#FFFFFF80] text-xs">
                                  Terminal
                                </span>
                              </div>
                              <div className="p-2 font-consolas text-sm">
                                <span
                                  className={`${
                                    isDarkMode ? "text-gray-400" : "text-white"
                                  }`}
                                >
                                  C:(main):
                                </span>
                                <span
                                  className={`ml-2 ${
                                    isDarkMode ? "text-gray-200" : "text-white"
                                  }`}
                                >
                                  {output}
                                </span>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </pre>
                </div>
              </div>
            </div>

            {/* Explanation Section */}
            <div className="relative">
              <div
                className={`p-6 h-[600px] rounded-xl shadow-lg 
                ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-50 text-gray-900"
                }`}
              >
                <div className="prose prose-slate max-w-none overflow-y-auto h-full">
                  <div className="space-y-4">{explanationLines}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
