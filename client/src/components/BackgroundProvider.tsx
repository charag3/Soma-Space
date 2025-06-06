import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground';
import StudioParticlesBackground from './StudioParticlesBackground';

interface BackgroundContextProps {
  showParticles: boolean;
}

const BackgroundContext = createContext<BackgroundContextProps>({
  showParticles: true,
});

interface BackgroundProviderProps {
  children: ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const location = useLocation();
  const path = location.pathname;
  const isStudioPage = path === '/studio';
  const isBlogSlugPage = path.startsWith('/blog/') && path !== '/blog';

  return (
    <BackgroundContext.Provider value={{ showParticles: !isBlogSlugPage }}>
      {/* Fondo de partículas solo si no es una página de slug */}
      {!isBlogSlugPage && (
        <div className="fixed inset-0 z-0">
          {isStudioPage ? <StudioParticlesBackground /> : <ParticlesBackground />}
        </div>
      )}

      {/* Superposición visual */}
      {!isBlogSlugPage && (
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none" />
      )}

      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
