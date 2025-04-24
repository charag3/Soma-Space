import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ParticlesBackground from "./ParticlesBackground";

const HeroSection = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(elementRef);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Geometric pattern */}
      <div className="absolute inset-0 z-10 opacity-20">
        <svg viewBox="0 0 1600 900" className="w-full h-full">
          <rect width="1600" height="900" fill="#0F1116" />
          <g fill="none" stroke="#2EE9DC" strokeWidth="1">
            <polygon points="1600,900 0,900 0,0 1600,0" />
            <polygon points="1600,900 0,900 800,0" />
            <polygon points="1600,0 0,0 800,900" />
            <line x1="0" y1="0" x2="1600" y2="900" />
            <line x1="1600" y1="0" x2="0" y2="900" />
            <circle cx="800" cy="450" r="300" />
          </g>
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-dark-900/90 via-dark-900/80 to-dark-900"></div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-30"> {/* Increased z-index for main content */}
        <div
          className="max-w-4xl mx-auto text-center"
          data-scroll="true"
          ref={elementRef}
        >
          <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight text-white mb-6">
            Tu negocio,{" "}
            <span className="text-primary font-script">en estado de flow.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Automatización <span className="font-script text-primary">inteligente</span> diseñada para adaptarse a cómo operas tu
            empresa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-primary text-dark-900 font-medium py-3 px-8 rounded-lg transition-all shadow-[0_0_15px_#2EE9DC,0_0_30px_#2EE9DC55] hover:shadow-[0_0_20px_#2EE9DC,0_0_40px_#2EE9DC88] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900"
            >
              Agendar una llamada
            </a>
            <a
              href="https://wa.me/521XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-primary hover:text-primary/90 border border-primary/30 hover:border-primary py-3 px-8 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;