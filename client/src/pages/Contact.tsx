import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleSection from "@/components/ScheduleSection";

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(heroRef);
  useScrollAnimation(contactInfoRef);

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="flex items-center justify-center relative overflow-hidden min-h-[60vh]">
          <div className="container mx-auto px-6 relative">
            <div
              className="max-w-4xl mx-auto text-center"
              data-scroll="true"
              ref={heroRef}
            >
              <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight text-white mb-6">
                Conecta <span className="text-primary">con nosotros</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Estamos listos para escuchar tus ideas y ayudarte a llevarlas al siguiente nivel.
                Háblanos de tu proyecto y veamos cómo podemos colaborar.
              </p>
            </div>
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <div
              className="max-w-7xl mx-auto"
              data-scroll="true"
              ref={contactInfoRef}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Espacio que ocupaba el formulario "Escríbenos" eliminado */}

                {/* Información de contacto */}
                <div className="space-y-8 col-span-2">
                  <div className="bg-dark-900 p-6 rounded-xl shadow-xl">
                    <h3 className="font-space font-bold text-xl mb-4">Información de contacto</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <PhoneCall className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-300">Teléfono</p>
                          <a href="tel:+527222419200" className="text-white hover:text-primary">+52 722 241 9200</a>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-300">Correo electrónico</p>
                          <a href="mailto:hola@somaspace.site" className="text-white hover:text-primary">hola@somaspace.site</a>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-300">Ubicación</p>
                          <p className="text-white">León, Guanajuato, México</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-300">Horario de atención</p>
                          <p className="text-white">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 p-6 rounded-xl shadow-xl">
                    <h3 className="font-space font-bold text-xl mb-4">¿Prefieres una llamada?</h3>
                    <p className="text-gray-300 mb-4">
                      Si prefieres que nosotros te contactemos, puedes agendar una llamada o videollamada en nuestra sección de agenda.
                    </p>
                    <a
                      href="#schedule"
                      className="inline-flex items-center font-medium py-2 px-4 rounded-lg text-primary border border-primary hover:bg-primary/10 transition-colors"
                    >
                      Agendar una llamada
                    </a>
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

export default Contact;
