import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Shirt, Package, Zap, Clock, Truck, Home, Scissors, CheckCircle2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface FormData {
  gender: string;
  item: string;
  urgency: string;
  fabric: string;
  delivery: string;
  fit: string;
  name: string;
  mobile: string;
}

export const OrderFunnel = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    item: "",
    urgency: "",
    fabric: "",
    delivery: "",
    fit: "",
    name: "",
    mobile: "",
  });

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (currentStep < 7) {
      setTimeout(() => setCurrentStep((currentStep + 1) as Step), 300);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      toast.error("Please fill in your contact details");
      return;
    }

    const message = `Hi Collibet Team, I just submitted my tailoring request:
- For: ${formData.gender}
- Item: ${formData.item}
- Urgency: ${formData.urgency}
- Fabric: ${formData.fabric}
- Delivery: ${formData.delivery}
- Fit: ${formData.fit}
- Name: ${formData.name}
- Mobile: ${formData.mobile}

Please confirm pickup!`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCurrentStep(8);
    toast.success("Order submitted! Redirecting to WhatsApp...");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">Who are we styling today?</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                onClick={() => handleSelect("gender", "Men")}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">👔</div>
                  <p className="font-semibold">Men</p>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                onClick={() => handleSelect("gender", "Women")}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">👗</div>
                  <p className="font-semibold">Women</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">What do you need stitched?</h2>
            <div className="grid grid-cols-2 gap-3">
              {formData.gender === "Men" ? (
                <>
                  {["Shirt 👕", "Trouser 👖", "Kurta / Pajama 🧵", "Blazer / Suit 🧥", "Others ➕"].map((item) => (
                    <Card 
                      key={item}
                      className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                      onClick={() => handleSelect("item", item)}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-medium text-sm">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {["Dress 👗", "Blouse ✨", "Lehenga 💃", "Kurti 🌸", "Others ➕"].map((item) => (
                    <Card 
                      key={item}
                      className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                      onClick={() => handleSelect("item", item)}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-medium text-sm">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">How soon do you need it?</h2>
            <div className="space-y-3">
              {[
                { label: "⚡ Within 24 Hours", value: "Within 24 Hours", icon: <Zap className="w-5 h-5 text-accent" /> },
                { label: "🗓 Within 2-3 Days", value: "Within 2-3 Days", icon: <Clock className="w-5 h-5 text-accent" /> },
                { label: "🧵 Just Planning for Now", value: "Just Planning", icon: <Package className="w-5 h-5 text-accent" /> }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                  onClick={() => handleSelect("urgency", option.value)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    {option.icon}
                    <p className="font-medium">{option.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">Do you have your own fabric?</h2>
            <div className="space-y-3">
              {[
                { label: "🧺 I'll give my fabric", value: "Own Fabric" },
                { label: "🛍 Need you to arrange fabric", value: "Arrange Fabric" }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                  onClick={() => handleSelect("fabric", option.value)}
                >
                  <CardContent className="p-4">
                    <p className="font-medium">{option.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">Want pickup or drop service?</h2>
            <div className="space-y-3">
              {[
                { label: "🚚 Pick up my fabric & deliver after stitching", value: "Pickup & Delivery", icon: <Truck className="w-5 h-5 text-accent" /> },
                { label: "🏠 I'll visit your store", value: "Visit Store", icon: <Home className="w-5 h-5 text-accent" /> }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                  onClick={() => handleSelect("delivery", option.value)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    {option.icon}
                    <p className="font-medium text-sm">{option.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">Share your fit preference</h2>
            <div className="space-y-3">
              {[
                { label: "✂️ Slim Fit", value: "Slim Fit" },
                { label: "👔 Regular Fit", value: "Regular Fit" },
                { label: "👕 Custom Fit", value: "Custom Fit" }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className="cursor-pointer hover:border-accent transition-all hover:shadow-lg"
                  onClick={() => handleSelect("fit", option.value)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <Scissors className="w-5 h-5 text-accent" />
                    <p className="font-medium">{option.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">Perfect! Just need your contact 👇</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                <Input 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-accent/30 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Mobile</label>
                <Input 
                  placeholder="Your mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="border-accent/30 focus:border-accent"
                />
              </div>
              <Button 
                variant="gold" 
                size="lg"
                className="w-full"
                onClick={handleSubmit}
              >
                Confirm My Order
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="text-center space-y-6 animate-fade-in py-8">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-heading text-primary">🎉 Thank You, {formData.name}!</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Our expert tailor will call you within 10 minutes to confirm pickup & measurements.
            </p>
            <div className="pt-4">
              <Button 
                variant="whatsapp" 
                size="lg"
                onClick={() => window.location.reload()}
              >
                Start Another Order
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="order" className="py-16" style={{ background: 'var(--gradient-section-blue-out)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          {currentStep < 8 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Step {currentStep} of 7</span>
                <span className="text-sm text-accent font-medium">{Math.round((currentStep / 7) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-yellow-400 transition-all duration-300"
                  style={{ width: `${(currentStep / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step Content */}
          <Card className="border-accent/20 shadow-xl">
            <CardContent className="p-6 md:p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Back Button */}
          {currentStep > 1 && currentStep < 8 && (
            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep((currentStep - 1) as Step)}
              >
                ← Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
