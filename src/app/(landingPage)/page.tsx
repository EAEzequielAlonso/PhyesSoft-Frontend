import BenefitsSection from "@/components/homePage/BenefitsSection";
import DemoSection from "@/components/homePage/demoSection";
import HeroSection from "@/components/homePage/HeroSection";
import PriceSection from "@/components/homePage/PriceSection";
import TestimonialsSection from "@/components/homePage/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <BenefitsSection/>
      <PriceSection/>
      <DemoSection/>
      <TestimonialsSection/>
    </>
  );
}
