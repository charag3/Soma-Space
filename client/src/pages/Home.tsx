import { Link } from "react-router-dom";
import { Activity, Code, Layout, PenTool, Lightbulb, BarChart3, Palette, Image, Film } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleSection from "@/components/ScheduleSection";

const MainHome = () => {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        {/* Hero principal */}
        <section className="flex items-center justify-center relative overflow-hidden min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-space font-bold text-5xl md:text-7xl leading-tight text-white mb-8">
              Soluciones que <span className="text-primary">fluyen contigo.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
              Creamos experiencias digitales que conectan marcas con personas, 
              combinando tecnología y creatividad para llevar tu negocio al siguiente nivel.
            </p>
          </div>
        </section>

        {/* Divisiones Especializadas */}
        <section className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-8 text-center">
              Nuestras <span className="text-primary">divisiones especializadas</span>
            </h2>
            <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Conoce nuestras dos verticales complementarias que te ofrecen soluciones específicas para tu negocio
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-12 max-w-6xl mx-auto mb-20">
              {/* Tarjeta de SomaFlow */}
              <div className="bg-dark-900/80 backdrop-blur-sm p-8 rounded-xl border border-dark-700 flex-1 hover:shadow-xl transition-all duration-300">
                <h3 className="font-space font-bold text-2xl mb-6 flex items-center justify-center">
                  <span className="text-primary mr-2">Soma</span>Flow
                </h3>
                <p className="text-gray-300 mb-8">
                  Automatización y desarrollo de sistemas para optimizar procesos empresariales y mejorar la eficiencia operativa.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <Code className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm whitespace-nowrap">Automatización</span>
                  </div>
                  <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Dashboards</span>
                  </div>
                  <div className="flex items-start">
                    <Layout className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Sistemas</span>
                  </div>
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Bots</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link 
                    to="/flow"
                    className="w-full inline-block font-medium py-3 px-6 rounded-lg btn-gradient
                    shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                    focus:outline-none focus:ring-2 focus:ring-primary text-center"
                  >
                    Conocer SomaFlow
                  </Link>
                </div>
              </div>

              {/* Tarjeta de SomaStudio */}
              <div className="bg-dark-900/80 backdrop-blur-sm p-8 rounded-xl border border-dark-700 flex-1 hover:shadow-xl transition-all duration-300">
                <h3 className="font-space font-bold text-2xl mb-6 flex items-center justify-center">
                  <span className="text-primary mr-2">Soma</span>Studio
                </h3>
                <p className="text-gray-300 mb-8">
                  Diseño creativo, branding y desarrollo de experiencias digitales para conectar marcas con su audiencia.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <Palette className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Branding</span>
                  </div>
                  <div className="flex items-start">
                    <Layout className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Diseño Web</span>
                  </div>
                  <div className="flex items-start">
                    <Film className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Animación</span>
                  </div>
                  <div className="flex items-start">
                    <Image className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Contenido Visual</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link 
                    to="/studio"
                    className="w-full inline-block font-medium py-3 px-6 rounded-lg btn-gradient
                    shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                    focus:outline-none focus:ring-2 focus:ring-primary text-center"
                  >
                    Conocer SomaStudio
                  </Link>
                </div>
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

export default MainHome;