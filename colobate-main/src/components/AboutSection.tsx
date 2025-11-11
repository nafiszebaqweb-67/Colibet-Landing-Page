import { Check } from "lucide-react";

export const AboutSection = () => {
  const features = [
    { icon: "🧵", text: "Custom Design for Men & Women" },
    { icon: "🕐", text: "24-Hour Delivery Promise" },
    { icon: "🧺", text: "Pickup & Drop Available" },
    { icon: "📍", text: "Based in Ranchi — Local Experts" },
    { icon: "👗", text: "Premium Stitching Quality" },
    { icon: "🪡", text: "Trusted by 500+ Customers" },
  ];

  return (
    <section className="py-20" style={{ background: 'var(--gradient-section-yellow-out)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Why Choose Collibet Tailoring?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another tailoring service — we're your partner in looking your absolute best
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-lg hover:shadow-lg transition-all animate-slide-up hover:border-accent/40"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground font-medium leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center py-8 px-6 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-accent/20">
            <p className="text-2xl font-heading text-primary italic">
              <b>"We don't just stitch — we create <span className="text-accent">comfort</span> and <span className="text-accent">confidence</span>."</b>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-heading text-lg text-primary mb-2">Expert Craftsmanship</h3>
              <p className="text-sm text-muted-foreground">
                Years of experience in creating perfect fits
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-heading text-lg text-primary mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                24-hour turnaround without compromising quality
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-heading text-lg text-primary mb-2">100% Satisfaction</h3>
              <p className="text-sm text-muted-foreground">
                We guarantee you'll love your custom fit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
