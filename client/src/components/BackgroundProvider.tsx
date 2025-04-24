import { createContext, useContext, ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';

// Context para gestionar el fondo con partículas
interface BackgroundContextProps {
  showParticles: boolean;
}

const BackgroundContext = createContext<BackgroundContextProps>({
  showParticles: true,
});

// Props para el provider
interface BackgroundProviderProps {
  children: ReactNode;
}

// Provider component
export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  return (
    <BackgroundContext.Provider value={{ showParticles: true }}>
      {/* Fondo de partículas fijo en toda la aplicación */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      {/* Superposición sutil que no interfiere con la interacción de partículas */}
      <div className="fixed inset-0 z-1 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none"></div>
      
      {children}
    </BackgroundContext.Provider>
  );
};

// Hook para usar el contexto
export const useBackground = () => useContext(BackgroundContext);

export default BackgroundProvider;