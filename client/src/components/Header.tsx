import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import logoSpace from "@/assets/SPACE.png";
import logoFlow from "@/assets/FLOW.png";
import logoStudio from "@/assets/studio.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [navItems, setNavItems] = useState<Array<{name: string, path: string}>>([]);

  // Determinar los elementos de navegación basados en la ruta actual
  useEffect(() => {
    // Página principal (hub)
    if (location.pathname === '/') {
      setNavItems([
        { name: 'Inicio', path: '/' },
        { name: 'Flow', path: '/flow' },
        { name: 'Studio', path: '/studio' },
        { name: 'Portafolio', path: '/portfolio' },
        { name: 'Contacto', path: '/contact' }
      ]);
    } 
    // Página de SomaFlow
    else if (location.pathname === '/flow') {
      setNavItems([
        { name: 'Hub', path: '/' },
        { name: 'Beneficios', path: '#benefits' },
        { name: 'Soluciones', path: '#modules' },
        { name: 'Portafolio', path: '/portfolio' },
        { name: 'Contacto', path: '#schedule' }
      ]);
    } 
    // Página de SomaStudio
    else if (location.pathname === '/studio') {
      setNavItems([
        { name: 'Hub', path: '/' },
        { name: 'Servicios', path: '#servicios' },
        { name: 'Proyectos', path: '#proyectos' },
        { name: 'Portafolio', path: '/portfolio' },
        { name: 'Contacto', path: '#contact' }
      ]);
    }
    // Página de Blog
    else if (location.pathname.startsWith('/blog')) {
      setNavItems([
        { name: 'Inicio', path: '/' },
        { name: 'Flow', path: '/flow' },
        { name: 'Studio', path: '/studio' },
        { name: 'Portafolio', path: '/portfolio' },
        { name: 'Contacto', path: '/contact' }
      ]);
    }
    // Página de Portafolio
    else if (location.pathname === '/portfolio') {
      setNavItems([
        { name: 'Inicio', path: '/' },
        { name: 'Flow', path: '/flow' },
        { name: 'Studio', path: '/studio' },
        { name: 'Contacto', path: '/contact' }
      ]);
    }
    // Página de Contacto
    else if (location.pathname === '/contact') {
      setNavItems([
        { name: 'Inicio', path: '/' },
        { name: 'Flow', path: '/flow' },
        { name: 'Studio', path: '/studio' },
        { name: 'Portafolio', path: '/portfolio' }
      ]);
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="h-10">
            {location.pathname === '/' && <img src={logoSpace} alt="SomaSpace" className="h-full" />}
            {location.pathname === '/flow' && <img src={logoFlow} alt="SomaFlow" className="h-full" />}
            {location.pathname === '/studio' && <img src={logoStudio} alt="SomaStudio" className="h-full" />}
            {!['/flow', '/studio', '/'].includes(location.pathname) && <img src={logoSpace} alt="SomaSpace" className="h-full" />}
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              item.path.startsWith('#') ? (
                <a 
                  key={index}
                  href={item.path} 
                  className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link 
                  key={index}
                  to={item.path} 
                  className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
          <button className="md:hidden text-gray-300 focus:outline-none" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navItems={navItems} />
    </>
  );
};

export default Header;