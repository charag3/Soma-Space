
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ScrollText, Package2, Calendar, BarChart3, Repeat, MessageSquare, Puzzle } from "lucide-react";

const modules = [
  {
    icon: <ScrollText className="h-10 w-10" />,
    title: "Gestión administrativa digital",
    description:
      "Lleva control de citas, ingresos, gastos y actividades diarias sin depender de papeles o apps dispersas.",
  },
  {
    icon: <Package2 className="h-10 w-10" />,
    title: "Control de inventario en tiempo real",
    description:
      "Evita quiebres de stock y compras innecesarias. Visualiza lo que tienes y lo que necesitas.",
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Agenda inteligente",
    description:
      "Organiza tareas, turnos o servicios desde un solo lugar. Asigna, reprograma y da seguimiento fácilmente.",
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Reportes y dashboards personalizados",
    description:
      "Revisa tus ingresos, rendimiento del equipo o citas agendadas con visualizaciones claras y actualizadas.",
  },
  {
    icon: <Repeat className="h-10 w-10" />,
    title: "Automatización de tareas repetitivas",
    description:
      "Ahorra tiempo al automatizar respuestas, recordatorios o procesos internos.",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Integración con WhatsApp, Telegram y correo",
    description:
      "Recibe notificaciones, recordatorios o alertas donde más te convenga.",
  },
  {
    icon: <Puzzle className="h-10 w-10" />,
    title: "Sistemas a la medida de tu negocio",
    description:
      "Cada herramienta se adapta a lo que tú necesitas, no al revés.",
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
            Módulos <span className="text-primary">principales</span>
          </h2>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
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
