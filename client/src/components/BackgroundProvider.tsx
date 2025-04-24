
import React, { createContext, useContext, ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';

interface BackgroundContextType {
  showParticles: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}

interface BackgroundProviderProps {
  children: ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  return (
    <BackgroundContext.Provider value={{ showParticles: true }}>
      {/* Fondo de partículas fijo en toda la aplicación */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      {/* Superposición sutil que no interfiere con la interacción de partículas */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none"></div>
      
      {children}
    </BackgroundContext.Provider>
  );
}
