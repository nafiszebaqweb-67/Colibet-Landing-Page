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
            Your Perfect Fit in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From consultation to delivery, we make custom tailoring effortless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Card */}
              <div className="bg-card border border-accent/20 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon/Image */}
                <div className="mb-6 flex justify-center">
                  <div className="w-32 h-32 bg-primary/5 rounded-2xl flex items-center justify-center p-4 group-hover:bg-accent/10 transition-colors">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="font-heading text-xl text-primary font-bold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Arrow (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="text-accent text-3xl"> ⇨</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
