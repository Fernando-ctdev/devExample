import { useCallback } from 'react';

/**
 * Hook para controlar o StudyTimer de outros componentes
 * O StudyTimer é completamente independente e gerencia seu próprio estado
 */
export const useStudyTimerControl = () => {
  const startSession = useCallback((sessionData: {
    eventTitle: string;
    duration: number;
    breakDuration: number;
  }) => {
    // Usar a função global para iniciar o timer
    if (window.startStudySession) {
      window.startStudySession(sessionData);
    }
  }, []);

  return { startSession };
};

// Tipos para a sessão de estudo (simplificados)
export interface StudySessionData {
  eventTitle: string;
  duration: number;  // em minutos
  breakDuration: number;  // em minutos
}
