"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const journeyItems = [
  {
    dateRange: "February 2024 - Present",
    role: "WordPress Web Designer",
    company: "tviStech, Ahmedabad",
    desc: "Leading digital experience creation, building intuitive interfaces, and optimizing websites for performance while staying ahead with emerging technologies."
  },
  {
    dateRange: "August 2023 - January 2024",
    role: "Intern WordPress Web Designer",
    company: "tviStech, Ahmedabad",
    desc: "Developed foundational skills in WordPress development and responsive design during 6-month intensive internship."
  },
  {
    dateRange: "May 2019 - April 2023",
    role: "Bachelor in Information Technology",
    company: "SSIU - Swarnim Startup & Innovation University",
    desc: "Built technical foundation for web design career."
  }
];

export default function ProfessionalJourney() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Stagger animation for timeline items
    itemsRef.current.forEach((item, idx) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate the line
      tl.fromTo(
        item.querySelector(".timeline-line"),
        { height: 0 },
        { height: "100%", duration: 1 },
        0
      );

      // Animate the dot
      tl.fromTo(
        item.querySelector(".timeline-dot"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0.3
      );

      // Animate the content
      tl.fromTo(
        item.querySelector(".timeline-content"),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.5
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 px-4 md:px-24 bg-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
            <span className="w-8 h-[2px] bg-red-fire inline-block" />
            Experience
          </p>
          <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2">Professional Journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line connecting all items */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-fire via-red-fire/50 to-transparent" />

          <div className="space-y-10">
            {journeyItems.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="relative pl-20 md:pl-32"
              >
                {/* Timeline line (animated) */}
                <div className="timeline-line absolute left-2 md:left-3 top-0 w-[2px] h-0 bg-red-fire" />

                {/* Timeline dot */}
                <div className="timeline-dot absolute left-0 md:left-[6px] top-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-fire border-4 border-black" />

                {/* Content */}
                <div className="timeline-content">
                  <p className="font-sans text-[clamp(0.75rem,1.5vw,0.875rem)] tracking-[0.1em] uppercase text-red-fire font-bold mb-2">
                    {item.dateRange}
                  </p>
                  <h3 className="font-head text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-white mb-2">
                    {item.role}
                  </h3>
                  <p className="font-sans text-[clamp(0.875rem,1.5vw,1rem)] text-gray-400 mb-4">
                    {item.company}
                  </p>
                  <p className="text-gray-300 text-[clamp(1rem,2vw,1.125rem)] leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
