import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ParticlesBackground from "./ParticlesBackground";

const HeroSection = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(elementRef);

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden min-h-[80vh]">
      {/* Particles background */}
      <div className="absolute inset-0 z-0" style={{ height: "100%" }}>
        <ParticlesBackground />
      </div>

      {/* Subtle gradient overlay that won't interfere with particle interaction */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-dark-900/40 via-dark-900/30 to-dark-900/80 pointer-events-none"></div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        {" "}
        {/* Adjusted z-index to still appear above particles */}
        <div
          className="max-w-4xl mx-auto text-center"
          data-scroll="true"
          ref={elementRef}
        >
          <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight text-white mb-6">
            Tu negocio,{" "}
            <span className="text-primary">en estado de flow.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Automatización{" "}
            <span className="text-primary">inteligente</span>{" "}
            diseñada para adaptarse a cómo operas tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#contact"
              className="w-full sm:w-auto font-medium py-3 px-8 rounded-lg btn-gradient
              shadow-[0_0_10px_rgba(29,204,133,0.2)]
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900"
            >
              Agendar una llamada
            </a>
            <a
              href="https://wa.me/527222419200"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-primary hover:text-primary/90 border border-primary/30 hover:border-primary hover:shadow-[0_0_10px_rgba(29,204,133,0.2)] py-3 px-8 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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