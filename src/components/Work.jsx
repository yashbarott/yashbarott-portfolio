"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title1: "High-Converting",
    title2: "E-commerce",
    tags: ["Shopify", "UI/UX", "Speed Optimization", "Conversion"],
    desc: "At Yash Barot, we recognize that effective e-commerce goes beyond simply listing products. It involves understanding target audiences, crafting compelling user flows, and improving the sustainable growth of an online storefront.",
    bgImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000')"
  },
  {
    id: 2,
    title1: "Corporate",
    title2: "Identities",
    tags: ["WordPress", "Elementor", "SEO", "Branding"],
    desc: "We build scalable, high-performing corporate websites that establish trust and authority. Every pixel is optimized to ensure a seamless experience that reflects your brand's core values.",
    bgImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')"
  },
  {
    id: 3,
    title1: "Creative",
    title2: "Portfolios",
    tags: ["Frontend", "GSAP", "Tailwind", "React"],
    desc: "Standing out requires more than just a template. We craft bespoke digital experiences with immersive animations and layout strategies that captivate visitors from the first second.",
    bgImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')"
  }
];

export default function Work() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} id="work" className="relative w-full pt-32 pb-10 px-4 md:px-12 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 px-4">
          <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
            <span className="w-8 h-[2px] bg-red-fire inline-block" />
            Selected Work
          </p>
          <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2">Featured Projects</h2>
        </div>

        <div className="relative w-full flex flex-col items-center pb-10">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="sticky top-0 w-full rounded-[40px] overflow-hidden flex flex-col justify-end shadow-2xl border border-white/10"
                style={{
                  height: "80vh",
                  top: `calc(10vh + ${index * 40}px)`,
                  // Overlay gradient to make text readable over the background image
                  backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.4) 100%), ${project.bgImage}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: index,
                }}
              >
                <div className="p-8 md:p-16 w-full max-w-5xl">
                  <h3 className="font-head text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white mb-10">
                    {project.title1}
                    <br />
                    <span className="text-gray-400">{project.title2}</span>
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-sm font-semibold text-gray-200 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 items-start">
                    <Sparkles className="w-8 h-8 text-white opacity-80 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-3xl">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
