import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CentralMessage from "@/components/CentralMessage";
import BenefitsSection from "@/components/BenefitsSection";
import ModulesSection from "@/components/ModulesSection";
import ScheduleSection from "@/components/ScheduleSection";
import Footer from "@/components/Footer";

const FlowHome = () => {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <HeroSection />
        <CentralMessage />
        <BenefitsSection />
        <ModulesSection />
        <ScheduleSection />
      </main>
      <Footer />
    </div>
  );
};

export default FlowHome;