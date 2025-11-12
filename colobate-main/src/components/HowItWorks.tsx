import { useState } from "react";
import step1Image from "@/assets/step-1.png";
import step2Image from "@/assets/step-2.png";
import step3Image from "@/assets/step-3.png";

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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

  const handleControlClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

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

        {/* Control Buttons with Numbers */}
        <div className="flex justify-center gap-6 animate-fade-in">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleControlClick(index)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-out font-heading text-2xl font-bold ${
                activeStep === index
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] scale-110 ring-4 ring-primary/20'
                  : 'bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:scale-110 border-2 border-border/30 text-foreground hover:border-primary/40'
              }`}
              aria-label={`View ${step.title}`}
            >
              {step.number}
            </button>
          ))}
        </div>

        {/* Cards Container */}
        <div className="max-w-6xl mx-auto mt-10 relative min-h-[450px]">
          {steps.map((step, index) => {
            // Determine position classes based on active state
            let positionClasses = '';
            let transformClasses = '';
            
            if (activeStep === null) {
              // All cards stacked in center initially
              positionClasses = 'left-1/2 -translate-x-1/2';
            } else if (activeStep === index) {
              // Active card positions
              if (index === 0) {
                positionClasses = 'left-0 md:left-[3%]';
                transformClasses = 'translate-x-0';
              } else if (index === 1) {
                positionClasses = 'left-1/2 -translate-x-1/2';
                transformClasses = 'rotateY(0deg)';
              } else {
                positionClasses = 'right-0 md:right-[3%]';
                transformClasses = 'translate-x-0';
              }
            } else {
              // Inactive cards return to center
              positionClasses = 'left-1/2 -translate-x-1/2';
            }

            return (
              <div 
                key={index}
                className={`absolute top-0 w-full md:w-[30%] transition-all duration-700 ease-out ${positionClasses}`}
                style={{
                  transform: activeStep === index && index === 1 ? 'translateX(-50%) rotateY(0deg)' : undefined,
                  transformStyle: index === 1 ? 'preserve-3d' : undefined,
                  perspective: index === 1 ? '1000px' : undefined,
                  zIndex: activeStep === index ? 10 : 1,
                }}
              >
                {/* Minimized State */}
                <div 
                  className={`transition-all duration-700 ease-out ${
                    activeStep === index 
                      ? 'opacity-0 scale-75 pointer-events-none' 
                      : 'opacity-100 scale-100'
                  }`}
                  style={{
                    transform: activeStep === null && index === 1 ? 'rotateY(180deg)' : undefined,
                  }}
                >
                  <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-md border border-border/10 flex items-center justify-center h-[120px]">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center shadow-md">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-10 h-10 object-contain opacity-40"
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded State */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeStep === index 
                      ? 'opacity-100 scale-100 pointer-events-auto' 
                      : 'opacity-0 scale-90 pointer-events-none'
                  }`}
                  style={{
                    transform: activeStep !== index && index === 1 ? 'rotateY(180deg)' : undefined,
                    backfaceVisibility: index === 1 ? 'hidden' : undefined,
                  }}
                >
                  <div className="bg-card backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl border border-primary/20 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="mb-6 flex justify-center">
                      <div className="w-36 h-36 bg-primary/5 rounded-full flex items-center justify-center shadow-md">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-heading text-2xl text-foreground font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Control Buttons with Numbers */}
        {/* <div className="flex justify-center gap-6 animate-fade-in">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleControlClick(index)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-out font-heading text-2xl font-bold ${
                activeStep === index
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] scale-110 ring-4 ring-primary/20'
                  : 'bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:scale-110 border-2 border-border/30 text-foreground hover:border-primary/40'
              }`}
              aria-label={`View ${step.title}`}
            >
              {step.number}
            </button>
          ))}
        </div> */}
      </div>
    </section>
  );
};