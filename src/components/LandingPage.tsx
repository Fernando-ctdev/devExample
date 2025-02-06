import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, BookOpen, Library, ArrowRight, Terminal, Moon, Sun } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState('');
  const codeExample = 'const learning = "code";\nconst method = "by example";';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    let index = 0;
    const typeText = () => {
      if (index < codeExample.length) {
        setTypedText(prev => prev + codeExample[index]);
        index++;
        setTimeout(typeText, 50);
      }
    };
    typeText();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const technologies = [
    {
      name: "JavaScript",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
      color: "from-yellow-400",
      description: "A linguagem da web moderna"
    },
    {
      name: "TypeScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
      color: "from-blue-500",
      description: "JavaScript com tipagem"
    },
    {
      name: "Golang",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
      color: "from-cyan-500",
      description: "Performance e simplicidade"
    },
    {
      name: "Gin",
      logo:"https://avatars.githubusercontent.com/u/7894478?v=4",
      color: "from-sky-500",
      description: "Framework web rápido para Go"
    },
    {
      name: "NodeJS",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
      color: "from-green-600",
      description: "Runtime JavaScript versátil"
    },
    {
      name: "NestJS",
      logo: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
      color: "from-red-700",
      description: "Framework Node.js escalável"
    }
  ];

  const handleAccessPlatform = () => {
    navigate('/platform');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-b from-blue-900 via-blue-800 to-black text-white' : 'bg-gradient-to-b from-blue-50 to-white text-gray-900'} transition-colors duration-500`}>
      {/* Background Grid com Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
                             linear-gradient(to bottom, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
      </div>

      {/* Navbar com Glassmorphism */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Techs with Example</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={handleAccessPlatform}
              className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Acessar Plataforma
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-6xl font-bold animate-fade-in">
                Aprenda programação com exemplos práticos
              </h1>
              <p className="text-xl text-blue-200 animate-fade-in delay-200">
                Explore e aprenda diferentes tecnologias de programação através de exemplos práticos e documentação clara.
              </p>
              <button 
                onClick={handleAccessPlatform}
                className="group px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-fade-in delay-300"
              >
                Começar agora
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex-1">
              <div className="backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-transform animate-fade-in delay-400">
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
            Tecnologias Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="group relative backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity rounded-xl`} />
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
                  <p className="text-sm opacity-80">{tech.description}</p>
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
            Como funciona
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-6">
                <Terminal size={24} className="text-blue-400" />
                <h3 className="text-2xl font-semibold">Exemplos Práticos</h3>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <pre className="text-sm">
                  <code>
                    <span className="text-blue-400">function</span>{" "}
                    <span className="text-green-400">example</span>() {"{"}
                    <br />
                    {"  "}console.log(<span className="text-yellow-300">"Hello, World!"</span>);
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen size={24} className="text-green-400" />
                <h3 className="text-2xl font-semibold">Explicações Claras</h3>
              </div>
              <p className="text-lg leading-relaxed">
                Cada exemplo vem com explicações detalhadas e casos de uso práticos para melhor compreensão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-12 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl mb-8 text-blue-200">
              Acesse agora e explore exemplos práticos das principais tecnologias do mercado.
            </p>
            <button 
              onClick={handleAccessPlatform}
              className="px-8 py-4 rounded-full bg-white text-blue-900 hover:bg-blue-50 transition-colors font-semibold hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            >
              Acessar plataforma
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-blue-200">
          <p>© 2025 Techs with Example. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Custom cursor effect */}
      <div 
        className="fixed w-4 h-4 border-2 border-white rounded-full pointer-events-none mix-blend-difference transition-transform duration-200 z-50"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`
        }}
      />
    </div>
  );
};

export default LandingPage;