import { useState } from "react";
import { Link } from "wouter";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="h-8">
            <img src="/Somaflowlofo h.png" alt="SomaFlow" className="h-full" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#benefits" className="text-sm font-light text-gray-300 hover:text-primary transition-colors">
              Beneficios
            </a>
            <a href="#modules" className="text-sm text-gray-300 hover:text-primary transition-colors">
              Soluciones
            </a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>
          <button className="md:hidden text-gray-300 focus:outline-none" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
