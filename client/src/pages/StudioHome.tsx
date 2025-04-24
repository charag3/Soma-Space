import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PenTool, Layout, Palette, Film, Image, Lightbulb, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleSection from "@/components/ScheduleSection";

const StudioHome = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animación de scroll para los elementos
  useScrollAnimation(heroRef);
  useScrollAnimation(servicesRef);
  useScrollAnimation(projectsRef);
  useScrollAnimation(ctaRef);

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="flex items-center justify-center relative overflow-hidden min-h-screen">
          {/* Fondo de partículas específico para Studio */}
          <div className="fixed inset-0 z-0">
            <StudioParticlesBackground />
          </div>
          
          {/* Contenido principal */}
          <div className="container mx-auto px-6 relative">
            <div
              className="max-w-4xl mx-auto text-center"
              data-scroll="true"
              ref={heroRef}
            >
              <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight text-white mb-6">
                Diseño que <span className="text-primary">inspira.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Creamos experiencias visuales que conectan tu marca con tu audiencia,
                comunicando tu esencia de forma creativa y estratégica.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="#contact"
                  className="w-full sm:w-auto font-medium py-3 px-8 rounded-lg btn-gradient
                  shadow-[0_0_10px_rgba(29,204,133,0.2)]
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900"
                >
                  Quiero trabajar contigo
                </a>
                <a
                  href="https://wa.me/527222419200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-primary hover:text-primary/90 border border-primary/30 hover:border-primary hover:shadow-[0_0_10px_rgba(29,204,133,0.2)] py-3 px-8 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Contáctanos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Servicios Section */}
        <section id="servicios" className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <div
              className="max-w-4xl mx-auto"
              data-scroll="true"
              ref={servicesRef}
            >
              <h2 className="font-space font-bold text-3xl md:text-4xl mb-8 text-center">
                Nuestros <span className="text-primary">servicios</span>
              </h2>
              <p className="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                Ofrecemos soluciones creativas completas para ayudar a tu marca a destacar y conectar con tu audiencia de manera efectiva.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Branding */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <Palette className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Branding</h3>
                  <p className="text-gray-400">
                    Creación y desarrollo de identidades visuales que reflejen la personalidad y valores de tu marca.
                  </p>
                </div>
                
                {/* Diseño Web */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <Layout className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Diseño Web</h3>
                  <p className="text-gray-400">
                    Interfaces atractivas y funcionales que ofrecen experiencias memorables y efectivas a tus usuarios.
                  </p>
                </div>
                
                {/* Animación */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <Film className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Animación</h3>
                  <p className="text-gray-400">
                    Motion graphics y animaciones que dan vida a tus ideas y mantienen la atención de tu audiencia.
                  </p>
                </div>
                
                {/* Contenido Visual */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <Image className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Contenido Visual</h3>
                  <p className="text-gray-400">
                    Creación de material gráfico para redes sociales, publicidad, presentaciones y más.
                  </p>
                </div>
                
                {/* Diseño UX/UI */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <PenTool className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Diseño UX/UI</h3>
                  <p className="text-gray-400">
                    Interfaces centradas en el usuario que optimizan la experiencia y mejoran la conversión.
                  </p>
                </div>
                
                {/* Estrategia Creativa */}
                <div className="bg-dark-900 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                    <Lightbulb className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Estrategia Creativa</h3>
                  <p className="text-gray-400">
                    Planeación y desarrollo de conceptos creativos que dan dirección y coherencia a tus campañas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Proyectos Section */}
        <section id="proyectos" className="py-24 bg-dark-900">
          <div className="container mx-auto px-6">
            <div
              className="max-w-4xl mx-auto"
              data-scroll="true"
              ref={projectsRef}
            >
              <h2 className="font-space font-bold text-3xl md:text-4xl mb-8 text-center">
                Áreas de <span className="text-primary">especialización</span>
              </h2>
              <p className="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                Aplicamos nuestra experiencia creativa en diversos sectores, adaptando nuestro enfoque a las necesidades específicas de cada industria.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* E-commerce */}
                <div className="bg-dark-800 p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <h3 className="text-xl font-bold mb-4 pl-4">E-commerce</h3>
                  <p className="text-gray-400 pl-4 mb-4">
                    Diseño de tiendas online que optimizan la experiencia de compra y aumentan las conversiones.
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Diseño de catálogos de productos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Optimización del proceso de compra</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">UX/UI para mayor conversión</span>
                    </li>
                  </ul>
                </div>
                
                {/* Startups */}
                <div className="bg-dark-800 p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <h3 className="text-xl font-bold mb-4 pl-4">Startups</h3>
                  <p className="text-gray-400 pl-4 mb-4">
                    Identidad y materiales visuales para impulsar nuevos proyectos y diferenciarse en el mercado.
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Identidad de marca desde cero</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Materiales para pitch e inversores</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Landing pages de alto impacto</span>
                    </li>
                  </ul>
                </div>
                
                {/* Servicios Profesionales */}
                <div className="bg-dark-800 p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <h3 className="text-xl font-bold mb-4 pl-4">Servicios Profesionales</h3>
                  <p className="text-gray-400 pl-4 mb-4">
                    Comunicación visual que transmite profesionalismo, confianza y especialización.
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Branding corporativo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Presentaciones y propuestas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Sitios web institucionales</span>
                    </li>
                  </ul>
                </div>
                
                {/* Redes Sociales */}
                <div className="bg-dark-800 p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <h3 className="text-xl font-bold mb-4 pl-4">Redes Sociales</h3>
                  <p className="text-gray-400 pl-4 mb-4">
                    Contenido visual atractivo y estratégico para maximizar tu presencia digital.
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Templates para publicaciones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Diseño de contenidos promocionales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Animaciones para Stories e Reels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <div
              className="max-w-4xl mx-auto bg-dark-900 rounded-2xl p-8 md:p-12 shadow-xl gradient-bg"
              data-scroll="true"
              ref={ctaRef}
            >
              <h2 className="font-space font-bold text-3xl md:text-4xl mb-6 text-center">
                Hagamos algo <span className="text-primary">increíble</span> juntos
              </h2>
              <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
                ¿Listo para llevar tu marca al siguiente nivel? Cuéntanos sobre tu proyecto y exploremos cómo podemos colaborar para crear diseños que cautiven a tu audiencia.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://wa.me/527222419200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium py-3 px-8 rounded-lg btn-gradient
                  shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-800"
                >
                  Quiero trabajar contigo
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de Agenda */}
        <ScheduleSection />
      </main>
      <Footer />
    </div>
  );
};

export default StudioHome;