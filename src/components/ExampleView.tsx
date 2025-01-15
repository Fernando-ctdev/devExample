import React, { useEffect } from "react";
import { Home, Copy, Check, ChevronLeft, ChevronRight} from "lucide-react";
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
}

// Configuração dos logos
const techLogos = {
  javascript: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
    alt: "JavaScript Logo",
    bgColor: "bg-yellow-500"
  },
  typescript: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
    alt: "TypeScript Logo",
    bgColor: "bg-blue-500"
  },
  golang: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
    alt: "GoLang Logo",
    bgColor: "bg-cyan-600"
  },
  nodejs: {
    src: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
    alt: "Nodejs logo",
    bgColor: "bg-gradient-to-r from-cyan-600 to-green-700"
  },
  sql: {
    src: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
    alt: "sql logo",
    bgColor: "bg-cyan-500"
  }
};

export function ExampleView({
  examples,
  onBackClick,
  onNavigateNext,
  onNavigatePrevious,
  currentTech
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
          <div key={index} className="mb-4 font-bold text-gray-900">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="mb-4 text-gray-900">
          {line}
        </div>
      );
    });

  const logo = techLogos[currentTech];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[90rem] mx-auto p-4">
        {/* Navigation Bar */}
        <div className="mb-8 flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <Home size={20} />
            <span>Voltar para Home</span>
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onNavigatePrevious}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
              <span>Anterior</span>
            </button>
            <button
              onClick={onNavigateNext}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Próximo</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header com Logo */}
          <div className="relative p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {examples.title}
                </h2>
                <p className="text-blue-100 text-lg">{examples.description}</p>
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
                  className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition-all duration-300 transform hover:scale-105"
                  title="Copiar código"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="bg-[#1E1E1E] p-6 h-[calc(100%-28px)]">
                  <pre className="h-full overflow-y-auto rounded-lg">
                    <code className="language-typescript font-['Fira_Code'] text-sm">
                      {examples.code}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Explanation Section */}
            <div className="relative">
              <div className="bg-gray-50 p-6 h-[600px] rounded-xl shadow-lg">
                <div className="prose prose-slate max-w-none overflow-y-auto h-full">
                  <div className="space-y-4">
                    {explanationLines}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}