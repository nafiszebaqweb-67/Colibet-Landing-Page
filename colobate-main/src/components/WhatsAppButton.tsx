import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Collibet, I'd like to book tailoring service in Ranchi.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <Button 
        variant="whatsapp"
        size="lg"
        onClick={handleWhatsApp}
        className="rounded-full shadow-2xl w-14 h-14 p-0 hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
    </div>
  );
};
