import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import heroBackground from "@/assets/expert-suitmaker-tailoring-studio.jpg";

interface HeroProps {
  onStartOrder: () => void;
}

export const Hero = ({ onStartOrder }: HeroProps) => {
  const [showHindi, setShowHindi] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHindi(prev => !prev);
    }, 3000); // Toggle every 3 seconds

    return () => clearInterval(interval);
  }, []);
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Collibet Team, I'd like to book tailoring service in Ranchi.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - Fade In and Out */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0" style={{ background: 'var(--gradient-section-blue-in)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center animate-fade-in">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">Trusted by 500+ Customers in Ranchi </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 leading-tight">
          Ranchi's Fastest Custom Tailor<span className="relative inline-block">
            <span className={`text-gradient-gold transition-opacity duration-700 ${showHindi ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}>
              Designed, Stitched & Delivered
            </span>
            <span className={`text-gradient-gold transition-opacity duration-700 ${showHindi ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
              डिज़ाइन, सिलाई और डिलीवरी
            </span>
          </span> <br></br>in 24 Hours.
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-3 max-w-2xl mx-auto font-medium">
          Custom Stitching for Men & Women in Ranchi
        </p>
        
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          From Design → Stitch → Doorstep Delivery
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            variant="gold" 
            size="xl"
            onClick={onStartOrder}
            className="w-full sm:w-auto"
          >
            Start My Custom Order
          </Button>
          
          <Button 
            variant="whatsapp" 
            size="xl"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            Chat Now on WhatsApp
          </Button>
        </div>

        {/* Features Quick Highlight */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm">24-Hour Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm">Pickup & Drop Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm">Premium Quality</span>
          </div>
        </div>
      </div>

    </section>
  );
};
