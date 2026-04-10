"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Parallax footer reveal (SOHub style)
    gsap.fromTo(footerRef.current.querySelector('.footer-content'),
      { y: -150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="relative bg-gray-100 text-white pb-10 pt-24 px-6 md:px-24 overflow-hidden border-t border-white/5">
      <div className="footer-content max-w-[1600px] w-full mx-auto flex flex-col items-center text-center">
        <h2 className="font-head text-[clamp(4rem,10vw,12rem)] font-extrabold leading-[0.85] tracking-tighter mb-12 mix-blend-overlay opacity-80">
          Don't be shy
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <a
            href="mailto:yashb0227@gmail.com"
            className="interactive group relative overflow-hidden rounded-full bg-black text-white px-[clamp(2rem,4vw,3rem)] py-[clamp(1rem,2vw,1.5rem)] font-bold text-[clamp(1rem,2vw,1.25rem)] tracking-wide transition-transform hover:scale-105 inline-flex items-center gap-3 hover:shadow-2xl hover:shadow-black/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Chat with Yash <ArrowUpRight className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-red-fire translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0" />
          </a>
          <a
            href="/Yash-Barot.pdf"
            download
            className="interactive rounded-full border border-red-fire bg-transparent text-red-fire px-[clamp(2rem,4vw,3rem)] py-[clamp(1rem,2vw,1.5rem)] font-bold text-[clamp(1rem,2vw,1.25rem)] tracking-wide transition duration-300 hover:bg-red-fire hover:text-black"
          >
            Download PDF
          </a>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <div className="font-head font-bold text-[clamp(1.25rem,2vw,1.75rem)] tracking-tight">Yash Barot.</div>
          <div className="flex gap-[clamp(1.5rem,3vw,2rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold tracking-wider uppercase text-gray-400">
            <a href="#work" className="interactive hover:text-white transition-colors duration-300">Work</a>
            <a href="mailto:yashb0227@gmail.com" className="interactive hover:text-white transition-colors duration-300">Contact</a>
          </div>
          <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] opacity-70">
            © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-[200]">
        <a
          href="https://wa.me/8849213475/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-red-fire text-black shadow-2xl shadow-red-fire/20 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 md:w-7 md:h-7" />
        </a>
      </div>
    </footer>
  );
}
