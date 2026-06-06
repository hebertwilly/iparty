import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import CategoriesSection from "../../components/landing/CategoriesSection";
import PartnerSection from "../../components/landing/PartnerCtaSection";
import Footer from "../../components/layout/Footer";
export default function LandingPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <PartnerSection />
      <Footer/>
    </main>
  );
}