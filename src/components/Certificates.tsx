import { useState, useEffect } from 'react';
import { Award, Plus, ExternalLink, Calendar, User, Edit3, Trash2, Search, Filter } from 'lucide-react';
import { Certificate, CertificatesProps, CertificateFormData } from '../types/types';
import CertificateModal from './CertificateModal';

export function Certificates({ isDarkMode, technologies }: CertificatesProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'issuer'>('date');

  // Carregar certificados
  const loadCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/certificates');
      const data = await response.json();
      
      if (data.success) {
        setCertificates(data.data || []);
      } else {
        console.error('Erro ao carregar certificados:', data.error);
      }
    } catch (error) {
      console.error('Erro ao carregar certificados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // Filtrar e ordenar certificados
  const filteredCertificates = certificates
    .filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTechnology = !selectedTechnology || cert.technologyId === selectedTechnology;
      
      return matchesSearch && matchesTechnology;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'issuer':
          return a.issuer.localeCompare(b.issuer);
        default:
          return 0;
      }
    });

  // Funções para gerenciar certificados
  const handleAddCertificate = () => {
    setEditingCertificate(null);
    setIsModalOpen(true);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este certificado?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/certificates/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCertificates(prev => prev.filter(cert => cert.id !== id));
      } else {
        console.error('Erro ao deletar certificado');
      }
    } catch (error) {
      console.error('Erro ao deletar certificado:', error);
    }
  };

  const handleSaveCertificate = async (certificateData: CertificateFormData) => {
    try {
      const url = editingCertificate 
        ? `http://localhost:3001/api/certificates/${editingCertificate.id}`
        : 'http://localhost:3001/api/certificates';
      
      const method = editingCertificate ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificateData)
      });

      const data = await response.json();
      
      if (data.success) {
        if (editingCertificate) {
          setCertificates(prev => prev.map(cert => 
            cert.id === editingCertificate.id ? data.data : cert
          ));
        } else {
          setCertificates(prev => [data.data, ...prev]);
        }
        setIsModalOpen(false);
        setEditingCertificate(null);
      } else {
        console.error('Erro ao salvar certificado:', data.error);
      }
    } catch (error) {
      console.error('Erro ao salvar certificado:', error);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate: Date | string | null | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: Date | string | null | undefined) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiry > now && expiry <= sixMonthsFromNow;
  };

  return (
    <div className={`h-screen flex flex-col ${
      isDarkMode
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
    }`}>
      {/* Header */}
      <header className={`flex-shrink-0 text-white shadow-2xl backdrop-blur-md border-b
        ${isDarkMode
          ? "bg-gradient-to-r from-violet-900/90 to-purple-900/90 border-slate-700/50"
          : "bg-gradient-to-r from-violet-600/95 to-purple-600/95 border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Conquistas
                </h1>
                <p className="text-lg text-white/80 font-medium">
                  Gerenciar suas certificações e conquistas profissionais
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-6 py-6 pb-14 flex flex-col h-full">
          {/* Filtros e Busca */}
          <div className={`rounded-2xl border backdrop-blur-md p-6 mb-6 transition-all duration-300 shadow-xl ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-violet-700/30"
              : "bg-gradient-to-br from-white/80 to-slate-50/80 border-violet-200/50"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
                Filtros e Busca
              </h2>
              <button
                onClick={handleAddCertificate}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-violet-600 hover:bg-violet-700 text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
              >
                <Plus className="w-4 h-4" />
                Nova Certificação
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`} />
                <input
                  type="text"
                  placeholder="Buscar certificações..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                />
              </div>

              {/* Filtro por Tecnologia */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`} />
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                >
                  <option value="">Todas as tecnologias</option>
                  {technologies.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.title}</option>
                  ))}
                </select>
              </div>

              {/* Ordenação */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'issuer')}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-white focus:border-violet-500/50"
                      : "bg-white border-slate-200 text-slate-900 focus:border-violet-500/50"
                  } focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                >
                  <option value="date">Ordenar por Data</option>
                  <option value="title">Ordenar por Título</option>
                  <option value="issuer">Ordenar por Instituição</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de Certificados */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                  <span className={`text-lg font-medium ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    Carregando certificações...
                  </span>
                </div>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl border backdrop-blur-md ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
              }`}>
                <Award className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? "text-violet-400" : "text-violet-300"
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                  {searchQuery || selectedTechnology ? 'Nenhuma certificação encontrada' : 'Nenhuma certificação cadastrada'}
                </h3>
                <p className={`text-sm mb-6 ${
                  isDarkMode ? "text-slate-500" : "text-slate-500"
                }`}>
                  {searchQuery || selectedTechnology 
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece adicionando sua primeira certificação'
                  }
                </p>
                {!searchQuery && !selectedTechnology && (
                  <button
                    onClick={handleAddCertificate}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl 
                             font-medium transition-all duration-300 hover:scale-105"
                  >
                    Adicionar Primeira Certificação
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredCertificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className={`group relative overflow-hidden rounded-lg border-2 backdrop-blur-md transition-all duration-300 hover:shadow-xl shadow-lg hover:scale-[1.02] ${
                      isDarkMode
                        ? "bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-violet-500/40 hover:border-violet-400/70"
                        : "bg-gradient-to-r from-white/98 to-slate-50/98 border-violet-300/50 hover:border-violet-500/70"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, transparent 0%, transparent 45%, rgba(139, 92, 246, 0.03) 50%, transparent 55%, transparent 100%)`,
                    }}
                  >
                    {/* Ornamentos decorativos */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-l-2 border-t-2 border-violet-400/30 rounded-tl-lg" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-r-2 border-t-2 border-violet-400/30 rounded-tr-lg" />
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-l-2 border-b-2 border-violet-400/30 rounded-bl-lg" />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-r-2 border-b-2 border-violet-400/30 rounded-br-lg" />
                    
                    {/* Borda superior elegante */}
                    <div className={`h-1 w-full ${
                      isExpired(certificate.expiryDate) 
                        ? "bg-gradient-to-r from-red-500 via-red-600 to-red-500" 
                        : isExpiringSoon(certificate.expiryDate)
                        ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500"
                        : "bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"
                    }`} />

                    <div className="relative p-3">
                      {/* Header com selo e título */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Selo oficial */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-white/20 flex-shrink-0 ${
                          isExpired(certificate.expiryDate) 
                            ? "bg-gradient-to-br from-red-500 to-red-600" 
                            : isExpiringSoon(certificate.expiryDate)
                            ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                            : "bg-gradient-to-br from-violet-500 to-purple-600"
                        }`}>
                          <Award className="w-5 h-5 text-white" />
                        </div>

                        {/* Informações principais */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-sm leading-tight mb-1 line-clamp-2 ${
                                isDarkMode ? "text-white" : "text-slate-800"
                              }`}>
                                {certificate.title}
                              </h3>
                              
                              <p className={`text-xs font-medium mb-1 truncate ${
                                isDarkMode ? "text-slate-300" : "text-slate-600"
                              }`}>
                                <User className="w-2.5 h-2.5 inline mr-1" />
                                {certificate.issuer}
                              </p>
                            </div>

                            {/* Botões de ação compactos */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2">
                              <button
                                onClick={() => handleEditCertificate(certificate)}
                                className={`p-1 rounded transition-all duration-200 hover:scale-110 ${
                                  isDarkMode
                                    ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                                    : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                                }`}
                                title="Editar"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteCertificate(certificate.id)}
                                className={`p-1 rounded transition-all duration-200 hover:scale-110 ${
                                  isDarkMode
                                    ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                                    : "bg-red-100 hover:bg-red-200 text-red-600"
                                }`}
                                title="Excluir"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Informações detalhadas */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className={`w-3 h-3 ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`} />
                          <span className={`${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {formatDate(certificate.issueDate)}
                          </span>
                        </div>
                        
                        {certificate.expiryDate && (
                          <div className="flex items-center gap-2 text-xs">
                            <div className={`w-2 h-2 rounded-full ${
                              isExpired(certificate.expiryDate) 
                                ? "bg-red-500" 
                                : isExpiringSoon(certificate.expiryDate)
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`} />
                            <span className={`font-medium ${
                              isExpired(certificate.expiryDate) 
                                ? "text-red-500" 
                                : isExpiringSoon(certificate.expiryDate)
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}>
                              {isExpired(certificate.expiryDate) 
                                ? "Expirado" 
                                : `Válido até ${formatDate(certificate.expiryDate)}`
                              }
                            </span>
                          </div>
                        )}

                        {certificate.technology && (
                          <div className="flex items-center gap-2 text-xs">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: certificate.technology.color }}
                            />
                            <span className={`capitalize ${
                              isDarkMode ? "text-slate-400" : "text-slate-500"
                            }`}>
                              {certificate.technology.name}
                            </span>
                          </div>
                        )}

                        {certificate.credentialId && (
                          <div className="text-xs">
                            <span className={`font-mono ${
                              isDarkMode ? "text-violet-300" : "text-violet-600"
                            }`}>
                              ID: {certificate.credentialId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Descrição condensada */}
                      {certificate.description && (
                        <div className={`mb-3 pb-3 border-b ${
                          isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
                        }`}>
                          <p className={`text-xs italic line-clamp-2 ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {certificate.description}
                          </p>
                        </div>
                      )}

                      {/* Botão de verificação */}
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1 w-full py-2 px-3 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 text-white shadow-md ${
                          isExpired(certificate.expiryDate) 
                            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" 
                            : "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verificar Certificado
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Certificado */}
      {isModalOpen && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCertificate(null);
          }}
          onSave={handleSaveCertificate}
          certificate={editingCertificate}
          technologies={technologies}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
