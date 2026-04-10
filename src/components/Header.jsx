"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-4"
        } px-6 md:px-24`}
    >
      <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
        <div className="font-head text-[clamp(1.5rem,2vw,2rem)] font-extrabold text-white tracking-tighter">
          YB<span className="text-red-fire">.</span>
        </div>

        <nav className="hidden md:flex items-center gap-[clamp(1.5rem,3vw,2rem)] text-[clamp(0.75rem,1vw,0.875rem)] font-semibold tracking-wider uppercase text-gray-300">
          <a href="#about" className="interactive hover:text-white transition-colors">About</a>
          <a href="#services" className="interactive hover:text-white transition-colors">Services</a>
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="interactive hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/yashbarott" target="_blank" rel="noopener noreferrer" className="interactive hover:text-white transition-colors">GitHub</a>
          <a href="mailto:yashb0227@gmail.com" className="interactive bg-gray-100 hover:bg-white text-white hover:text-black px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full transition-colors border border-white/10">Hire Me</a>
        </nav>

        {/* Mobile menu icon */}
        <button
          type="button"
          onClick={handleMenuToggle}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-white/10 text-white shadow-lg shadow-black/30 transition hover:bg-white/20 z-[150]"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-1 rotate-45" : "-translate-y-1"}`} />
          <span className={`block h-[2px] w-5 bg-white my-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-1 -rotate-45" : "translate-y-1"}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-black/95 border-t border-white/10 backdrop-blur-xl">
          <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-4 text-white text-[clamp(0.9rem,2vw,1rem)] uppercase font-semibold tracking-[0.25em]">
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-red-fire transition-colors">About</a>
            <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-red-fire transition-colors">Services</a>
            <a href="https://www.linkedin.com/in/yash-barot-95b7a5210/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="hover:text-red-fire transition-colors">LinkedIn</a>
            <a href="https://github.com/yashbarott" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="hover:text-red-fire transition-colors">GitHub</a>
            <a href="mailto:yashb0227@gmail.com" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-3 font-semibold transition-colors hover:bg-gray-200">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
