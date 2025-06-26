import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  BookOpen,
  Code,
  RefreshCw,
  Edit3,
  Trash2,
  Check,
  Plus,
  ArrowLeft,
  Play,
} from "lucide-react";
import { StudyModal } from "./StudyModal";
import { useStudyTimerControl } from "../hooks/useStudyTimer";
import { Technology, Topic } from "../types/types";

interface CalendarProps {
  isDarkMode: boolean;
  technologies: Technology[];
}

export const Calendar: React.FC<CalendarProps> = ({
  isDarkMode,
  technologies,
}) => {
  const { startSession } = useStudyTimerControl();
  React.useEffect(() => {
    // CSS customizado para scrollbar
    const scrollbarStyles = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${
          isDarkMode ? "rgba(71, 85, 105, 0.5)" : "rgba(148, 163, 184, 0.5)"
        };
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${
          isDarkMode ? "rgba(71, 85, 105, 0.7)" : "rgba(148, 163, 184, 0.7)"
        };
      }
    `;

    const style = document.createElement("style");
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    type: string;
  } | null>(null);

  const [events, setEvents] = useState([
    {
      id: 1,
      day: 15,
      title: "Estudar React Hooks",
      type: "study",
      completed: false,
      description:
        "Revisar conceitos de useState, useEffect e hooks customizados",
      technologyId: "javascript",
      categoryId: "react",
      topicId: "hooks",
    },
    {
      id: 2,
      day: 20,
      title: "Projeto TypeScript",
      type: "project",
      completed: true,
      description:
        "Finalizar implementação das interfaces e configuração do build",
      technologyId: "typescript",
      categoryId: "fundamentals",
      topicId: "interfaces",
    },
    {
      id: 3,
      day: 25,
      title: "Review JavaScript",
      type: "review",
      completed: false,
      description:
        "Revisar conceitos de closures, async/await e manipulação de arrays",
      technologyId: "javascript",
      categoryId: "fundamentals",
      topicId: "functions",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "study",
    day: new Date().getDate(),
    completed: false,
    description: "",
    technologyId: "",
    categoryId: "",
    topicId: "",
  });

  const [editingEvent, setEditingEvent] = useState<{
    id: number;
    day: number;
    title: string;
    type: string;
    completed: boolean;
    description: string;
    technologyId: string;
    categoryId: string;
    topicId: string;
  } | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Estados para dados dinâmicos
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; technologyId: string }[]
  >([]);
  const [items, setItems] = useState<
    { id: string; title: string; categoryId: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Função utilitária para verificar se é data passada
  const isPastDate = React.useCallback((day: number) => {
    const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  }, [currentDate]);

  // Centralizar lógica de data passada - marcar automaticamente como concluído
  React.useEffect(() => {
    // Só aplicar para novos eventos (não edição) e quando é data passada
    if (!editingEvent && isPastDate(newEvent.day)) {
      setNewEvent(prev => ({ ...prev, completed: true }));
    }
  }, [newEvent.day, currentDate, editingEvent, isPastDate]);

  // Carregar categorias quando a tecnologia for selecionada
  React.useEffect(() => {
    if (newEvent.technologyId) {
      const loadCategoriesAndTopics = async (techId: string) => {
        try {
          setLoading(true);
          console.log(
            "Calendar - Carregando categorias para tecnologia:",
            techId
          );

          // Carregar categorias diretamente da API
          const categoriesResponse = await fetch(
            `/api/categories?technologyId=${techId}`
          );
          const categoriesData = await categoriesResponse.json();
          console.log("Calendar - Categorias recebidas:", categoriesData);

          if (categoriesData.success) {
            setCategories(categoriesData.data || []);
            console.log(
              "Calendar - Categorias definidas:",
              categoriesData.data
            );
          }

          // Também carregar tópicos para usar quando uma categoria for selecionada
          const topicsResponse = await fetch(`/api/topics/${techId}`);
          const topicsData = await topicsResponse.json();
          console.log("Calendar - Topics recebidos:", topicsData);

          if (topicsData.success) {
            setTopics(topicsData.data || []);
            console.log("Calendar - Topics definidos:", topicsData.data);
          }
        } catch (error) {
          console.error("Erro ao carregar dados da tecnologia:", error);
        } finally {
          setLoading(false);
        }
      };
      loadCategoriesAndTopics(newEvent.technologyId);
    } else {
      // Limpar dados quando nenhuma tecnologia estiver selecionada
      setCategories([]);
      setTopics([]);
      setItems([]);
      console.log(
        "Calendar - Categorias, topics e items limpos (nenhuma tecnologia selecionada)"
      );
    }
  }, [newEvent.technologyId]);

  // Carregar itens quando uma categoria for selecionada
  React.useEffect(() => {
    if (newEvent.categoryId) {
      const loadItems = async () => {
        try {
          // Encontrar a categoria selecionada para pegar o ID
          const selectedCategory = categories.find(
            (cat) => cat.name === newEvent.categoryId
          );
          if (!selectedCategory) {
            console.log(
              "Calendar - Categoria não encontrada:",
              newEvent.categoryId
            );
            return;
          }

          console.log(
            "Calendar - Carregando itens para categoria:",
            selectedCategory.id
          );
          const itemsResponse = await fetch(
            `/api/items?categoryId=${selectedCategory.id}`
          );
          const itemsData = await itemsResponse.json();
          console.log("Calendar - Items recebidos:", itemsData);

          if (itemsData.success) {
            setItems(itemsData.data || []);
            console.log("Calendar - Items definidos:", itemsData.data);
          }
        } catch (error) {
          console.error("Erro ao carregar itens da categoria:", error);
        }
      };
      loadItems();
    } else {
      // Limpar itens quando nenhuma categoria estiver selecionada
      setItems([]);
      console.log("Calendar - Items limpos (nenhuma categoria selecionada)");
    }
  }, [newEvent.categoryId, categories]);

  // Filtrar categorias pela tecnologia selecionada
  const getAvailableCategories = () => {
    console.log("Calendar - getAvailableCategories chamado");
    console.log("Calendar - newEvent.technologyId:", newEvent.technologyId);
    console.log("Calendar - categories state:", categories);

    if (!newEvent.technologyId) {
      console.log(
        "Calendar - Nenhuma tecnologia selecionada, retornando array vazio"
      );
      return [];
    }

    // Retornar as categorias carregadas da API
    console.log("Calendar - Categorias disponíveis final:", categories);
    return categories;
  };

  // Filtrar tópicos (items) pela categoria selecionada
  const getAvailableTopics = () => {
    console.log("Calendar - getAvailableTopics chamado");
    console.log("Calendar - newEvent.categoryId:", newEvent.categoryId);
    console.log("Calendar - items disponíveis:", items);

    if (!newEvent.categoryId) {
      console.log(
        "Calendar - Nenhuma categoria selecionada, retornando array vazio"
      );
      return [];
    }

    console.log("Calendar - Items disponíveis final:", items);
    return items;
  };

  const today = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  const handleCreateEvent = () => {
    if (newEvent.title.trim()) {
      if (editingEvent) {
        // Editando evento existente
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id
              ? {
                  ...event,
                  title: newEvent.title,
                  type: newEvent.type,
                  day: newEvent.day,
                  completed: newEvent.completed,
                  description: newEvent.description,
                  technologyId: newEvent.technologyId,
                  categoryId: newEvent.categoryId,
                  topicId: newEvent.topicId,
                }
              : event
          )
        );
      } else {
        // Criando novo evento
        const newId = Math.max(...events.map((e) => e.id), 0) + 1;
        setEvents([
          ...events,
          {
            id: newId,
            ...newEvent,
            day: newEvent.day,
            completed: newEvent.completed,
          },
        ]);
      }
      handleCloseModal();
    }
  };
  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      title: "",
      type: "study",
      day: new Date().getDate(),
      completed: false,
      description: "",
      technologyId: "",
      categoryId: "",
      topicId: "",
    });
  };
  const handleDeleteEvent = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete !== null) {
      setEvents(events.filter((event) => event.id !== eventToDelete));
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  const cancelDeleteEvent = () => {
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  const handleToggleComplete = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const handleEditEvent = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setNewEvent({
        title: event.title,
        type: event.type,
        day: event.day,
        completed: event.completed,
        description: event.description,
        technologyId: event.technologyId || "",
        categoryId: event.categoryId || "",
        topicId: event.topicId || "",
      });
      setShowEventModal(true);
    }
  };
  const handleDayClick = (day: number) => {
    const dayEvents = getDayEvents(day);

    if (dayEvents.length > 0) {
      // Se há eventos no dia, mostrar apenas os eventos daquele dia
      setSelectedDay(day);
    } else {
      // Se não há eventos, abrir o modal para criar novo evento
      setNewEvent({
        ...newEvent,
        day,
        completed: false,
        technologyId: "",
        categoryId: "",
        topicId: "",
      });
      setShowEventModal(true);
    }
  };

  const handleBackToMonth = () => {
    setSelectedDay(null);
  };

  const handleNewEventFromDay = () => {
    if (selectedDay) {
      setNewEvent({
        ...newEvent,
        day: selectedDay,
        completed: false,
        technologyId: "",
        categoryId: "",
        topicId: "",
      });
      setShowEventModal(true);
    }
  };
  const getDayEvents = (day: number) => {
    return events.filter((event) => event.day === day);
  };

  // Funções para gerenciar sessões de estudo
  const handleStartStudyClick = (eventTitle: string, eventType: string) => {
    setSelectedEvent({ title: eventTitle, type: eventType });
    setIsStudyModalOpen(true);
  };
  const handleStartStudy = (duration: number, breakDuration: number) => {
    if (!selectedEvent) return;

    startSession({
      eventTitle: selectedEvent.title,
      duration,
      breakDuration,
    });

    setIsStudyModalOpen(false);
    setSelectedEvent(null);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Adicionar dias vazios no início
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 flex items-center justify-center h-full"
        ></div>
      );
    }

    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

      const dayEvents = getDayEvents(day);
      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`p-2 border cursor-pointer transition-all duration-300 hover:scale-105 relative flex flex-col h-full ${
            isDarkMode ? "border-slate-700/30" : "border-slate-200/30"
          } ${
            isToday
              ? isDarkMode
                ? "bg-gradient-to-br from-violet-600/30 to-purple-600/30 border-violet-500/50 shadow-lg"
                : "bg-gradient-to-br from-violet-100 to-purple-100 border-violet-400/50 shadow-lg"
              : isDarkMode
              ? "hover:bg-slate-700/30 hover:border-slate-600/50"
              : "hover:bg-slate-50/60 hover:border-slate-300/50"
          }`}
        >
          <div className="flex flex-col h-full min-h-0">
            <span
              className={`text-sm font-semibold flex-shrink-0 ${
                isToday
                  ? isDarkMode
                    ? "text-violet-300"
                    : "text-violet-700"
                  : isDarkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {day}
            </span>
            {dayEvents.length > 0 && (
              <div className="flex-1 mt-1 space-y-1 overflow-hidden">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full truncate font-medium backdrop-blur-sm ${
                      event.type === "study"
                        ? isDarkMode
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : event.type === "project"
                        ? isDarkMode
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                        : isDarkMode
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div
                    className={`text-xs font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    +{dayEvents.length - 2}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };
  return (
    <div
      className={`h-full flex flex-col ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Header Padrão - Template para outras páginas */}
      <header
        className={`text-white shadow-2xl backdrop-blur-md border-b flex-shrink-0 rounded-t-2xl
        ${
          isDarkMode
            ? "bg-gradient-to-r from-violet-900/90 to-purple-900/90 border-slate-700/50"
            : "bg-gradient-to-r from-violet-600/95 to-purple-600/95 border-slate-200/50"
        }`}
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 bg-white/15">
                <CalendarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Calendário de Estudos
                </h1>
                <p className="text-lg text-white/80 font-medium">
                  Organize seu cronograma de estudos
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col min-h-0">
        {" "}
        {/* Controles do Calendário */}
        <div className="flex items-center justify-start mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousMonth}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md border ${
                isDarkMode
                  ? "bg-slate-800/80 border-slate-700/50 hover:bg-slate-700/80 text-slate-300 hover:text-white"
                  : "bg-white/80 border-slate-200/50 hover:bg-slate-50/80 text-slate-600 hover:text-slate-900"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>{" "}
            <h2
              onClick={() => setSelectedDay(null)}
              className={`text-lg font-bold cursor-pointer transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "text-white hover:text-violet-300"
                  : "text-slate-900 hover:text-violet-600"
              }`}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToNextMonth}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md border ${
                isDarkMode
                  ? "bg-slate-800/80 border-slate-700/50 hover:bg-slate-700/80 text-slate-300 hover:text-white"
                  : "bg-white/80 border-slate-200/50 hover:bg-slate-50/80 text-slate-600 hover:text-slate-900"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className={`px-3 py-2 rounded-xl font-semibold text-xs transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md border ${
                isDarkMode
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-violet-500/30"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white border-violet-400/30"
              }`}
            >
              Hoje
            </button>
          </div>
        </div>{" "}
        {/* Layout Principal: Calendário + Lista de Eventos */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Calendário à esquerda - flex para ocupar espaço restante */}
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 rounded-2xl border overflow-hidden backdrop-blur-md shadow-xl flex flex-col ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
              }`}
            >
              {/* Cabeçalho dos dias da semana */}
              <div
                className={`grid grid-cols-7 flex-shrink-0 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-slate-800/90 to-slate-900/90"
                    : "bg-gradient-to-r from-slate-100/90 to-slate-200/90"
                }`}
              >
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className={`p-2 text-center font-semibold text-xs ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>{" "}
              {/* Grid do calendário */}
              <div className="grid grid-cols-7 flex-1 min-h-0">
                {renderCalendarDays()}
              </div>
            </div>
          </div>{" "}
          {/* Lista de Eventos à direita - largura aumentada para títulos maiores */}
          <div className="w-96 flex flex-col min-h-0">
            <div
              className={`flex-1 rounded-2xl border backdrop-blur-md shadow-xl flex flex-col min-h-0 ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
                  : "bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/50"
              }`}
            >
              {" "}
              {/* Header da Lista */}
              <div
                className={`p-3 border-b flex-shrink-0 ${
                  isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
                }`}
              >
                {selectedDay ? (
                  // Header para visualização de eventos do dia
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBackToMonth}
                        className={`p-1 rounded-lg transition-all duration-300 hover:scale-110 ${
                          isDarkMode
                            ? "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-700"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h3
                          className={`text-sm font-bold ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          Eventos do Dia
                        </h3>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {selectedDay} de {monthNames[currentDate.getMonth()]}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNewEventFromDay}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30"
                          : "bg-violet-100 text-violet-700 border border-violet-200 hover:bg-violet-200"
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      Novo Evento
                    </button>
                  </div>
                ) : (
                  // Header para visualização de todos os eventos do mês
                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Eventos do Mês
                    </h3>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </p>
                  </div>
                )}
              </div>
              {/* Lista de Eventos */}
              <div
                className="flex-1 overflow-y-auto min-h-0 custom-scrollbar"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode
                    ? "rgba(71, 85, 105, 0.5) transparent"
                    : "rgba(148, 163, 184, 0.5) transparent",
                }}
              >
                {" "}
                <div className="p-3">
                  {(() => {
                    const eventsToShow = selectedDay
                      ? events.filter((event) => event.day === selectedDay)
                      : events;

                    return eventsToShow.length > 0 ? (
                      <div className="space-y-3">
                        {eventsToShow
                          .sort((a, b) => a.day - b.day)
                          .map((event) => (
                            <div
                              key={event.id}
                              className={`relative group rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                                event.completed
                                  ? isDarkMode
                                    ? "bg-slate-700/20 border-slate-600/30 opacity-75"
                                    : "bg-slate-50/50 border-slate-200/30 opacity-75"
                                  : isDarkMode
                                  ? "bg-slate-700/30 border-slate-600/50 hover:bg-slate-600/30"
                                  : "bg-white/50 border-slate-200/50 hover:bg-slate-50/80"
                              }`}
                            >
                              {/* Conteúdo Principal do Card */}
                              <div className="p-3">
                                <div className="flex items-start gap-2 mb-2">
                                  {/* Indicador do dia */}
                                  <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                      isDarkMode
                                        ? "bg-slate-600/50 text-slate-200"
                                        : "bg-slate-100 text-slate-700"
                                    }`}
                                  >
                                    {event.day}
                                  </div>

                                  {/* Conteúdo do evento */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 mb-1">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                          event.type === "study"
                                            ? isDarkMode
                                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                              : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                            : event.type === "project"
                                            ? isDarkMode
                                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                              : "bg-blue-100 text-blue-700 border border-blue-200"
                                            : isDarkMode
                                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                            : "bg-amber-100 text-amber-700 border border-amber-200"
                                        }`}
                                      >
                                        {event.type === "study"
                                          ? "Estudo"
                                          : event.type === "project"
                                          ? "Projeto"
                                          : "Review"}
                                      </span>
                                      {event.completed && (
                                        <span
                                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                            isDarkMode
                                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                              : "bg-green-100 text-green-700 border border-green-200"
                                          }`}
                                        >
                                          Concluído
                                        </span>
                                      )}
                                    </div>{" "}
                                    <h4
                                      className={`font-semibold text-xs leading-relaxed ${
                                        event.completed
                                          ? isDarkMode
                                            ? "text-slate-400 line-through"
                                            : "text-slate-500 line-through"
                                          : isDarkMode
                                          ? "text-white"
                                          : "text-slate-900"
                                      }`}
                                    >
                                      {event.title}
                                    </h4>{" "}
                                    <p
                                      className={`text-xs mt-0.5 ${
                                        isDarkMode
                                          ? "text-slate-400"
                                          : "text-slate-600"
                                      }`}
                                    >
                                      {event.description}
                                    </p>
                                    {/* Informações de tecnologia, categoria e tópico */}
                                    {(event.technologyId ||
                                      event.categoryId ||
                                      event.topicId) && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {event.technologyId && (
                                          <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                              isDarkMode
                                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                                : "bg-violet-100 text-violet-700 border border-violet-200"
                                            }`}
                                          >
                                            {technologies.find(
                                              (t) => t.id === event.technologyId
                                            )?.name || event.technologyId}
                                          </span>
                                        )}
                                        {event.categoryId && (
                                          <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                              isDarkMode
                                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                : "bg-blue-100 text-blue-700 border border-blue-200"
                                            }`}
                                          >
                                            {event.categoryId}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>{" "}
                                {/* Botões de Ação */}
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/20">
                                  {/* Botão de Iniciar Estudo */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartStudyClick(
                                        event.title,
                                        event.type
                                      );
                                    }}
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105 ${
                                      isDarkMode
                                        ? "bg-violet-600/20 hover:bg-violet-600/30 text-violet-400"
                                        : "bg-violet-100 hover:bg-violet-200 text-violet-600"
                                    }`}
                                    title="Iniciar sessão de estudo"
                                  >
                                    <Play className="w-3 h-3" />
                                  </button>

                                  {/* Botão de Completar/Descompletar */}
                                  <button
                                    onClick={(e) =>
                                      handleToggleComplete(event.id, e)
                                    }
                                    className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 min-w-0 flex-1 ${
                                      event.completed
                                        ? isDarkMode
                                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                          : "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200"
                                        : isDarkMode
                                        ? "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                                        : "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                                    }`}
                                  >
                                    <Check className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">
                                      {event.completed ? "Reabrir" : "Concluir"}
                                    </span>
                                  </button>

                                  {/* Botão de Editar */}
                                  <button
                                    onClick={(e) =>
                                      handleEditEvent(event.id, e)
                                    }
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105 ${
                                      isDarkMode
                                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
                                        : "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
                                    }`}
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </button>

                                  {/* Botão de Deletar */}
                                  <button
                                    onClick={(e) =>
                                      handleDeleteEvent(event.id, e)
                                    }
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105 ${
                                      isDarkMode
                                        ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                                        : "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                                    }`}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                            isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                          }`}
                        >
                          <CalendarIcon
                            className={`w-6 h-6 ${
                              isDarkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                          />
                        </div>
                        <h4
                          className={`font-semibold mb-1 text-sm ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {selectedDay
                            ? "Nenhum evento neste dia"
                            : "Nenhum evento"}
                        </h4>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {selectedDay
                            ? `Clique no botão "Novo Evento" acima para adicionar`
                            : "Adicione eventos clicando nos dias do calendário"}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modal de Novo Evento */}{" "}
      {showEventModal && (
        <div className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}{" "}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          {/* Modal */}
          <div
            className={`modal-content relative w-full max-w-lg rounded-3xl border backdrop-blur-xl shadow-2xl z-[61] max-h-[90vh] overflow-y-auto ${
              isDarkMode
                ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50"
                : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50"
            }`}
          >
            {/* Header do Modal */}
            <div
              className={`p-6 border-b ${
                isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDarkMode ? "bg-violet-500/20" : "bg-violet-100"
                    }`}
                  >
                    <CalendarIcon
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-violet-400" : "text-violet-600"
                      }`}
                    />
                  </div>{" "}
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {editingEvent ? "Editar Evento" : "Novo Evento"}
                  </h3>
                </div>{" "}
                <button
                  onClick={handleCloseModal}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "hover:bg-slate-700/50 text-slate-400 hover:text-white"
                      : "hover:bg-slate-100/50 text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Conteúdo do Modal */}
            <div className="p-4 space-y-4">
              {/* Data do Evento */}
              <div>
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Data: {newEvent.day.toString().padStart(2, '0')}/{(currentDate.getMonth() + 1).toString().padStart(2, '0')}/{currentDate.getFullYear()}
                </span>
              </div>

              {/* Nome do Evento */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Nome do Evento
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Digite o nome do evento..."
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 text-base ${
                    isDarkMode
                      ? "bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 focus:ring-violet-500/50 focus:border-violet-500/50"
                      : "bg-white/50 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-violet-400/50 focus:border-violet-400/50"
                  }`}
                />
              </div>

              {/* Tipo do Evento */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Tipo de Evento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Estudo */}
                  <button
                    onClick={() => setNewEvent({ ...newEvent, type: "study" })}
                    className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      newEvent.type === "study"
                        ? isDarkMode
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                          : "bg-emerald-100 border-emerald-300 text-emerald-700"
                        : isDarkMode
                        ? "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/30"
                        : "bg-white/50 border-slate-200/50 text-slate-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <BookOpen className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Estudo</div>
                  </button>

                  {/* Projeto */}
                  <button
                    onClick={() =>
                      setNewEvent({ ...newEvent, type: "project" })
                    }
                    className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      newEvent.type === "project"
                        ? isDarkMode
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                          : "bg-blue-100 border-blue-300 text-blue-700"
                        : isDarkMode
                        ? "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/30"
                        : "bg-white/50 border-slate-200/50 text-slate-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <Code className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Projeto</div>
                  </button>

                  {/* Review */}
                  <button
                    onClick={() => setNewEvent({ ...newEvent, type: "review" })}
                    className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      newEvent.type === "review"
                        ? isDarkMode
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                          : "bg-amber-100 border-amber-300 text-amber-700"
                        : isDarkMode
                        ? "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/30"
                        : "bg-white/50 border-slate-200/50 text-slate-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <RefreshCw className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Review</div>
                  </button>
                </div>
              </div>

              {/* Vinculação: Tecnologia, Categoria e Tópico */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Vinculação (Opcional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Tecnologia */}
                  <div>
                    <select
                      value={newEvent.technologyId}
                      onChange={(e) => {
                        const techId = e.target.value;
                        setNewEvent({
                          ...newEvent,
                          technologyId: techId,
                          categoryId: "",
                          topicId: "",
                        });
                      }}
                      className={`w-full px-2 py-2 rounded-lg border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 text-xs ${
                        isDarkMode
                          ? "bg-slate-700/30 border-slate-600/50 text-white focus:ring-violet-500/50 focus:border-violet-500/50"
                          : "bg-white/50 border-slate-200/50 text-slate-900 focus:ring-violet-400/50 focus:border-violet-400/50"
                      }`}
                    >
                      <option value="">Tecnologia</option>
                      {loading ? (
                        <option disabled>Carregando...</option>
                      ) : (
                        technologies.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name.charAt(0).toUpperCase() + tech.name.slice(1)}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Categoria */}
                  <div>
                    <select
                      value={newEvent.categoryId}
                      onChange={(e) => {
                        setNewEvent({
                          ...newEvent,
                          categoryId: e.target.value,
                          topicId: "",
                        });
                      }}
                      disabled={!newEvent.technologyId}
                      className={`w-full px-2 py-2 rounded-lg border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 text-xs ${
                        !newEvent.technologyId
                          ? isDarkMode
                            ? "bg-slate-800/50 border-slate-700/50 text-slate-500 cursor-not-allowed"
                            : "bg-slate-100/50 border-slate-300/50 text-slate-400 cursor-not-allowed"
                          : isDarkMode
                          ? "bg-slate-700/30 border-slate-600/50 text-white focus:ring-violet-500/50 focus:border-violet-500/50"
                          : "bg-white/50 border-slate-200/50 text-slate-900 focus:ring-violet-400/50 focus:border-violet-400/50"
                      }`}
                    >
                      <option value="">Categoria</option>
                      {getAvailableCategories().map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Descrição do Evento */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Descrição (Opcional)
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Breve descrição do evento..."
                  rows={2}
                  className={`w-full px-3 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 resize-none text-sm ${
                    isDarkMode
                      ? "bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 focus:ring-violet-500/50 focus:border-violet-500/50"
                      : "bg-white/50 border-slate-200/50 text-slate-900 placeholder-slate-500 focus:ring-violet-400/50 focus:border-violet-400/50"
                  }`}
                />
              </div>

              {/* Checkbox para marcar como concluído */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEvent.completed}
                    onChange={(e) => {
                      // Se for data passada, não permitir desmarcar
                      if (isPastDate(newEvent.day) && !e.target.checked) {
                        return;
                      }
                      setNewEvent({ ...newEvent, completed: e.target.checked });
                    }}
                    disabled={isPastDate(newEvent.day) && newEvent.completed}
                    className={`w-4 h-4 rounded border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                      isPastDate(newEvent.day) && newEvent.completed
                        ? isDarkMode
                          ? "bg-slate-600/50 border-slate-500/50 text-violet-400 cursor-not-allowed opacity-60"
                          : "bg-slate-200/50 border-slate-400/50 text-violet-400 cursor-not-allowed opacity-60"
                        : isDarkMode
                        ? "bg-slate-700/50 border-slate-600/50 text-violet-500 focus:ring-violet-500/50 focus:ring-offset-slate-800"
                        : "bg-white border-slate-300 text-violet-500 focus:ring-violet-400/50 focus:ring-offset-white"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isPastDate(newEvent.day)
                        ? isDarkMode
                          ? "text-slate-400"
                          : "text-slate-500"
                        : isDarkMode
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                  >
                    {isPastDate(newEvent.day) 
                      ? "Evento de data passada (automaticamente concluído)"
                      : "Marcar como já concluído"}
                  </span>
                </label>
              </div>
            </div>
            {/* Footer do Modal */}
            <div
              className={`p-4 border-t ${
                isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                      : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateEvent}
                  disabled={!newEvent.title.trim()}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm ${
                    newEvent.title.trim()
                      ? isDarkMode
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white"
                      : isDarkMode
                      ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                      : "bg-slate-200/50 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {editingEvent ? "Salvar Alterações" : "Criar Evento"}
                </button>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDeleteEvent}
          />
          {/* Modal */}
          <div
            className={`modal-content relative w-full max-w-sm rounded-3xl border backdrop-blur-xl shadow-2xl z-[61] ${
              isDarkMode
                ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50"
                : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/50"
            }`}
          >
            {/* Header do Modal */}
            <div
              className={`p-6 border-b ${
                isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    isDarkMode ? "bg-red-500/20" : "bg-red-100"
                  }`}
                >
                  <Trash2
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Confirmar Exclusão
                </h3>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Tem certeza de que deseja excluir este evento? Esta ação não
                pode ser desfeita.
              </p>
              {eventToDelete && (
                <div
                  className={`mt-4 p-3 rounded-xl border ${
                    isDarkMode
                      ? "bg-slate-700/30 border-slate-600/50"
                      : "bg-slate-50/50 border-slate-200/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const event = events.find((e) => e.id === eventToDelete);
                      return event ? (
                        <>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              event.type === "study"
                                ? isDarkMode
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : event.type === "project"
                                ? isDarkMode
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-blue-100 text-blue-700 border border-blue-200"
                                : isDarkMode
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-amber-100 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {event.type === "study"
                              ? "Estudo"
                              : event.type === "project"
                              ? "Projeto"
                              : "Review"}
                          </span>
                          <span
                            className={`font-semibold text-sm ${
                              isDarkMode ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {event.title}
                          </span>
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Footer do Modal */}
            <div
              className={`p-6 border-t ${
                isDarkMode ? "border-slate-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex gap-3">
                <button
                  onClick={cancelDeleteEvent}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md border ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                      : "bg-slate-100/50 border-slate-200/50 text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteEvent}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                  }`}
                >
                  Excluir Evento
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
      {/* Modal de Configuração de Estudo */}
      {selectedEvent && (
        <StudyModal
          isOpen={isStudyModalOpen}
          onClose={() => {
            setIsStudyModalOpen(false);
            setSelectedEvent(null);
          }}
          eventTitle={selectedEvent.title}
          eventType={selectedEvent.type}
          onStartStudy={handleStartStudy}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
