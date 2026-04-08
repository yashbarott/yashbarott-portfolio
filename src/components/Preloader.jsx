"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setCompleted(true);
        document.body.style.overflow = "";
      }
    });

    // Fade in and pop the logo slightly
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    // Subtle float hold
    .to(logoRef.current, {
      y: -10,
      duration: 0.6,
      ease: "power1.inOut"
    }, "+=0.2")
    // Hide the logo
    .to(logoRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in"
    })
    // Slide the huge black curtain up
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    });

  }, []);

  if (completed) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{ touchAction: "none" }}
    >
      <div 
        ref={logoRef}
        className="font-head text-[clamp(5rem,15vw,12rem)] font-extrabold text-white tracking-tighter"
      >
        YB<span className="text-red-fire">.</span>
      </div>
    </div>
  );
}
