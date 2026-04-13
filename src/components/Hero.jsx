"use client";

import SplitTextReveal from "./SplitTextReveal";
import { MoveRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // SOHub inspired dynamic background or orb float
    gsap.to(".hero-orb", {
      y: -40,
      x: 30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 2,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-28 overflow-hidden"
    >
      {/* Background Subtle elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="hero-orb absolute top-10 left-[10%] w-[40vw] h-[40vw] max-w-lg max-h-lg rounded-full bg-red-deep/20 blur-[100px]" />
        <div className="hero-orb absolute bottom-0 right-[5%] w-[50vw] h-[50vw] max-w-xl max-h-xl rounded-full bg-red-fire/10 blur-[120px]" />
      </div>

      {/* Rotating Badge */}
      <div className="hero-rotate-badge absolute top-32 right-10 md:right-24 z-10 animate-[spin_10s_linear_infinite] opacity-60 mix-blend-difference hidden md:block">
        <svg viewBox="0 0 100 100" className="w-32 h-32 fill-current text-red-fire">
          <defs>
            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="11" fontWeight="bold" letterSpacing="0.25em" className="uppercase font-sans">
            <textPath href="#circle">
              Web Designer • Developer
            </textPath>
          </text>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto">
        <div className="overflow-hidden mb-6">
          <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold animate-fade-in-up flex items-center gap-4">
            <span className="w-8 h-[2px] bg-red-fire inline-block" />
            Available for new projects
          </p>
        </div>

        <SplitTextReveal
          as="h1"
          text={"Web Designer & Developer."}
          delay={0.4}
          className="font-head text-[clamp(3.5rem,8vw,8rem)] font-extrabold leading-[0.95] tracking-tight text-white mb-8 mix-blend-difference"
        />

        <div className="flex flex-col gap-10  mt-12 w-full max-w-[1600px]">
          <div className="opacity-0 translate-y-8 animate-fade-in-up animation-delay-800 flex-1 text-gray-400 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed">
            "As a Visual Alchemist, I believe in the transformative power of design to elevate brands and shape unforgettable
            user experiences."
          </div>

          <div className="opacity-0 translate-y-8 animate-fade-in-up animation-delay-1000 flex flex-wrap items-center gap-6 pb-2">
            <a href="mailto:yashb0227@gmail.com" className="interactive group relative overflow-hidden rounded-full bg-white text-black px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] font-bold text-[clamp(0.875rem,1.5vw,1rem)] tracking-wide transition-transform hover:scale-105 inline-block">
              <span className="relative z-10 flex items-center gap-2">
                Hire Me <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-red-fire translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
            </a>
            <a href="#work" className="interactive text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold tracking-wide uppercase border-b border-transparent hover:border-white transition-colors pb-1">
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
