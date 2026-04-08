"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  as: Component = "div",
  onScroll = false
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lines = containerRef.current.querySelectorAll(".split-line-inner");

    // SOHub animation style
    const animConfig = {
      y: "110%",
      opacity: 0,
      duration: 0.0, // initial state
    };

    gsap.set(lines, animConfig);

    const animation = gsap.to(lines, {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: onScroll ? 0 : delay,
      scrollTrigger: onScroll
        ? {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        : null,
    });

    return () => {
      animation.kill();
      if (onScroll) ScrollTrigger.getAll().forEach((t) => t.refresh());
    };
  }, [delay, onScroll]);

  // Handle strings with newlines like "Line 1 \n Line 2"
  const textLines = typeof text === 'string' ? text.split("\n") : [text];

  return (
    <Component ref={containerRef} className={className}>
      {textLines.map((line, i) => (
        <span
          key={i}
          className="split-line-wrapper inline-block overflow-hidden pb-1"
          style={{ verticalAlign: "top" }}
        >
          <span className="split-line-inner inline-block pb-2">
            {line === "" ? "\u00A0" : line}
          </span>
        </span>
      ))}
    </Component>
  );
}
