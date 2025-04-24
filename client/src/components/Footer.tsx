import { Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <img src="/attached_assets/Somaflowlofo h.png" alt="SomaFlow" className="h-8" />
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
