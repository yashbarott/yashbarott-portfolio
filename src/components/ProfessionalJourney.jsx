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
  const badgesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate connecting line
    gsap.fromTo(
      sectionRef.current.querySelector(".connecting-line"),
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    );

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

      // Animate badge with scale and glow effect
      tl.fromTo(
        item.querySelector(".timeline-badge"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        0 + idx * 0.2
      );

      // Animate content slide in
      tl.fromTo(
        item.querySelector(".timeline-content"),
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.4 + idx * 0.2
      );
    });

    // Add hover animations to badges
    badgesRef.current.forEach((badge) => {
      badge.addEventListener("mouseenter", () => {
        gsap.to(badge, { scale: 1.15, duration: 0.3 });
      });
      badge.addEventListener("mouseleave", () => {
        gsap.to(badge, { scale: 1, duration: 0.3 });
      });
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
          {/* Animated connecting line */}
          <div className="connecting-line absolute left-[35px] md:left-[42px] top-0 bottom-0 w-1 bg-gradient-to-b from-red-fire via-red-fire/40 to-transparent h-0 origin-top" />

          <div className="space-y-12">
            {journeyItems.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="relative pl-28 md:pl-40"
              >
                {/* Animated Number Badge */}
                <div
                  ref={(el) => (badgesRef.current[idx] = el)}
                  className="timeline-badge absolute left-0 md:left-1 top-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-fire to-red-600 flex items-center justify-center cursor-pointer shadow-lg shadow-red-fire/50 group hover:shadow-red-fire/100 transition-shadow duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-fire/20 to-transparent animate-pulse" />
                  <span className="relative text-2xl md:text-3xl font-head font-extrabold text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="timeline-content bg-gray-900/30 border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-red-fire/30 transition-all duration-500 group">
                  <p className="font-sans text-[clamp(0.75rem,1.5vw,0.875rem)] tracking-[0.1em] uppercase text-red-fire font-bold mb-2">
                    {item.dateRange}
                  </p>
                  <h3 className="font-head text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-white mb-2 group-hover:text-red-fire transition-colors duration-300">
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
