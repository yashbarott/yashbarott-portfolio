"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextScrub({ text, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".scrub-word");
    
    // Set initial state
    gsap.set(words, { opacity: 0.15 });

    const timeline = gsap.to(words, {
      opacity: 1,
      stagger: 1, // High stagger effectively reveals them word by word as scroll progresses
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((t) => t.refresh());
    };
  }, []);

  const wordList = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {wordList.map((word, i) => (
        <span key={i} className="scrub-word inline-block mr-[0.3em]">
          {word === "\n" ? <br /> : word}
        </span>
      ))}
    </div>
  );
}
