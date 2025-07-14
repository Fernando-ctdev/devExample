import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  ArrowRight,
  Target,
  Moon,
  Sun,
  Zap,
  Users,
  BarChart3,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";
import LoginModal from "./LoginModal";
import { BackgroundBeams } from "./ui/background-beams";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [currentStats, setCurrentStats] = useState({
    hours: 0,
    topics: 0,
    streak: 0,
  });
  
  const codeExample = `// Organize seus estudos
const mindraStudy = {
  focus: "JavaScript",
  session: "60 min",
  progress: "85%",
  streak: "12 dias"
};

// Acompanhe sua evolução
console.log("Parabéns! Meta diária alcançada 🎯");
mindraStudy.updateProgress();`;

  useEffect(() => {
    // Animação de digitação
    setTypedText("");
    let timeoutId: NodeJS.Timeout;

    const typeText = (index: number = 0) => {
      if (index <= codeExample.length) {
        setTypedText(codeExample.slice(0, index));
        timeoutId = setTimeout(() => typeText(index + 1), 30);
      }
    };

    typeText();

    // Animação das estatísticas
    const animateStats = () => {
      const targetStats = { hours: 247, topics: 42, streak: 15 };
      let frame = 0;
      const frames = 120;
      
      const animate = () => {
        frame++;
        const progress = frame / frames;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setCurrentStats({
          hours: Math.floor(targetStats.hours * easeOut),
          topics: Math.floor(targetStats.topics * easeOut),
          streak: Math.floor(targetStats.streak * easeOut),
        });
        
        if (frame < frames) {
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), 1000);
    };

    animateStats();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [codeExample]);
  const handleAccessPlatform = () => {
    window.scrollTo(0, 0);
    navigate("/platform");
  };

  const features = [
    {
      icon: Brain,
      title: "Aprendizado Inteligente",
      description: "IA que adapta o conteúdo ao seu ritmo e estilo de aprendizado",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Target,
      title: "Metas Personalizadas",
      description: "Defina objetivos claros e acompanhe seu progresso em tempo real",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Análise de Progresso",
      description: "Relatórios detalhados sobre seu desempenho e evolução",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros estudantes e compartilhe conhecimento",
      color: "from-purple-500 to-fuchsia-500",
    },
  ];
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Navbar com Glassmorphism */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              Mindra
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all transform hover:scale-105 animate-pulse-glow"
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-7xl font-bold animate-fade-in">
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  Transforme
                </span>
                <br />
                <span className="text-white">seu aprendizado</span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in delay-200">
                A plataforma inteligente que organiza seus estudos, 
                acompanha sua evolução e potencializa seus resultados
              </p>
            </div>

            {/* Stats animadas */}
            <div className="flex justify-center gap-12 my-16 animate-fade-in delay-400">
              <div className="text-center animate-float">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                  {currentStats.hours}h
                </div>
                <div className="text-gray-400">Estudadas</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {currentStats.topics}
                </div>
                <div className="text-gray-400">Tópicos</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                  {currentStats.streak}
                </div>
                <div className="text-gray-400">Dias seguidos</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-600">
              <button
                onClick={handleAccessPlatform}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all transform hover:scale-105 flex items-center gap-2 text-lg font-semibold"
              >
                Começar agora
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-16 max-w-2xl mx-auto animate-fade-in delay-800">
            <div className="backdrop-blur-xl rounded-lg p-6 border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-2">mindra-study.js</span>
              </div>
              <pre className="text-sm font-mono text-gray-300">
                <code>{typedText}</code>
                <span className="animate-pulse">▋</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Por que escolher a 
              <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"> Mindra</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ferramentas poderosas para revolucionar sua forma de estudar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 hover:bg-black/60 transition-all transform hover:-translate-y-2 hover:border-white/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-xl`} />
                
                <div className="relative flex flex-col items-center text-center">
                  <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-r ${feature.color} p-4 flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Dashboard inteligente
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Visualize seu progresso em tempo real com métricas personalizadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Study Session Card */}
            <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 hover:bg-black/60 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-purple-400" size={24} />
                <h3 className="text-2xl font-semibold">Sessão de Estudo</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tempo focado</span>
                  <span className="text-2xl font-bold text-purple-400">1h 45m</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-3 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Meta: 2h</span>
                  <span>87% completo</span>
                </div>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 hover:bg-black/60 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-indigo-400" size={24} />
                <h3 className="text-2xl font-semibold">Progresso Semanal</h3>
              </div>
              <div className="space-y-4">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-8">{day}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Conquiste seus 
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent"> objetivos</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 text-center group hover:scale-105 transition-transform">
              <Award className="text-violet-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Streak Master</h3>
              <p className="text-gray-400">15 dias consecutivos de estudo</p>
            </div>
            
            <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 text-center group hover:scale-105 transition-transform">
              <Zap className="text-purple-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Speed Learner</h3>
              <p className="text-gray-400">100 tópicos concluídos</p>
            </div>
            
            <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-black/40 text-center group hover:scale-105 transition-transform">
              <Sparkles className="text-fuchsia-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Knowledge Seeker</h3>
              <p className="text-gray-400">500 horas de estudo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="backdrop-blur-xl rounded-2xl p-12 border border-white/10 bg-black/40">
            <h2 className="text-5xl font-bold mb-6">
              Pronto para transformar seus estudos?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já revolucionaram sua forma de aprender com a Mindra
            </p>
            <button
              onClick={handleAccessPlatform}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-xl font-semibold transition-all transform hover:scale-105 animate-pulse-glow"
            >
              Começar gratuitamente
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center flex items-center justify-center gap-2 text-gray-400">
          <p>© 2025 Mindra.</p>
          <span>Desenvolvido por</span>            <a 
              href="https://github.com/Fernando-ctdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            >
            Maicon Fernando
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
