import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Calendar } from "lucide-react";
import heroBackground from "@/assets/site-hero3.png";

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
    const message = encodeURIComponent(
      "Hi Collibet Team, I'd like to book tailoring service in Ranchi."
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Hero Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-section-blue-in-hero)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 text-center animate-fade-in">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">
            Trusted by 500+ Customers in Ranchi
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-medium text-[4rem] text-primary-foreground mb-12 leading-tight">
          Colibet Doorstep Tailoring Service
          <span className="relative inline-block">
            <span
              className={`text-gradient-gold transition-opacity duration-1000 leading-[1.5] ${
                showHindi ? "opacity-0 absolute inset-0" : "opacity-100"
              }`}
            >
              Designed, Stitched & Delivered
            </span>
            <span
              className={`text-gradient-gold transition-opacity duration-1000 leading-[1.5] ${
                showHindi ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              परिकल्पित, सीवनित और वितरित
            </span>
          </span>
          <br />
          in 24 Hours.
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white mb-3 max-w-2xl mx-auto font-medium">
          Custom Stitching for Men & Women.
        </p>

        <p className="text-lg text-white mb-8 max-w-xl mx-auto">
          From Design → Stitch → Doorstep Delivery
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12">
          <Button
            variant="gold"
            size="xl"
            onClick={onStartOrder}
            className="w-full sm:w-auto"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Slot Now
          </Button>

          <Button
            variant="whatsapp"
            size="xl"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Get Design Advice
          </Button>
        </div>

        {/* Features Quick Highlight */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="text-lg md:text-xl">24-Hour Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="text-lg md:text-xl">Pickup & Drop Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="text-lg md:text-xl">Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};
