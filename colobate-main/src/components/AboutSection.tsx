import { Scissors, Clock, Truck, MapPin, Award, Users, Sparkles, Zap, Heart } from "lucide-react";

export const AboutSection = () => {
  const features = [
    { 
      Icon: Scissors, 
      text: "Custom Design for Men & Women",
      description: "Tailored perfectly to your style"
    },
    { 
      Icon: Zap, 
      text: "24-Hour Delivery Promise",
      description: "Lightning-fast turnaround time"
    },
    { 
      Icon: Truck, 
      text: "Pickup & Drop Available",
      description: "Convenient doorstep service"
    },
    { 
      Icon: MapPin, 
      text: "Based in Ranchi — Local Experts",
      description: "Your trusted neighborhood tailors"
    },
    { 
      Icon: Award, 
      text: "Premium Stitching Quality",
      description: "Crafted with excellence & care"
    },
    { 
      Icon: Users, 
      text: "Trusted by 500+ Customers",
      description: "Join our satisfied community"
    },
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
                className="group relative p-6 bg-card border border-primary/10 rounded-xl hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <feature.Icon className="w-6 h-6 text-accent group-hover:text-accent/90" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1 leading-snug group-hover:text-primary transition-colors duration-300">
                      {feature.text}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tagline Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-accent/10 border border-accent/15">
            {/* Tailoring-Themed Decorative Elements */}
            <div className="absolute top-3 left-6 opacity-90">
              <Scissors className="w-10 h-10 text-white rotate-45" />
            </div>
            <div className="absolute bottom-1 right-6 opacity-90">
              <Scissors className="w-10 h-10 text-white -rotate-45" />
            </div>
            <div className="absolute top-1/2 left-12 opacity-90">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-1/2 right-12 opacity-90">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            
            {/* Content */}
            <div className="relative px-8 py-10 text-center">
              <blockquote className="relative">
                <p className="text-xl md:text-2xl font-heading text-foreground leading-relaxed max-w-3xl mx-auto">
                  <b>We don't just stitch — we create</b>{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-bold text-primary">comfort</span>
                    <span className="absolute bottom-0 left-0 w-full h-1.5 bg-primary/20 -z-0" />
                  </span>
                  {" "}<b>and</b>{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-bold text-accent">confidence</span>
                    <span className="absolute bottom-0 left-0 w-full h-1.5 bg-accent/20 -z-0" />
                  </span>
                  .
                </p>
              </blockquote>
            </div>
          </div>

          {/* Additional Info - 3D Icon Style */}
          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Expert Craftsmanship */}
              <div className="group text-center animate-fade-in">
                <div className="relative inline-block mb-4 perspective-1000">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-500 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                    <Award className="w-8 h-8 text-primary group-hover:animate-spin transition-transform duration-500" strokeWidth={1.5} style={{ animationDuration: '1s' }} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl transition-all duration-500" />
                </div>
                <h3 className="font-heading text-lg text-primary mb-2 font-semibold">Expert Craftsmanship</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  Years of experience in creating perfect fits
                </p>
              </div>
              
              {/* Lightning Fast */}
              <div className="group text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="relative inline-block mb-4 perspective-1000">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:shadow-[0_20px_50px_rgba(251,191,36,0.3)] transition-all duration-500 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                    <Zap className="w-8 h-8 text-accent group-hover:animate-spin transition-transform duration-500" strokeWidth={1.5} style={{ animationDuration: '1s' }} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-accent/5 blur-xl transition-all duration-500" />
                </div>
                <h3 className="font-heading text-lg text-primary mb-2 font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  24-hour turnaround without compromising quality
                </p>
              </div>
              
              {/* 100% Satisfaction */}
              <div className="group text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="relative inline-block mb-4 perspective-1000">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-500 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                    <Heart className="w-8 h-8 text-primary group-hover:animate-spin transition-transform duration-500" strokeWidth={1.5} fill="currentColor" style={{ animationDuration: '1s' }} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl transition-all duration-500" />
                </div>
                <h3 className="font-heading text-lg text-primary mb-2 font-semibold">100% Satisfaction</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  We guarantee you'll love your custom fit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};