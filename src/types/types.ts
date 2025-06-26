// src/types/types.ts

// Core interfaces
export interface Technology {
  id: string;
  name: string;
  title: string;
  color: string;
  hoverColor: string;
  logo: string;
  alt: string;
  padding: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  itemId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  itemId: string;
  title: string;
  example?: Example;
}

// Topic interfaces
export interface TopicItem {
  id: string;
  itemId: string;
  title: string;
}

export interface Topic {
  id: string;
  name: string;
  technologyId: string;
  category: string;
  items: TopicItem[];
}

// Form data interfaces
export interface NewTechnologyData {
  name: string;
  title?: string;
  color?: string;
  hoverColor?: string;
  logo?: string;
  alt?: string;
  padding?: string;
}

export interface NewItemData {
  itemId?: string;
  title: string;
  categoryId: string;
}

// Study session interfaces
export interface StudySession {
  id: string;
  eventTitle: string;
  eventType: string;
  duration: number; // em minutos
  breakDuration: number; // em minutos
  startTime?: Date;
  endTime?: Date;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number; // em segundos
  breakTimeRemaining: number; // em segundos
  isBreakTime: boolean;
  isMinimized: boolean;
}

export interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventType: string;
  onStartStudy: (duration: number, breakDuration: number) => void;
  isDarkMode: boolean;
}

// Component props interfaces
export interface HomeProps {
  isDarkMode: boolean;
  technologies: Technology[];
  topics: Topic[];
  onNavigate: (page: string) => void;
}

export interface ExampleViewProps {
  example: Example;
  technology: Technology | null;
  onBackClick: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  currentTech: string;
  isDarkMode: boolean;
  onSave: (type: 'code' | 'explanation', content: string, itemId: string) => Promise<boolean>;
}