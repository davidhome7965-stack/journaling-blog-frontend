// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
// import ProblemSection from '@/components/hero/ProblemSection'; // <-- इसे हटाएँ या कॉमेंट करें
import WhatIsSection from '@/components/hero/WhatIsSection';
import StatsSection from '@/components/hero/StatsSection';
import BenefitsSection from '@/components/hero/BenefitsSection';
import TypesSection from '@/components/hero/TypesSection';
import GuideSection from '@/components/hero/GuideSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        {/* <ProblemSection /> */}  {/* <-- इसे कॉमेंट कर दिया */}
        <div className="lg-divider max-w-4xl mx-auto" />
        <WhatIsSection />
        <div className="lg-divider max-w-4xl mx-auto" />
        <StatsSection />
        <BenefitsSection />
        <TypesSection />
        <div className="lg-divider max-w-4xl mx-auto" />
        <GuideSection />
      </main>
      <Footer />
    </>
  );
}