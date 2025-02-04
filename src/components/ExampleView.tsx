import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Copy, Save, Edit2, ArrowLeft, Sun, Moon, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';

const TECH_LOGOS = {
  javascript: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
  typescript: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
  golang: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
  gin: "https://seeklogo.com/images/G/gin-logo-BD71D14076-seeklogo.com.png",
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
  onSave
}) {
  const [copied, setCopied] = useState(false);
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [isEditingExplanation, setIsEditingExplanation] = useState(false);
  const [editedCode, setEditedCode] = useState(example.code);
  const [editedExplanation, setEditedExplanation] = useState(example.explanation);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

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
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  console.log('Debug - Objeto example:', example); // Adicione este log

  const handleSave = async (type) => {
    try {
      setIsSaving(true);
      setSaveError(null);

      // Correção: Adicionar /api/ no início da rota
      const endpoint = `/api/save-${type}`; 
      const content = type === 'code' ? editedCode : editedExplanation;

      console.log('Debug - Enviando para:', {
        endpoint,
        id: example.id,
        contentLength: content.length
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: example.id,
          [type]: content
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao salvar');
      }

      // Atualizar estado local
      if (type === 'code') {
        setIsEditingCode(false);
        example.code = content;
      } else {
        setIsEditingExplanation(false);
        example.explanation = content;
      }

      // Mostrar mensagem de sucesso apropriada
      setShowCopyAlert(true);
      // Aqui está a correção - mensagem diferente para cada ação
      setCopied(false); // Não é uma cópia, é um salvamento
      setTimeout(() => setShowCopyAlert(false), 2000);

    } catch (error) {
      console.error('Erro detalhado:', error);
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header com gradiente adaptativo */}
      <header className={`sticky top-0 z-50 text-white shadow-lg
        ${isDarkMode 
          ? 'bg-gradient-to-r from-blue-900 to-blue-700' // Gradiente escuro
          : 'bg-gradient-to-r from-blue-600 to-blue-400'  // Gradiente claro
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
              <h1 className="text-xl font-bold tracking-tight">{example.title}</h1>
            </div>

            {/* Badge de tecnologia */}
            <div className="absolute left-1/2 transform -translate-x-1/2 
                          flex items-center gap-2 px-4 py-1.5 rounded-lg
                          bg-white/10 backdrop-blur-sm
                          shadow-sm transition-all duration-200 hover:bg-white/20">
              {TECH_LOGOS[currentTech] && (
                <img 
                  src={TECH_LOGOS[currentTech]} 
                  alt={`${currentTech} Logo`} 
                  className="w-5 h-5"
                />
              )}
              <span className="font-medium capitalize text-sm">{currentTech}</span>
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
      <main className="container mx-auto px-8 md:px-12 lg:px-16 py-6 flex-1"> {/* Aumentado o padding-x */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Card - VSCode Dracula Style */}
          <div className="group bg-[#282a36] rounded-lg overflow-hidden
                       border border-[#44475a]
                       shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)]
                       transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3 
                          bg-[#21222c] 
                          border-b border-[#44475a]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-90" />
                <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-90" />
                <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-90" />
              </div>
              <span className="text-sm font-medium text-[#f8f8f2]">
                Código
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs
                           bg-[#44475a]/50 hover:bg-[#44475a] text-[#f8f8f2]
                           transition-all duration-200 ease-in-out
                           shadow-sm hover:shadow-md active:scale-95"
                  title="Copiar código"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => isEditingCode ? handleSave('code') : setIsEditingCode(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs
                           bg-[#44475a]/50 hover:bg-[#44475a] text-[#f8f8f2]
                           transition-all duration-200 ease-in-out
                           shadow-sm hover:shadow-md active:scale-95"
                  title={isEditingCode ? "Salvar" : "Editar"}
                >
                  {isEditingCode ? <Save size={14} /> : <Edit2 size={14} />}
                </button>
              </div>
            </div>
            <div className="bg-[#282a36] p-6">
              <div className="h-[600px] overflow-auto custom-scrollbar">
                {isEditingCode ? (
                  <textarea
                    value={editedCode}
                    onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full h-full bg-transparent 
                             font-mono text-sm resize-none focus:outline-none
                             text-[#f8f8f2]"
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
          </div>
          {/* Explanation Card */}
          <div className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden
                       border border-slate-200 dark:border-slate-800
                       shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3 
                          bg-slate-100 dark:bg-slate-800/50 
                          border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Explicação
              </span>
              <button
                onClick={() => isEditingExplanation ? handleSave('explanation') : setIsEditingExplanation(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs
                         bg-slate-700/50 hover:bg-slate-600/50 text-slate-300
                         transition-all duration-200 ease-in-out
                         shadow-sm hover:shadow-md active:scale-95"
                title={isEditingExplanation ? "Salvar" : "Editar"}
              >
                {isEditingExplanation ? <Save size={14} /> : <Edit2 size={14} />}
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6">
              <div className="h-[600px] overflow-auto custom-scrollbar">
                {isEditingExplanation ? (
                  <textarea
                    value={editedExplanation}
                    onChange={(e) => setEditedExplanation(e.target.value)}
                    className="w-full h-full bg-transparent 
                             font-sans text-base resize-none focus:outline-none
                             text-slate-800 dark:text-slate-300"
                  />
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed
                                 text-slate-800 dark:text-slate-300">
                      {editedExplanation}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Copy Alert - Dracula Style */}
      {showCopyAlert && (
        <div className="fixed bottom-4 right-4 
                     bg-[#44475a] text-[#f8f8f2] px-4 py-2.5
                     rounded-lg border border-[#6272a4]
                     shadow-lg shadow-[#282a36]/50
                     flex items-center gap-2 animate-slide-up">
          <Check size={16} className="text-[#50fa7b]" />
          <span className="font-medium">
            {copied ? "Código copiado!" : "Alterações salvas!"}
          </span>
        </div>
      )}

      {/* Feedback Messages */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 
                     bg-[#44475a] text-[#f8f8f2] px-4 py-2.5
                     rounded-lg border border-[#6272a4]
                     shadow-lg shadow-[#282a36]/50
                     flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#50fa7b]" />
          <span className="font-medium">Salvando...</span>
        </div>
      )}

      {saveError && (
        <div className="fixed bottom-4 right-4 
                     bg-[#ff5555] text-white px-4 py-2.5
                     rounded-lg border border-[#ff6e6e]
                     shadow-lg
                     flex items-center gap-2">
          <span className="font-medium">Erro ao salvar: {saveError}</span>
        </div>
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
          font-family: 'JetBrains Mono', ui-monospace, 'Fira Code', Monaco, Consolas, monospace;
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

        /* Selection Highlighting */
        ::selection {
          background: rgba(98, 114, 164, 0.3);
        }

        code[class*="language-"]::selection,
        code[class*="language-"] *::selection {
          background: rgba(98, 114, 164, 0.3);
        }

        /* Editor Line Numbers and Active Line */
        .line-numbers .line-numbers-rows {
          border-right: 1px solid #44475a;
          padding: 0 0.5em;
        }

        .line-numbers-rows > span:before {
          color: #6272a4;
        }

        /* Active Line Highlight */
        .editor-line-highlight {
          background: rgba(68, 71, 90, 0.3);
        }

        /* VSCode Font Rendering */
        pre[class*="language-"],
        code[class*="language-"] {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Dracula Theme Override */
        .dracula-theme pre[class*="language-"],
        .dracula-theme code[class*="language-"] {
          background: transparent !important;
          text-shadow: none !important;
        }

        .token.comment { color: #6272A4 !important; }
        .token.prolog { color: #6272A4 !important; }
        .token.doctype { color: #6272A4 !important; }
        .token.cdata { color: #6272A4 !important; }
        .token.punctuation { color: #F8F8F2 !important; }
        .token.function { color: #50FA7B !important; }
        .token.constant { color: #FF79C6 !important; }
        .token.boolean { color: #BD93F9 !important; }
        .token.number { color: #BD93F9 !important; }
        .token.string { color: #F1FA8C !important; }
        .token.keyword { color: #FF79C6 !important; }
        .token.operator { color: #FF79C6 !important; }
        .token.class-name { color: #8BE9FD !important; }
        .token.property { color: #50FA7B !important; }
      `}</style>
    </div>
  );
}

export default ExampleView;