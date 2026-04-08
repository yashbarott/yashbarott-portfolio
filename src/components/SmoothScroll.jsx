"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }
    
    // Sync GSAP ticker with Lenis
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.currentTarget;
      const id = target.getAttribute("href");
      if (id && id.startsWith("#") && id.length > 1) {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element && lenisRef.current?.lenis) {
          lenisRef.current.lenis.scrollTo(element, {
            offset: 0,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    const setupAnchors = () => {
      const anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", handleAnchorClick);
      });
      return anchors;
    };

    // Delay setting up anchors slightly to ensure components are mounted
    let activeAnchors = [];
    setTimeout(() => {
      activeAnchors = setupAnchors();
    }, 500);

    return () => {
      gsap.ticker.remove(update);
      activeAnchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
