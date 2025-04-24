import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import logoImage from "@/assets/SomaHorizontal.png";

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
        { name: 'SomaFlow', path: '/flow' },
        { name: 'SomaStudio', path: '/studio' }
      ]);
    } 
    // Página de SomaFlow
    else if (location.pathname === '/flow') {
      setNavItems([
        { name: 'Hub', path: '/' },
        { name: 'Beneficios', path: '#benefits' },
        { name: 'Soluciones', path: '#modules' },
        { name: 'Agendar', path: '#schedule' }
      ]);
    } 
    // Página de SomaStudio
    else if (location.pathname === '/studio') {
      setNavItems([
        { name: 'Hub', path: '/' },
        { name: 'Servicios', path: '#servicios' },
        { name: 'Proyectos', path: '#proyectos' },
        { name: 'Contacto', path: '#contact' }
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
          <Link to="/" className="h-8">
            <img src={logoImage} alt="Soma" className="h-full" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              item.path.startsWith('#') ? (
                <a 
                  key={index}
                  href={item.path} 
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link 
                  key={index}
                  to={item.path} 
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
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
