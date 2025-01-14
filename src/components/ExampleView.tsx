import React, { useEffect } from "react";
import { Home, Copy, Check } from "lucide-react";
import { Example } from "../data/goexamples"; // aqui preciso que altere dinamicamente com base no botão da tecnologia selecionada na home
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";

interface ExampleViewProps {
  examples: Example;
  onBackClick: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

export function ExampleView({
  examples,
  onBackClick,
  onNavigateNext,
  onNavigatePrevious,
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

  return (
    <div className="max-w-[90rem] mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Home size={22} />
          <span>Voltar para Home</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-2xl font-bold mb-2 text-white">
            {examples.title}
          </h2>
          <p className="text-blue-100">{examples.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                title="Copiar código"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <div className="bg-[#1E1E1E] p-6 h-[600px] rounded-xl m-4">
              <pre className="h-full overflow-y-auto rounded-lg">
                <code className="language-typescript font-['Fira_Code']">
                  {examples.code}
                </code>
              </pre>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-6 h-[600px] rounded-xl m-4">
            <div className="prose prose-slate max-w-none overflow-y-auto h-full">
              <div className="space-y-4">
                {explanationLines.map((line, index) => (
                  <div key={index} className="text-gray-800">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between mt-4 p-4">
          <button
            onClick={onNavigatePrevious}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Tópico anterior
          </button>
          <button
            onClick={onNavigateNext}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Próximo Tópico
          </button>
        </div>
      </div>
    </div>
  );
}
