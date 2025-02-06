import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  BookOpen,
  Library,
  ArrowRight,
  Terminal,
  Moon,
  Sun,
} from "lucide-react";
import LoginModal from './LoginModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState("");
  const codeExample = `// Organize seus exemplos
const myExamples = {
  javascript: "Exemplos modernos",
  typescript: "Código tipado",
  golang: "Alta performance"
};

// Personalize sua biblioteca
console.log("Bem-vindo à sua biblioteca de código!");`;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    setTypedText("");
    let timeoutId: NodeJS.Timeout;

    const typeText = (index: number = 0) => {
      if (index <= codeExample.length) {
        setTypedText(codeExample.slice(0, index));
        timeoutId = setTimeout(() => typeText(index + 1), 30);
      }
    };

    typeText();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [codeExample]);

  const technologies = [
    {
      name: "JavaScript",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
      color: "from-yellow-400",
      description: "Exemplos práticos para desenvolvimento web moderno",
    },
    {
      name: "TypeScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
      color: "from-blue-500",
      description: "Códigos tipados com exemplos de uso real",
    },
    {
      name: "Golang",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
      color: "from-cyan-500",
      description: "Exemplos de alta performance e concorrência",
    },
    {
      name: "Gin",
      logo: "https://avatars.githubusercontent.com/u/7894478?v=4",
      color: "from-sky-500",
      description: "Casos práticos de APIs REST em Go",
    },
    {
      name: "NodeJS",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
      color: "from-green-600",
      description: "Exemplos de backend e ferramentas JavaScript",
    },
    {
      name: "NestJS",
      logo: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
      color: "from-red-700",
      description: "Exemplos escaláveis de arquitetura TypeScript",
    },
  ];

  const handleAccessPlatform = () => {
    navigate("/platform");
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-b from-blue-900 via-blue-800 to-black text-white"
          : "bg-gradient-to-b from-blue-100 via-white to-blue-50 text-gray-800"
      } transition-colors duration-500`}
    >
      {/* Background Grid com Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${isDark ? "opacity-10" : "opacity-5"}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${
              isDark ? "#ffffff" : "#000000"
            } 1px, transparent 1px),
                             linear-gradient(to bottom, ${
                               isDark ? "#ffffff" : "#000000"
                             } 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Navbar com Glassmorphism */}
      <nav
        className={`fixed w-full z-50 backdrop-blur-lg ${
          isDark ? "bg-white/10 border-white/20" : "bg-white/30 border-black/5"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Techs with Example</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${
                  isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                } transition-colors`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className={`px-6 py-2 rounded-full backdrop-blur-sm transition-all ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-black/5 hover:bg-black/10 border-black/10 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                } border`}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-6xl font-bold animate-fade-in">
                Organize e explore exemplos práticos de programação
              </h1>
              <p
                className={`text-xl ${
                  isDark ? "text-blue-200" : "text-gray-600"
                } animate-fade-in delay-200`}
              >
                Crie sua biblioteca personalizada de exemplos de código,
                pesquise soluções práticas e organize seu aprendizado em
                diferentes tecnologias.
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                className={`px-8 py-4 rounded-full backdrop-blur-sm transition-all ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-black/5 hover:bg-black/10 border-black/10 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                } border`}
              >
                Criar minha biblioteca
              </button>
            </div>
            <div className="flex-1">
              <div
                className={`backdrop-blur-xl rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-transform animate-fade-in delay-400 ${
                  isDark
                    ? "bg-white/10 border-white/20"
                    : "bg-white/50 border-black/5"
                } border`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-sm font-mono">
                  <code>{typedText}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Explore e Organize por Tecnologia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`group relative backdrop-blur-xl rounded-xl p-8 transition-all transform hover:-translate-y-2 ${
                  isDark
                    ? "bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "bg-white/50 border-black/5 hover:bg-white/60 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]"
                } border`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity rounded-xl`}
                />
                <div className="relative flex flex-col items-center text-center">
                  {tech.logo ? (
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-16 h-16 mb-4 object-contain transform group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-16 h-16 mb-4 flex items-center justify-center text-3xl">
                      {tech.name[0]}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                  <p
                    className={`text-sm ${
                      isDark ? "opacity-80" : "text-gray-600"
                    }`}
                  >
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Demo Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Como organizar seus exemplos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`backdrop-blur-xl rounded-xl p-8 transform hover:scale-105 transition-transform ${
                isDark
                  ? "bg-white/10 border-white/20"
                  : "bg-white/50 border-black/5"
              } border`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Terminal
                  size={24}
                  className={isDark ? "text-blue-400" : "text-blue-600"}
                />
                <h3 className="text-2xl font-semibold">
                  Exemplos práticos organizados
                </h3>
              </div>
              <div
                className={`${
                  isDark ? "bg-black/30" : "bg-black/10"
                } rounded-lg p-4`}
              >
                <pre className="text-sm">
                  <code>
                    <span
                      className={isDark ? "text-gray-500" : "text-gray-600"}
                    >
                      // Exemplo de organização
                    </span>
                    <br />
                    <span
                      className={isDark ? "text-blue-400" : "text-blue-600"}
                    >
                      const
                    </span>{" "}
                    <span
                      className={isDark ? "text-green-400" : "text-green-600"}
                    >
                      myLibrary
                    </span>{" "}
                    = {"{"}
                    <br />
                    {"  "}category:{" "}
                    <span
                      className={isDark ? "text-yellow-300" : "text-yellow-600"}
                    >
                      "Arrays"
                    </span>
                    ,
                    <br />
                    {"  "}examples: [
                    <span
                      className={isDark ? "text-yellow-300" : "text-yellow-600"}
                    >
                      "map"
                    </span>
                    ,{" "}
                    <span
                      className={isDark ? "text-yellow-300" : "text-yellow-600"}
                    >
                      "filter"
                    </span>
                    ]
                    <br />
                    {"}"};
                    <br />
                    <br />
                    <span
                      className={isDark ? "text-gray-500" : "text-gray-600"}
                    >
                      {">"} saveExample(myLibrary)
                    </span>
                    <br />
                    <span
                      className={isDark ? "text-green-300" : "text-green-600"}
                    >
                      Exemplo salvo com sucesso!
                    </span>
                    <br />
                    <span
                      className={isDark ? "text-gray-500" : "text-gray-600"}
                    >
                      {">"}{" "}
                    </span>
                    <span className="animate-pulse">▋</span>
                  </code>
                </pre>
              </div>
            </div>
            <div
              className={`backdrop-blur-xl rounded-xl p-8 transform hover:scale-105 transition-transform ${
                isDark
                  ? "bg-white/10 border-white/20"
                  : "bg-white/50 border-black/5"
              } border`}
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen
                  size={24}
                  className={isDark ? "text-green-400" : "text-green-600"}
                />
                <h3 className="text-2xl font-semibold">
                  Biblioteca Personalizada
                </h3>
              </div>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Organize seus exemplos por tecnologia e categoria, crie sua
                própria biblioteca de referência e acesse rapidamente quando
                precisar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className={`backdrop-blur-xl rounded-2xl p-12 transition-shadow ${
              isDark
                ? "bg-white/10 border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                : "bg-white/50 border-black/5 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]"
            } border`}
          >
            <h2 className="text-4xl font-bold mb-6">
              Comece a construir sua biblioteca
            </h2>
            <p
              className={`text-xl mb-8 ${
                isDark ? "text-blue-200" : "text-gray-600"
              }`}
            >
              Crie sua própria biblioteca de exemplos práticos, organize por
              tecnologia e compartilhe seu conhecimento. Comece agora a
              construir seu acervo personalizado de códigos e soluções.
            </p>
            <button
              onClick={handleAccessPlatform}
              className={`px-8 py-4 rounded-full font-semibold transition-all ${
                isDark
                  ? "bg-white text-blue-900 hover:bg-blue-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              }`}
            >
              Começar agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`backdrop-blur-md border-t ${
          isDark
            ? "bg-black/50 border-white/10 text-blue-200"
            : "bg-black/5 border-black/5 text-gray-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p>© 2025 Techs with Example. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Custom cursor effect */}
      <div
        className={`fixed w-4 h-4 border-2 rounded-full pointer-events-none mix-blend-difference transition-transform duration-200 z-50 ${
          isDark ? "border-white" : "border-black"
        }`}
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
        }}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};

export default LandingPage;
