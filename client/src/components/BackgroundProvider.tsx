import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";
import StudioParticlesBackground from "./StudioParticlesBackground";

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

  const isStudioPage = location.pathname === "/studio";
  const isBlogSlugPage = /^\/blog\/[^/]+$/.test(location.pathname);

  const showParticles = !isBlogSlugPage; // ← ocultamos partículas en /blog/:slug

  return (
    <BackgroundContext.Provider value={{ showParticles }}>
      {showParticles && (
        <>
          <div className="fixed inset-0 -z-10 pointer-events-none">
            {isStudioPage ? <StudioParticlesBackground /> : <ParticlesBackground />}
          </div>
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none" />
        </>
      )}
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
