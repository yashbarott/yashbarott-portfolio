"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaWordpress, FaShopify, FaElementor, FaFigma, FaBolt, FaSearch, FaReact } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesList = [
  { title: "Custom WordPress", icon: FaWordpress, desc: "Building scalable, high-performing WP themes from scratch." },
  { title: "Shopify E-commerce", icon: FaShopify, desc: "End-to-end Shopify store setup and optimization." },
  { title: "Elementor Design", icon: FaElementor, desc: "Pixel-perfect Elementor setups that don't compromise speed." },
  { title: "Responsive UI/UX", icon: FaFigma, desc: "Flawless experiences across all device sizes." },
  { title: "Optimization", icon: FaBolt, desc: "90+ Core Web Vitals and lightning fast loading times." },
  { title: "Technical SEO", icon: FaSearch, desc: "Built-in structure that ranks well on search engines." },
  { title: "React Development", icon: FaReact, desc: "Building fast, scalable, and dynamic user interfaces with modern React architecture." }
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
      return -(trackWidth - window.innerWidth + 200); // 200 padding adjustment
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
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.refresh());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center">
      <div className="absolute top-24 left-6 md:left-24">
        <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
          <span className="w-8 h-[2px] bg-red-fire inline-block" />
          Capabilities
        </p>
        <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2">My Services</h2>
      </div>

      <div ref={trackRef} className="flex gap-8 pl-6 md:pl-24 pt-32 w-max">
        {servicesList.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="w-[300px] md:w-[450px] h-[400px] md:h-[500px] bg-gray-100 flex flex-col justify-between p-10 border border-white/5 rounded-2xl group hover:bg-gray-200 transition-colors"
            >
              <div className="text-red-fire group-hover:scale-110 transition-transform origin-left duration-500 text-[clamp(2.5rem,5vw,3rem)]">
                <Icon className="w-[100px] h-[100px]" />
              </div>
              <div>
                <p className="text-red-fire font-head text-[clamp(0.75rem,1.5vw,0.875rem)] font-bold tracking-widest uppercase mb-4 opacity-50">0{idx + 1}</p>
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
