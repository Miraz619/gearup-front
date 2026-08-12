import { BecomeProviderSection } from "@/components/home/BecomeProviderSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { LatestGearSection } from "@/components/home/LatestGearSection";
import { TrustSafetySection } from "@/components/home/TrustSafetySection";
import { WhyChooseGearUpSection } from "@/components/home/WhyChooseGearUpSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <LatestGearSection />
      <HowItWorksSection />
       <WhyChooseGearUpSection />
        <BecomeProviderSection />
        <FAQSection/>
        <TrustSafetySection />
    </>
  );
}