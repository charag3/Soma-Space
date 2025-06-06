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

export function useBackground() {
  return useContext(BackgroundContext);
}

interface BackgroundProviderProps {
  children: ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const { pathname } = useLocation();

  const isStudio   = pathname === "/studio";
  const isBlogSlug = /^\/blog\/[^/]+$/.test(pathname);   // coincide /blog/lo-que-sea
  const showParticles = !isBlogSlug;

  return (
    <BackgroundContext.Provider value={{ showParticles }}>
      {/* ① el wrapper AHORA es relative y ocupa toda la página */}
      <div className="relative min-h-screen w-full">
        {/* ② Fondo de partículas */}
        {showParticles && (
          <>
            <div className="absolute inset-0 -z-10 pointer-events-none">
              {isStudio ? <StudioParticlesBackground /> : <ParticlesBackground />}
            </div>

            {/* ③ Degradado ligero debajo de las partículas */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-dark-900/10 via-dark-900/20 to-dark-900/40 pointer-events-none" />
          </>
        )}

        {/* ④ Contenido de la aplicación */}
        {children}
      </div>
    </BackgroundContext.Provider>
  );
}
