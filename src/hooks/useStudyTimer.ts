import { useCallback } from 'react';

/**
 * Hook para controlar o StudyTimer de outros componentes
 * O StudyTimer é completamente independente e gerencia seu próprio estado
 */
export const useStudyTimerControl = () => {
  const startSession = useCallback((sessionData: {
    eventTitle: string;
    eventId?: string;
    duration: number;
    breakDuration: number;
  }) => {
    console.log('🔴 useStudyTimerControl.startSession chamada com:', sessionData);
    // Usar a função global para iniciar o timer
    if (window.startStudySession) {
      console.log('🔴 Chamando window.startStudySession');
      window.startStudySession(sessionData);
    } else {
      console.error('🔴 window.startStudySession não está disponível');
    }
  }, []);

  return { startSession };
};

// Tipos para a sessão de estudo (atualizados)
export interface StudySessionData {
  eventTitle: string;
  eventId?: string;
  duration: number;  // em minutos
  breakDuration: number;  // em minutos
}
