import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground';
import StudioParticlesBackground from './StudioParticlesBackground';

// Contexto para gestionar el fondo con partículas
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
export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const location = useLocation();
  const isStudioPage = location.pathname === '/studio';
  
  return (
    <BackgroundContext.Provider value={{ showParticles: true }}>
      {/* Fondo de partículas basado en la ruta actual */}
      <div className="fixed inset-0 z-0">
        {isStudioPage ? <StudioParticlesBackground /> : <ParticlesBackground />}
      </div>
      
      {/* Superposición sutil que no interfiere con la interacción de partículas */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none"></div>
      
      {children}
    </BackgroundContext.Provider>
  );
}

// Hook para usar el contexto
export function useBackground() {
  return useContext(BackgroundContext);
}