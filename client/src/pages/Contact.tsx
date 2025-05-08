import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, PhoneCall, Mail, MapPin, Clock, Instagram, Linkedin, Facebook } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleSection from "@/components/ScheduleSection";

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  // Animación de scroll para los elementos
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
                {/* Formulario de Contacto */}
                <div className="bg-dark-900 p-8 rounded-xl shadow-xl">
                  <h2 className="font-space font-bold text-2xl mb-6">Escríbenos</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:ring-primary focus:border-primary text-white"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:ring-primary focus:border-primary text-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:ring-primary focus:border-primary text-white"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:ring-primary focus:border-primary text-white"
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full font-medium py-3 px-6 rounded-lg btn-gradient
                      shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center"
                    >
                      Enviar mensaje <Send className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                </div>
                
                {/* Información de contacto */}
                <div className="space-y-8">
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
                          <p className="text-white">Toluca, Estado de México, México</p>
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
                  
                  <div className="bg-dark-900 p-6 rounded-xl shadow-xl">
                    <h3 className="font-space font-bold text-xl mb-4">Síguenos en redes sociales</h3>
                    <div className="flex space-x-4">
                      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary hover:text-dark-900 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary hover:text-dark-900 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary hover:text-dark-900 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
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