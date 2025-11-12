import { useState } from "react";
import step1Image from "@/assets/step-1.png";
import step2Image from "@/assets/step-2.png";
import step3Image from "@/assets/step-3.png";

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "1",
      image: step1Image,
      title: "Choose Your Design",
      description: "Share your fabric & style preferences. We help you create the perfect look.",
    },
    {
      number: "2",
      image: step2Image,
      title: "We Stitch It Custom",
      description: "Our expert tailors craft your perfect fit with precision and care.",
    },
    {
      number: "3",
      image: step3Image,
      title: "Delivered in 24 Hours",
      description: "Straight to your doorstep in Ranchi. Fast, reliable, premium quality.",
    },
  ];

  const handleIconClick = (index: number) => {
    setActiveStep(index);
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

        {/* Main Layout - Matching Reference Structure */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start justify-between">
            
            {/* Left Side: Icons, Timeline & Content (Vertical Stack) */}
            <div className="w-full lg:w-[65%] flex flex-col items-center">
              
              {/* Clickable Icon Blobs Row */}
              <div className="flex justify-center items-center gap-16 mb-10 w-full max-w-md">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => handleIconClick(index)}
                    className={`relative flex-shrink-0 transition-all duration-500 ease-out hover:scale-105 focus:outline-none ${
                      activeStep === index ? 'scale-110' : 'scale-100'
                    }`}
                    aria-label={`View ${step.title}`}
                    style={{
                      width: '110px',
                      height: '110px',
                    }}
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
                        activeStep === index
                          ? 'bg-primary shadow-[0_10px_40px_rgba(0,180,220,0.35)]'
                          : 'bg-muted/50 shadow-md hover:shadow-lg'
                      }`}
                      style={{
                        borderRadius: index === 0 
                          ? '50% 50% 50% 50% / 60% 60% 40% 40%'
                          : index === 1
                          ? '60% 40% 50% 50% / 50% 60% 40% 50%'
                          : '50% 50% 60% 40% / 50% 50% 50% 50%',
                      }}
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className={`w-16 h-16 object-contain transition-all duration-500 ${
                          activeStep === index ? 'brightness-0 invert scale-110' : 'opacity-60'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Timeline with Number Circle on Left */}
              <div className="flex items-center gap-6 mb-10 w-full max-w-md">
                {/* Large Number Circle - Fixed on Left */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-15 sm:h-15 rounded-full bg-primary flex items-center justify-center shadow-[0_8px_30px_rgba(0,180,220,0.4)] ring-4 ring-primary/10 transition-all duration-500">
                    <span className="text-white font-heading text-2xl sm:text-3xl font-bold">
                      {activeStep + 1}
                    </span>
                  </div>
                </div>

                {/* Timeline Line with Dots */}
                <div className="relative flex-1 h-1">
                  <div className="absolute inset-0 bg-primary/20 rounded-full" />
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${(activeStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                  <div className="absolute inset-0 flex justify-between items-center px-0">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-500 ${
                          index <= activeStep ? 'bg-primary scale-125 shadow-md' : 'bg-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Text Below Timeline */}
              <div className="space-y-3 w-full max-w-md">
                <h3 className="font-heading text-3xl sm:text-4xl text-foreground font-bold tracking-tight leading-tight transition-all duration-500">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-white/90 text-base sm:text-lg transition-all duration-500">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

            {/* Right Side: Large Circular Icon Badge */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
              <div 
                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ease-out"
                key={activeStep}
              >
                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <img 
                    src={steps[activeStep].image} 
                    alt={steps[activeStep].title}
                    className="w-full h-full object-contain animate-fade-in"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
