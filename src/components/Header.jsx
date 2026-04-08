"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
        } px-6 md:px-24`}
    >
      <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
        <div className="font-head text-[clamp(1.5rem,2vw,2rem)] font-extrabold text-white tracking-tighter">
          YB<span className="text-red-fire">.</span>
        </div>

        <nav className="hidden md:flex items-center gap-[clamp(1.5rem,3vw,2rem)] text-[clamp(0.75rem,1vw,0.875rem)] font-semibold tracking-wider uppercase text-gray-300">
          <a href="#about" className="interactive hover:text-white transition-colors">About</a>
          <a href="#services" className="interactive hover:text-white transition-colors">Services</a>
          <a href="mailto:yashb0227@gmail.com" className="interactive bg-gray-100 hover:bg-white text-white hover:text-black px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full transition-colors border border-white/10">Hire Me</a>
        </nav>

        {/* Mobile menu icon (simple placeholder) */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer interactive">
          <span className="w-6 h-[2px] bg-white inline-block"></span>
          <span className="w-6 h-[2px] bg-white inline-block"></span>
        </div>
      </div>
    </header>
  );
}
