import step1Image from "@/assets/step-1.png";
import step2Image from "@/assets/step-2.png";
import step3Image from "@/assets/step-3.png";

export const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: "🧵",
      image: step1Image,
      title: "Choose Your Design",
      description: "Share your fabric & style preferences. We help you create the perfect look.",
    },
    {
      number: "2",
      icon: "✂️",
      image: step2Image,
      title: "We Stitch It Custom",
      description: "Our expert tailors craft your perfect fit with precision and care.",
    },
    {
      number: "3",
      icon: "📦",
      image: step3Image,
      title: "Delivered in 24 Hours",
      description: "Straight to your doorstep in Ranchi. Fast, reliable, premium quality.",
    },
  ];

  return (
    <section className="py-20" style={{ background: 'var(--gradient-section-blue-in)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Your Perfect Look in 3 Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From consultation to delivery, we make custom tailoring effortless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-border/10">
                {/* Large Circular Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-36 h-36 bg-primary/50 rounded-full flex items-center justify-center shadow-md">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl text-foreground font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Dashed Connector Line (hidden on mobile, shown on desktop) */}
              {/* {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-12 h-0.5 z-0">
                  <svg width="100%" height="2" className="overflow-visible">
                    <line 
                      x1="0" 
                      y1="1" 
                      x2="100%" 
                      y2="1" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="2" 
                      strokeDasharray="8,8"
                      opacity="0.4"
                    />
                    <circle cx="100%" cy="1" r="5" fill="hsl(var(--primary))" opacity="0.6" />
                  </svg>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
