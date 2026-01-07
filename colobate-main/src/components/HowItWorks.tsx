import { useState } from "react";



import step1Image from "@/assets/step-1.png";
import step2Image from "@/assets/step-2.png";
import step3Image from "@/assets/step-3.png";

import stepLarge1Image from "@/assets/design.jpeg";
import stepLarge2Image from "@/assets/stiching.jpeg";
import stepLarge3Image from "@/assets/3rdstep.jpeg";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "01. Design & Consultation",
      description:
        "Share your fabric & style preferences with our design experts for a perfect look.",
      icon: step1Image,
      image: stepLarge1Image,
    },
    {
      title: "02. Custom Stitching",
      description:
        "Our skilled tailors craft your garment with meticulous attention to detail and fit.",
      icon: step2Image,
      image: stepLarge2Image,
    },
    {
      title: "03. Doorstep Delivery",
      description:
        "Your custom-fitted garment is delivered right to your door, ready to wear.",
      icon: step3Image,
      image: stepLarge3Image,
    },
  ];

  return (
    <section
      className="py-24"
      style={{ background: "var(--gradient-section-blue-in)" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-20">
          Our Simple 3-Step Process
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveStep(index)}
              className="group relative"
            >
              {/* Glow Border */}
              <div
                className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br
                  from-sky-400/40 via-blue-300/20 to-transparent
                  opacity-0 group-hover:opacity-100
                  blur-xl transition duration-500
                "
              />

              {/* Card */}
              <div
                className="
                  relative z-10 h-full
                  rounded-3xl p-10 text-center
                  bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_55%,#eef8ff_100%)]
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  transition-all duration-500 ease-out
                  group-hover:-translate-y-4
                  group-hover:shadow-[0_40px_90px_rgba(0,120,255,0.35)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-16 h-16 mx-auto mb-6 rounded-full
                    bg-gradient-to-br from-sky-100 to-blue-200
                    flex items-center justify-center
                    shadow-inner
                    transition-all duration-500
                    group-hover:from-blue-500 group-hover:to-sky-500
                    group-hover:scale-110
                  "
                >
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="
                      w-8 h-8 transition duration-500
                      group-hover:brightness-0 group-hover:invert
                    "
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    text-xl font-semibold mb-4
                    transition-colors duration-500
                    group-hover:text-blue-600
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    text-gray-600 mb-10 leading-relaxed
                    transition-colors duration-500
                    group-hover:text-gray-800
                  "
                >
                  {step.description}
                </p>

                {/* Image */}
                <div
                  className="
                    w-44 h-44 mx-auto rounded-full overflow-hidden
                    ring-4 ring-white
                    shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                    transition-all duration-700
                    group-hover:shadow-[0_30px_80px_rgba(0,120,255,0.45)]
                  "
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-110
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
