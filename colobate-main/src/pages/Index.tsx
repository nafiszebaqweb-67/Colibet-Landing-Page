import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { OrderFunnel } from "@/components/OrderFunnel";
import { HowItWorks } from "@/components/HowItWorks";
import { SocialProof } from "@/components/SocialProof";
import { OfferSection } from "@/components/OfferSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  const orderSectionRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    orderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Hero onStartOrder={scrollToOrder} />
      <div ref={orderSectionRef}>
        <OrderFunnel />
      </div>
      <HowItWorks />
      <SocialProof />
      <OfferSection onBookNow={scrollToOrder} />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
