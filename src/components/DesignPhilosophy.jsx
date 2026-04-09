"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const philosophyItems = [
  {
    title: "Concept",
    desc: "Transform ideas into visual concepts that resonate"
  },
  {
    title: "Creation",
    desc: "Craft seamless user experiences with attention to detail"
  },
  {
    title: "Execution",
    desc: "Deliver excellence that leaves lasting impact"
  }
];

export default function DesignPhilosophy() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate items on scroll
    itemsRef.current.forEach((item, idx) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: idx * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 px-4 md:px-24 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-14">
          <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
            <span className="w-8 h-[2px] bg-red-fire inline-block" />
            Design Philosophy
          </p>
          <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2">How I Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {philosophyItems.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="flex flex-col gap-5 pt-10 border-t border-white/10 hover:border-red-fire/50 transition-colors duration-500"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-red-fire font-head text-[clamp(2.5rem,4vw,3rem)] font-extrabold">
                  0{idx + 1}
                </span>
                <h3 className="font-head text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-400 text-[clamp(1rem,2vw,1.125rem)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
