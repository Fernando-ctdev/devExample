import React from 'react';
import { X, Brain } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
    />
    <path
      fill="#34A853"
      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970244 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
    />
    <path
      fill="#4A90E2"
      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 23 23">
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

const LoginModal = ({ 
  isOpen = true,
  onClose = () => {}
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay com blur e efeito glassmorphism */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 backdrop-blur-md bg-black/70"
          onClick={onClose}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #8B5CF6 1px, transparent 1px),
                           linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Modal com design moderno */}
      <div className="relative w-full max-w-md bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transform transition-all animate-fade-in hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        
        {/* Conteúdo do Modal */}
        <div className="p-8">
          {/* Botão de fechar */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Cabeçalho com branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-white">
              Bem-vindo à <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">Mindra</span>
            </h2>
            <p className="text-gray-400">
              Acesse sua plataforma de aprendizado inteligente
            </p>
          </div>

          {/* Botões de Login */}
          <div className="space-y-4">
            {/* Google */}
            <button className="w-full p-4 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 hover:border-purple-400/50">
              <GoogleIcon />
              <span>Continuar com Google</span>
            </button>

            {/* GitHub */}
            <button className="w-full p-4 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 hover:border-purple-400/50">
              <GithubIcon />
              <span>Continuar com GitHub</span>
            </button>

            {/* Microsoft */}
            <button className="w-full p-4 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 hover:border-purple-400/50">
              <MicrosoftIcon />
              <span>Continuar com Microsoft</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Botão de acesso como visitante */}
          <button className="w-full p-4 rounded-xl backdrop-blur-sm bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            Continuar como visitante
          </button>

          {/* Termos e Política */}
          <div className="mt-8">
            <p className="text-sm text-center max-w-sm mx-auto text-gray-400">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline hover:text-purple-400 transition-colors text-gray-300">
                Termos de Serviço
              </a>
              {' '}e{' '}
              <a href="#" className="underline hover:text-purple-400 transition-colors text-gray-300">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>

        {/* Efeito de borda brilhante */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-violet-500/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default LoginModal;