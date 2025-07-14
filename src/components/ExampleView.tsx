import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Save,
  Edit2,
  ArrowLeft,
  Check,
  Book,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";
import { ExampleViewProps } from "../types/types";

export function ExampleView({
  example,
  onBackClick,
  onNavigateNext,
  onNavigatePrevious,
  currentTech,
  isDarkMode,
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
  };  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${
        isDarkMode ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Header modernizado */}
      <header
        className={`sticky top-0 z-50 text-white shadow-2xl backdrop-blur-md border-b
        ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-violet-900/90 border-purple-700/30"
            : "bg-gradient-to-r from-purple-400/95 via-purple-500/95 to-violet-500/95 border-purple-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-6">
              <button
                onClick={onBackClick}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl 
                         bg-white/10 hover:bg-white/20 
                         transition-all duration-300 hover:scale-105
                         shadow-lg hover:shadow-xl active:scale-95 backdrop-blur-md"
              >
                <ArrowLeft size={20} />
                <span className="font-semibold">Voltar</span>
              </button>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                {example.title}
              </h1>
            </div>

            {/* Badge de tecnologia modernizado */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 
                          flex items-center gap-3 px-5 py-2.5 rounded-2xl
                          bg-white/15 backdrop-blur-md border border-white/20
                          shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105"
            >
              <div className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full p-1.5">
                {/* Ícone de caderno no lugar da imagem */}
                <Book size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold capitalize text-base">
                {currentTech}
              </span>
            </div>            <div className="flex items-center gap-3">
              <div className="flex rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
                <button
                  onClick={onNavigatePrevious}
                  className="p-3 rounded-l-2xl hover:bg-purple-500/30 
                           transition-all duration-300 hover:scale-105
                           shadow-sm hover:shadow active:scale-95"
                  title="Exemplo anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={onNavigateNext}
                  className="p-3 rounded-r-2xl hover:bg-purple-500/30 
                           transition-all duration-300 hover:scale-105
                           shadow-sm hover:shadow active:scale-95"
                  title="Próximo exemplo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 md:px-4 lg:px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full px-2 pb-8">
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
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/80 to-violet-900/80 border-b border-[#44475a]">
              <div className="flex items-center gap-2"></div>
              <span className="text-sm font-medium text-slate-200">
                Explicação
              </span>
              <button
                onClick={() =>
                  isEditingExplanation
                    ? handleSave("explanation")
                    : setIsEditingExplanation(true)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-white/10 hover:bg-purple-500/30 text-slate-200 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
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

      {/* Copy Alert - Projeto Style */}
      {showCopyAlert && (
        <div
          className="fixed bottom-12 right-12 
                     bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white px-4 py-2.5
                     rounded-lg
                     border border-purple-300/30
                     shadow-lg shadow-purple-900/20
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
                     bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white px-4 py-2.5
                     rounded-lg border border-purple-300/30
                     shadow-lg shadow-purple-900/20
                     flex items-center gap-2"
        >
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
          <span className="font-medium">Salvando...</span>
        </div>
      )}

      {saveError && (
        <div
          className="fixed bottom-12 right-12 
                     bg-red-500/90 text-white px-4 py-2.5
                     rounded-lg border border-red-300/30
                     shadow-lg
                     flex items-center gap-2"
        >
          <span className="font-medium">Erro ao salvar: {saveError}</span>        </div>
      )}

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