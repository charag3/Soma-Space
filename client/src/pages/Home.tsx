import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CentralMessage from "@/components/CentralMessage";
import BenefitsSection from "@/components/BenefitsSection";
import ModulesSection from "@/components/ModulesSection";
import ScheduleSection from "@/components/ScheduleSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Header />
      <main>
        <HeroSection />
        <CentralMessage />
        <BenefitsSection />
        <ModulesSection />
        <ScheduleSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
