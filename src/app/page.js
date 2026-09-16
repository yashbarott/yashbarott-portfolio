import Hero from "@/components/Hero";
import About from "@/components/About";
import DesignPhilosophy from "@/components/DesignPhilosophy";
import Work from "@/components/Work";
import Services from "@/components/Services";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import BotSearchSection from "@/components/BotSearchSection";

export default function Home() {
  return (
    <main className="w-full relative bg-black selection:bg-red-deep selection:text-white">
      <Hero />
      <About />
      <DesignPhilosophy />
      <Work />
      <Services />
      <ProfessionalJourney />
      <BotSearchSection />
      <Footer />
      <Consultation />
    </main>
  );
}
