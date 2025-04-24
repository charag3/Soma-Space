import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Box, Calendar, Zap, BarChart } from "lucide-react";

const modules = [
  {
    icon: <Box className="h-10 w-10" />,
    title: "Inventario inteligente",
    description:
      "Gestión automatizada de existencias con predicciones basadas en IA para optimizar costos y evitar quiebres de stock.",
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Agenda operativa",
    description:
      "Calendario inteligente que coordina recursos, personal y tareas para maximizar la eficiencia operativa.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Automatización de procesos",
    description:
      "Elimina tareas repetitivas y reduce errores humanos con flujos de trabajo inteligentes personalizados.",
  },
  {
    icon: <BarChart className="h-10 w-10" />,
    title: "Dashboards con IA",
    description:
      "Visualizaciones dinámicas que muestran KPIs relevantes y generan insights accionables mediante análisis inteligente.",
  },
];

const ModulesSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(titleRef);
  useScrollAnimation(sectionRef);

  return (
    <section id="modules" className="py-20 md:py-32 bg-dark-800 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className="font-space font-bold text-3xl mb-16 text-center" 
            data-scroll="true"
            ref={titleRef}
          >
            Módulos <span className="text-primary font-script">principales</span>
          </h2>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8" 
            data-scroll="true"
            ref={sectionRef}
          >
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-dark-700 rounded-xl p-8 border border-dark-700 hover:border-primary/20 transition-all card-hover"
              >
                <div className="flex items-start">
                  <div className="text-primary mr-6">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="font-space font-semibold text-xl mb-2">{module.title}</h3>
                    <p className="text-gray-400">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
