import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Save,
  Edit2,
  ArrowLeft,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

interface Example {
  id: string;
  title: string;
  code: string;
  explanation: string;
  itemId: string; 
}

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

interface ExampleViewProps {
  example: Example;
  technology: Technology | null;
  onBackClick: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  currentTech: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSave: (type: 'code' | 'explanation', content: string, itemId: string) => Promise<boolean>;
}

const TECH_LOGOS: Record<string, string> = {
  javascript: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
  typescript: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
  golang: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
  gin: "https://avatars.githubusercontent.com/u/7894478?v=4",
  nodejs: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
  nestjs: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
  sql: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png"
};

export function ExampleView({
  example,
  technology,
  onBackClick,
  onNavigateNext,
  onNavigatePrevious,
  currentTech,
  isDarkMode,
  toggleTheme,
  onSave,
}: ExampleViewProps) {
  const [copied, setCopied] = useState(false);
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [isEditingExplanation, setIsEditingExplanation] = useState(false);
  const [editedCode, setEditedCode] = useState(example.code);
  const [editedExplanation, setEditedExplanation] = useState(example.explanation);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setEditedCode(example.code);
    setEditedExplanation(example.explanation);
  }, [example]);

  useEffect(() => {
    if (example && !isEditingCode && !isEditingExplanation) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }, [example, isEditingCode, isEditingExplanation]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setShowCopyAlert(true);
      setTimeout(() => {
        setShowCopyAlert(false);
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleSave = async (type: 'code' | 'explanation') => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const content = type === 'code' ? editedCode : editedExplanation;
      
      try {
      await onSave(type, content, example.itemId);

        if (type === 'code') {
          setIsEditingCode(false);
          example.code = content;
        } else {
          setIsEditingExplanation(false);
          example.explanation = content;
        }

        setShowCopyAlert(true);
        setCopied(false);
        setTimeout(() => setShowCopyAlert(false), 2000);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setSaveError(errorMessage);
      }

    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div
      className={`flex flex-col min-h-screen relative ${
        isDarkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Header com gradiente adaptativo */}
      <header
        className={`sticky top-0 z-50 text-white shadow-lg
        ${
          isDarkMode
            ? "bg-gradient-to-r from-blue-900 to-blue-700"
            : "bg-gradient-to-r from-blue-600 to-blue-400"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg 
                         bg-white/10 hover:bg-white/20 
                         transition-all duration-200
                         shadow-sm hover:shadow active:scale-95"
              >
                <ArrowLeft size={18} />
                <span className="font-medium">Voltar</span>
              </button>
              <h1 className="text-xl font-bold tracking-tight">
                {example.title}
              </h1>
            </div>

            {/* Badge de tecnologia */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 
                          flex items-center gap-2 px-4 py-1.5 rounded-lg
                          bg-white/10 backdrop-blur-sm
                          shadow-sm transition-all duration-200 hover:bg-white/20"
            >
              {TECH_LOGOS[currentTech] && (
                <img
                  src={TECH_LOGOS[currentTech]}
                  alt={`${currentTech} Logo`}
                  className="w-5 h-5"
                />
              )}
              <span className="font-medium capitalize text-sm">
                {currentTech}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 
                         transition-all duration-200
                         shadow-sm hover:shadow active:scale-95"
                title={isDarkMode ? "Modo claro" : "Modo escuro"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="flex rounded-lg bg-white/10">
                <button
                  onClick={onNavigatePrevious}
                  className="p-2 rounded-l-lg hover:bg-white/20 
                           transition-all duration-200
                           shadow-sm hover:shadow active:scale-95"
                  title="Exemplo anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={onNavigateNext}
                  className="p-2 rounded-r-lg hover:bg-white/20 
                           transition-all duration-200
                           shadow-sm hover:shadow active:scale-95"
                  title="Próximo exemplo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-8 md:px-12 lg:px-12 py-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[min(100vh-12rem,900px)]">
          {/* Code Card */}
          <div className="group bg-[#282a36] rounded-2xl overflow-hidden border border-[#44475a] shadow-[0_10px_40px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_-4px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3 bg-[#21222c] border-b border-[#44475a]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-90" />
                <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-90" />
                <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-90" />
              </div>
              <span className="text-sm font-medium text-[#f8f8f2]">
                Sintaxe e exemplos
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#44475a]/50 hover:bg-[#44475a] text-[#f8f8f2] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
                  title="Copiar código"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() =>
                    isEditingCode ? handleSave("code") : setIsEditingCode(true)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#44475a]/50 hover:bg-[#44475a] text-[#f8f8f2] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
                  title={isEditingCode ? "Salvar" : "Editar"}
                >
                  {isEditingCode ? <Save size={14} /> : <Edit2 size={14} />}
                </button>
              </div>
            </div>
            <div className="bg-[#282a36] p-6 py-2 h-[calc(100%-3rem)] custom-scrollbar overflow-auto">
              {isEditingCode ? (
                <textarea
                  value={editedCode}
                  onChange={(e) => setEditedCode(e.target.value)}
                  className="w-full h-full bg-transparent font-mono text-sm resize-none focus:outline-none text-[#f8f8f2]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: "1.6",
                  }}
                />
              ) : (
                <pre className="text-[#f8f8f2]">
                  <code className="language-typescript">{example.code}</code>
                </pre>
              )}
            </div>
          </div>
          {/* Explanation Card */}
          <div className="group bg-[#282a36] rounded-2xl overflow-hidden border border-[#44475a] shadow-[0_10px_40px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_-4px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-100">
                Explicação
              </span>
              <button
                onClick={() =>
                  isEditingExplanation
                    ? handleSave("explanation")
                    : setIsEditingExplanation(true)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
                title={isEditingExplanation ? "Salvar" : "Editar"}
              >
                {isEditingExplanation ? (
                  <Save size={14} />
                ) : (
                  <Edit2 size={14} />
                )}
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 h-[calc(100%-3rem)] custom-scrollbar overflow-auto">
              {isEditingExplanation ? (
                <textarea
                  value={editedExplanation}
                  onChange={(e) => setEditedExplanation(e.target.value)}
                  className="w-full h-full bg-transparent font-sans text-base resize-none focus:outline-none text-slate-800 dark:text-slate-300"
                />
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-slate-800 dark:text-slate-300">
                    {editedExplanation}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Copy Alert - Dracula Style */}
      {showCopyAlert && (
        <div
          className="fixed bottom-12 right-12 
                     bg-[#44475a] text-[#f8f8f2] px-4 py-2.5
                     rounded-lg
                     border border-[#6272a4]
                     shadow-lg shadow-[#282a36]/50
                     flex items-center gap-2 animate-slide-up"
        >
          <Check size={16} className="text-[#50fa7b]" />
          <span className="font-medium">
            {copied ? "Código copiado!" : "Alterações salvas!"}
          </span>
        </div>
      )}
      {/* Feedback Messages */}
      {isSaving && (
        <div
          className="fixed bottom-12 right-12 
                     bg-[#44475a] text-[#f8f8f2] px-4 py-2.5
                     rounded-lg border border-[#6272a4]
                     shadow-lg shadow-[#282a36]/50
                     flex items-center gap-2"
        >
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#50fa7b]" />
          <span className="font-medium">Salvando...</span>
        </div>
      )}

      {saveError && (
        <div
          className="fixed bottom-12 right-12 
                     bg-[#ff5555] text-white px-4 py-2.5
                     rounded-lg border border-[#ff6e6e]
                     shadow-lg
                     flex items-center gap-2"
        >
          <span className="font-medium">Erro ao salvar: {saveError}</span>
        </div>
      )}

<footer className="absolute bottom-0 left-0 right-0 py-2 text-center bg-white/10 backdrop-blur-sm">
        <a  
          href="https://github.com/Fernando-ctdev"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 text-sm hover:opacity-75 transition-opacity ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>Desenvolvido por</span>
          <span
            className={`font-semibold ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Maicon Fernando
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-current"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
            />
          </svg>
        </a>
      </footer>
      <style jsx global>{`
        /* Scrollbar - Dracula Theme */
        .custom-scrollbar::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #282a36;
          border-left: 1px solid #44475a;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #44475a;
          border: 3px solid #282a36;
          border-radius: 7px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6272a4;
        }

        /* Animation */
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }

        /* VSCode Dracula Theme */
        pre[class*="language-"],
        code[class*="language-"] {
          color: #f8f8f2;
          font-family: "JetBrains Mono", ui-monospace, "Fira Code", Monaco,
            Consolas, monospace;
          font-size: 14px;
          line-height: 1.6;
          direction: ltr;
          text-align: left;
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          tab-size: 2;
          hyphens: none;
          background: transparent;
          text-shadow: none;
        }

        /* Dracula Theme Token Colors */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6272a4;
          font-style: italic;
        }

        .token.punctuation {
          color: #f8f8f2;
        }

        .token.namespace {
          opacity: 0.7;
        }

        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #ff79c6;
        }

        .token.boolean,
        .token.number {
          color: #bd93f9;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #50fa7b;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable {
          color: #f8f8f2;
        }

        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name {
          color: #ffb86c;
        }

        .token.keyword {
          color: #ff79c6;
          font-style: italic;
        }

        .token.regex,
        .token.important {
          color: #ffb86c;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }

        .token.italic {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default ExampleView;