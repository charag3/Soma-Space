import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";
import StudioParticlesBackground from "./StudioParticlesBackground";

// Contexto para gestionar el fondo con partículas
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

  const isSlugPage = location.pathname.startsWith("/blog/");
  const isStudioPage = location.pathname === "/studio";

  const showParticles = !isSlugPage;

  return (
    <BackgroundContext.Provider value={{ showParticles }}>
      {/* Fondo de partículas si aplica */}
      {showParticles && (
        <div className="absolute inset-0 -z-10 h-full w-full">
          {isStudioPage ? <StudioParticlesBackground /> : <ParticlesBackground />}
        </div>
      )}

      {/* Capa opcional de fondo translúcido */}
      {showParticles && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none" />
      )}

      {/* Contenido del sitio */}
      {children}
    </BackgroundContext.Provider>
  );
}

// Hook para acceder al estado
export function useBackground() {
  return useContext(BackgroundContext);
}
