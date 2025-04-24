import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Layers, Copy, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: <Layers className="h-12 w-12" />,
    title: "Modularidad total",
    description:
      "Adapta la solución a tus necesidades actuales y escala fácilmente a medida que tu negocio crece.",
  },
  {
    icon: <Copy className="h-12 w-12" />,
    title: "Integración completa",
    description:
      "Conecta con tus herramientas actuales sin interrupciones, optimizando tu flujo de trabajo existente.",
  },
  {
    icon: <BarChart3 className="h-12 w-12" />,
    title: "Visualización clara",
    description:
      "Información procesada y presentada para facilitar la toma de decisiones estratégicas y operativas.",
  },
];

const BenefitsSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollAnimation(titleRef);
  refs.current.forEach(ref => useScrollAnimation(ref));

  return (
    <section id="benefits" className="py-20 md:py-32 bg-dark-900 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className="font-space font-bold text-3xl mb-16 text-center" 
            data-scroll="true"
            ref={titleRef}
          >
            Beneficios <span className="text-primary">clave</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-dark-800 rounded-xl p-8 gradient-bg card-hover"
                data-scroll="true"
                ref={el => refs.current[index] = el}
              >
                <div className="text-primary mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-space font-semibold text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
