"use client";

import TextScrub from "./TextScrub";

export default function About() {
  return (
    <section className="relative w-full py-32 px-6 md:px-24 bg-gray-100/50">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-16 items-center lg:items-start">
        <div className="w-full lg:w-1/4 shrink-0">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
            <img
              src="/yashbarott.jpg"
              alt="Yash Barot"
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-12 items-start">
          <div className="w-full">
            <TextScrub
              text="I don't just build websites — I build platforms that convert. Every build is clean, scalable, and easy to manage."
              className="font-head text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white"
            />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-16 items-start pt-12 border-t border-white/5">
            <div className="w-full">
              <p className="font-sans text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] uppercase text-red-fire font-bold flex items-center gap-4 mb-4">
                <span className="w-8 h-[2px] bg-red-fire inline-block" />
                About Me
              </p>
              <div className="text-gray-400 text-[clamp(1rem,2vw,1.125rem)] leading-relaxed">
                With 3+ years of experience in design and development, I help businesses build high-performing, conversion-focused websites using WordPress and Shopify.
              </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[clamp(2.5rem,4vw,3rem)] font-head font-extrabold text-red-fire mb-2">$15</p>
                <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-gray-500 uppercase tracking-widest">Hourly Rate</p>
              </div>
              <div>
                <p className="text-[clamp(2.5rem,4vw,3rem)] font-head font-extrabold text-red-fire mb-2">3+</p>
                <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-gray-500 uppercase tracking-widest">Years Exp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
