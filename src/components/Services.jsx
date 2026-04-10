"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FaWordpress,
  FaShopify,
  FaElementor,
  FaFigma,
  FaBolt,
  FaSearch,
  FaReact,
  FaWix,
  FaPhp,
  FaLaravel,
} from "react-icons/fa";
import { FaP } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesList = [
  {
    title: "Custom WordPress",
    icon: FaWordpress,
    desc: "Building scalable, high-performing WP themes from scratch.",
  },
  {
    title: "Shopify E-commerce",
    icon: FaShopify,
    desc: "End-to-end Shopify store setup and optimization.",
  },
  {
    title: "Elementor Design",
    icon: FaElementor,
    desc: "Pixel-perfect Elementor setups that don't compromise speed.",
  },
  {
    title: "Responsive UI/UX",
    icon: FaFigma,
    desc: "Flawless experiences across all device sizes.",
  },
  {
    title: "Optimization",
    icon: FaBolt,
    desc: "90+ Core Web Vitals and lightning fast loading times.",
  },
  {
    title: "Technical SEO",
    icon: FaSearch,
    desc: "Built-in structure that ranks well on search engines.",
  },
  {
    title: "React Development",
    icon: FaReact,
    desc: "Designing elegant, responsive interfaces powered by reusable React components.",
  },
  {
    title: "Wix Development",
    icon: FaWix,
    desc: "Creating visually stunning, responsive Wix sites tailored for performance and growth.",
  },
   {
    title: "Laravel Development",
    icon: FaLaravel,
    desc: "Delivering powerful backend systems tailored for performance, scalability, and growth.",
  },
    {
    title: "PHP Development",
    icon: FaPhp,
    desc: "Engineering custom backend logic, APIs, and scalable architectures using PHP.",
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Calculate how far to move horizontally
    // It's the total width of the track minus the viewport width
    const getScrollAmount = () => {
      let trackWidth = trackRef.current.scrollWidth;
      return -(trackWidth - window.innerWidth); // Recalculate to prevent clipping
    };

    const tween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.refresh());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute top-16 left-6 md:left-24">
        <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
          <span className="w-8 h-[2px] bg-red-fire inline-block" />
          Capabilities
        </p>
        <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2">
          My Services
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 pl-4 md:pl-24 pr-4 md:pr-24 pt-16 md:pt-20 w-max"
      >
        {servicesList.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="w-[260px] md:w-[450px] h-[350px] md:h-[500px] bg-gray-100 flex flex-col justify-between p-6 md:p-10 border border-white/5 rounded-2xl group hover:bg-gray-200 transition-colors"
            >
              <div className="text-red-fire group-hover:scale-110 transition-transform origin-left duration-500 text-[clamp(2.5rem,5vw,3rem)]">
                <Icon className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]" />
              </div>
              <div>
                <p className="text-red-fire font-head text-[clamp(0.75rem,1.5vw,0.875rem)] font-bold tracking-widest uppercase mb-4 opacity-50">
                  0{idx + 1}
                </p>
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-head font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-[clamp(1rem,2vw,1.125rem)] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
