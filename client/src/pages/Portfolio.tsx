import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBackground } from "@/components/BackgroundProvider";

// Placeholders para proyectos de Behance (reemplazar luego con imágenes reales)
const behanceProjects = [
  {
    id: 1,
    title: "Schwan Cosmetics",
    description: "Diseño de marca y piezas digitales para empresa de cosméticos.",
    category: "Branding",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Schwan+Cosmetics"
  },
  {
    id: 2,
    title: "Jesalo",
    description: "Identidad visual y estrategia para marca de wellness.",
    category: "Branding, UX/UI",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Jesalo"
  },
  {
    id: 3,
    title: "Las del Barrio",
    description: "Diseño de identidad y experiencia digital para restaurante.",
    category: "Branding, Diseño Web",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Las+del+Barrio"
  },
  {
    id: 4,
    title: "Animación de Logotipo",
    description: "Motion graphics para dar vida a identidad corporativa.",
    category: "Animación Digital",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Animación+Logo"
  },
  {
    id: 5,
    title: "Campaña Digital",
    description: "Serie de piezas animadas para redes sociales.",
    category: "Contenido Visual",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Campaña+Digital"
  },
  {
    id: 6,
    title: "Sitio Web Corporativo",
    description: "Diseño y desarrollo de sitio web responsivo.",
    category: "Diseño Web, UX/UI",
    behanceUrl: "https://www.behance.net/kreatuagency",
    imageUrl: "https://via.placeholder.com/600x400/1a1a1a/2ee9dc?text=Sitio+Web"
  }
];

const Portfolio = () => {
  const { showParticles } = useBackground();
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Animación de scroll para los elementos
  useScrollAnimation(heroRef);
  useScrollAnimation(projectsRef);

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
                Nuestro <span className="text-primary">Portafolio</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Explora algunos de nuestros proyectos creativos más destacados, 
                donde transformamos ideas en experiencias visuales memorables.
              </p>
              <a 
                href="https://www.behance.net/kreatuagency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg btn-gradient
                shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)]
                focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Ver en Behance <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Proyectos Section */}
        <section className="py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <div
              className="max-w-7xl mx-auto"
              data-scroll="true"
              ref={projectsRef}
            >
              <h2 className="font-space font-bold text-3xl md:text-4xl mb-16 text-center">
                Proyectos <span className="text-primary">destacados</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {behanceProjects.map((project) => (
                  <div key={project.id} className="bg-dark-900 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <a 
                          href={project.behanceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-primary text-dark-900 font-bold py-2 px-4 rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center"
                        >
                          Ver proyecto <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-primary uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <p className="text-gray-300 mb-6">
                  Estos son solo algunos ejemplos de nuestro trabajo. Visita nuestro perfil completo en Behance para ver más proyectos.
                </p>
                <a 
                  href="https://www.behance.net/kreatuagency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  Ver portafolio completo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;