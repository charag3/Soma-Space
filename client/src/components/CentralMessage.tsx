import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CentralMessage = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation(elementRef);

  return (
    <section className="py-20 md:py-32 bg-dark-800 relative">
      <div className="container mx-auto px-6">
        <div 
          className="max-w-4xl mx-auto text-center" 
          data-scroll="true"
          ref={elementRef}
        >
          <h2 className="font-space font-bold text-3xl md:text-5xl mb-6 text-white">
            Cada solución es <span className="text-primary">personalizada.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Diseñamos sistemas inteligentes a la medida, para que tú puedas enfocarte en lo que importa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CentralMessage;
