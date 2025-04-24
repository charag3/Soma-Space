import { useEffect } from "react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: Array<{name: string, path: string}>;
}

const MobileMenu = ({ isOpen, onClose, navItems = [] }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark-900/95 z-40 flex flex-col justify-center items-center">
      <button className="absolute top-5 right-5 text-gray-300 focus:outline-none" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <nav className="flex flex-col space-y-8 text-center">
        {navItems.length > 0 ? (
          navItems.map((item, index) => (
            item.path.startsWith('#') ? (
              <a 
                key={index}
                href={item.path} 
                className="text-lg uppercase tracking-widest text-gray-300 hover:text-primary transition-colors" 
                onClick={onClose}
              >
                {item.name}
              </a>
            ) : (
              <Link 
                key={index}
                to={item.path} 
                className="text-lg uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
                onClick={onClose}
              >
                {item.name}
              </Link>
            )
          ))
        ) : (
          // Fallback si no hay elementos de navegación
          <>
            <a href="#" className="text-xl text-gray-300 hover:text-primary transition-colors" onClick={onClose}>
              Inicio
            </a>
            <Link to="/" className="text-xl text-gray-300 hover:text-primary transition-colors" onClick={onClose}>
              Volver al Hub
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
