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
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Creamos experiencias digitales que conectan marcas con personas, 
              combinando tecnología y creatividad para llevar tu negocio al siguiente nivel.
            </p>
            <div className="mb-10">
              <p className="text-xl text-primary font-medium mb-8">
                Conoce nuestras dos divisiones especializadas
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                <div className="bg-dark-900/60 backdrop-blur-sm p-6 rounded-xl border border-dark-700 flex-1">
                  <h3 className="font-space font-bold text-2xl mb-3 flex items-center justify-center">
                    <span className="text-primary mr-2">Soma</span>Flow
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Automatización y desarrollo de sistemas para optimizar procesos empresariales y mejorar la eficiencia operativa.
                  </p>
                  <Link 
                    to="/flow"
                    className="w-full inline-block font-medium py-3 px-6 rounded-lg btn-gradient
                    shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                    focus:outline-none focus:ring-2 focus:ring-primary text-center"
                  >
                    Conocer SomaFlow
                  </Link>
                </div>
                <div className="bg-dark-900/60 backdrop-blur-sm p-6 rounded-xl border border-dark-700 flex-1">
                  <h3 className="font-space font-bold text-2xl mb-3 flex items-center justify-center">
                    <span className="text-primary mr-2">Soma</span>Studio
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Diseño creativo, branding y desarrollo de experiencias digitales para conectar marcas con su audiencia.
                  </p>
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

        {/* Divisiones Especializadas */}
        <section className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-8 text-center">
              Nuestras <span className="text-primary">soluciones</span>
            </h2>
            <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Soma se divide en dos verticales complementarias que te ofrecen soluciones específicas para tu negocio
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Bloque SomaFlow */}
              <div className="bg-dark-900 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 gradient-bg relative overflow-hidden group">
                {/* Decoración tipo nodos/conexiones */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#2EE9DC" strokeWidth="1.5" d="M10,30 L50,10 L90,40 L130,20 L170,50" />
                    <path fill="none" stroke="#2EE9DC" strokeWidth="1.5" d="M30,70 L70,50 L110,80 L150,60 L190,90" />
                    <path fill="none" stroke="#2EE9DC" strokeWidth="1.5" d="M10,110 L50,90 L90,120 L130,100 L170,130" />
                    <path fill="none" stroke="#2EE9DC" strokeWidth="1.5" d="M30,150 L70,130 L110,160 L150,140 L190,170" />
                    <circle cx="50" cy="10" r="5" fill="#2EE9DC" />
                    <circle cx="90" cy="40" r="5" fill="#2EE9DC" />
                    <circle cx="130" cy="20" r="5" fill="#2EE9DC" />
                    <circle cx="70" cy="50" r="5" fill="#2EE9DC" />
                    <circle cx="110" cy="80" r="5" fill="#2EE9DC" />
                    <circle cx="50" cy="90" r="5" fill="#2EE9DC" />
                    <circle cx="90" cy="120" r="5" fill="#2EE9DC" />
                    <circle cx="70" cy="130" r="5" fill="#2EE9DC" />
                    <circle cx="110" cy="160" r="5" fill="#2EE9DC" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="font-space font-bold text-2xl md:text-3xl mb-6 flex items-center">
                    <Activity className="h-8 w-8 mr-3 text-primary" />
                    SomaFlow
                  </h3>
                  <p className="text-gray-300 mb-8">
                    Automatización inteligente diseñada para adaptarse a cómo operas tu empresa. 
                    Optimiza procesos, elimina tareas repetitivas y haz crecer tu negocio.
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
                      className="w-52 font-medium py-2 px-6 rounded-lg btn-gradient whitespace-nowrap
                      shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900
                      text-center text-sm"
                    >
                      Conocer SomaFlow
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bloque SomaStudio */}
              <div className="bg-dark-900 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 gradient-bg relative overflow-hidden group">
                {/* Decoración orgánica/burbujas */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.7,-69.2C58.9,-62.8,69.3,-49.4,76.3,-34.1C83.3,-18.8,87,-1.7,83.1,13.5C79.2,28.6,67.7,41.8,54.5,51.6C41.3,61.5,26.4,68.1,10.8,71.2C-4.9,74.4,-21.2,74.1,-35.5,68.2C-49.8,62.2,-62,50.5,-70,36.1C-78,21.7,-81.9,4.5,-78.1,-11C-74.3,-26.4,-63,-40.2,-49.5,-48.1C-36,-56,-18,-58.1,-0.9,-56.9C16.3,-55.7,32.6,-51.1,45.7,-69.2Z" transform="translate(100 100)" fill="#2EE9DC" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="font-space font-bold text-2xl md:text-3xl mb-6 flex items-center">
                    <PenTool className="h-8 w-8 mr-3 text-primary" />
                    SomaStudio
                  </h3>
                  <p className="text-gray-300 mb-8">
                    Soluciones creativas para comunicar el valor de tu marca.
                    Diseño estratégico que conecta emocionalmente con tu audiencia.
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
                      className="w-52 font-medium py-2 px-6 rounded-lg btn-gradient whitespace-nowrap
                      shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900
                      text-center text-sm"
                    >
                      Conocer SomaStudio
                    </Link>
                  </div>
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