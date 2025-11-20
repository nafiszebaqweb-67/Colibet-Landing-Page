import { Button } from "@/components/ui/button";
import { Gift, Clock } from "lucide-react";

interface OfferSectionProps {
  onBookNow: () => void;
}

export const OfferSection = ({ onBookNow }: OfferSectionProps) => {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'var(--gradient-section-yellow-in)' }}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Offer Badge */}
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-6 py-3 mb-6 shadow-lg animate-bounce">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary"> Ranchi Special Offer!</span>
          </div>

          {/* Main Offer Text */}
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">
            🎁 Get <span className="text-primary">20% OFF</span> on Your First Custom Tailored Outfit
          </h2>
          
          <p className="text-xl text-foreground/90 mb-2">
            Exclusive welcome discount for all new customers in Ranchi. Book your consultation today!
          </p>

          {/* Urgency Indicator */}
          <div className="inline-flex items-center gap-2 text-primary mb-8">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Offer valid for new customers only</span>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button 
              variant="gold" 
              size="xl"
              onClick={onBookNow}
              className="shadow-2xl"
            >
              👉 Claim Offer & Schedule Measurement
            </Button>
          </div>

          {/* Fine Print */}
          <p className="text-xs text-foreground/60 mt-6 max-w-md mx-auto">
            *Valid for first-time customers only. Minimum order value applies. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </section>
  );
};
