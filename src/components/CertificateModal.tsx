import { useState, useEffect } from 'react';
import { X, Award, Calendar, User, Link, FileText } from 'lucide-react';
import { Certificate, CertificateFormData, Technology } from '../types/types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CertificateFormData) => void;
  certificate?: Certificate | null;
  technologies: Technology[];
  isDarkMode: boolean;
}

export default function CertificateModal({ 
  isOpen, 
  onClose, 
  onSave, 
  certificate, 
  technologies, 
  isDarkMode 
}: CertificateModalProps) {
  const [formData, setFormData] = useState<CertificateFormData>({
    title: '',
    description: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    link: '',
    technologyId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resetar formulário quando abrir/fechar modal
  useEffect(() => {
    if (isOpen) {
      if (certificate) {
        setFormData({
          title: certificate.title,
          description: certificate.description || '',
          issuer: certificate.issuer,
          issueDate: new Date(certificate.issueDate).toISOString().split('T')[0],
          expiryDate: certificate.expiryDate ? new Date(certificate.expiryDate).toISOString().split('T')[0] : '',
          credentialId: certificate.credentialId || '',
          link: certificate.link,
          technologyId: certificate.technologyId || ''
        });
      } else {
        setFormData({
          title: '',
          description: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
          link: '',
          technologyId: ''
        });
      }
    }
  }, [isOpen, certificate]);

  const handleInputChange = (field: keyof CertificateFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuer || !formData.issueDate || !formData.link) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar certificado:', error);
      alert('Erro ao salvar certificado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-xl max-h-[85vh] mx-4 rounded-2xl border backdrop-blur-md shadow-2xl overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50"
          : "bg-gradient-to-br from-white/95 to-slate-50/95 border-slate-200/50"
      }`}>
        {/* Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between ${
          isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
        }`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${
              isDarkMode ? "bg-violet-500/20" : "bg-violet-100"
            }`}>
              <Award className={`w-4 h-4 ${
                isDarkMode ? "text-violet-400" : "text-violet-600"
              }`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
                {certificate ? 'Editar Certificação' : 'Nova Certificação'}
              </h2>
              <p className={`text-xs ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Preencha as informações da sua certificação
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode
                ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-400"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-110px)]">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Título e Instituição */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Título da Certificação *
                </label>
                <div className="relative">
                  <Award className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`} />
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                    } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                    placeholder="Ex: AWS Cloud Practitioner"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Instituição *
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`} />
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => handleInputChange('issuer', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                    } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                    placeholder="Ex: Amazon Web Services"
                  />
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}>
                Descrição
              </label>
              <div className="relative">
                <FileText className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`} />
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 resize-none text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                  placeholder="Descrição da certificação (opcional)"
                />
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Data de Emissão *
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`} />
                  <input
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-white focus:border-violet-500/50"
                        : "bg-white border-slate-200 text-slate-900 focus:border-violet-500/50"
                    } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Data de Expiração
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`} />
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-white focus:border-violet-500/50"
                        : "bg-white border-slate-200 text-slate-900 focus:border-violet-500/50"
                    } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                  />
                </div>
              </div>
            </div>

            {/* Link e ID da Credencial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Link do Certificado *
                </label>
                <div className="relative">
                  <Link className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`} />
                  <input
                    type="url"
                    required
                    value={formData.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                    } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  ID da Credencial
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) => handleInputChange('credentialId', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                  placeholder="Ex: ABC123456"
                />
              </div>
            </div>

            {/* URL da Imagem e Tecnologia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  Tecnologia Relacionada
                </label>
                <select
                  value={formData.technologyId}
                  onChange={(e) => handleInputChange('technologyId', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-1 focus:ring-violet-500/20`}
                >
                  <option value="">Selecione uma tecnologia</option>
                  {technologies.map(tech => (
                    <option key={tech.id} value={tech.id} className="capitalize">{tech.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 border-t flex justify-end gap-2 ${
          isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm ${
              isDarkMode
                ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg 
                       font-medium transition-all duration-300 hover:scale-105 text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                         isSubmitting ? 'animate-pulse' : ''
                       }`}
          >
            {isSubmitting ? 'Salvando...' : certificate ? 'Atualizar' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
