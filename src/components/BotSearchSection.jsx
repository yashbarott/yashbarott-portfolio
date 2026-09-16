"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BOT_HEIGHT = 72;
const FLOOR_OFFSET = 40;

export default function BotSearchSection() {
  const arenaRef = useRef(null);
  const botRef = useRef(null);
  const eyesRef = useRef(null);
  const hatRef = useRef(null);
  const targetRef = useRef(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("Move your cursor around to teach me.");

  useEffect(() => {
    const arena = arenaRef.current;
    const bot = botRef.current;

    const getTarget = (event) => {
      const bounds = arena.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const botY = y - (bounds.height - FLOOR_OFFSET - BOT_HEIGHT);

      return {
        markerX: x,
        markerY: y,
        botX: Math.max(-bounds.width / 2 + 55, Math.min(bounds.width / 2 - 55, x - bounds.width / 2)),
        botY: Math.max(-bounds.height + BOT_HEIGHT + FLOOR_OFFSET, Math.min(0, botY)),
      };
    };

    const handlePointerMove = (event) => {
      const target = getTarget(event);
      targetRef.current = target;

      gsap.to(".bot-cursor-target", {
        left: target.markerX,
        top: target.markerY,
        opacity: 1,
        duration: 0.18,
        ease: "steps(3)",
      });
      gsap.to(eyesRef.current, {
        x: target.botX > 0 ? 3 : -3,
        duration: 0.15,
        ease: "steps(2)",
      });
      setStatus("Click anywhere to throw me there.");
    };

    const handlePointerDown = (event) => {
      const target = getTarget(event);
      targetRef.current = target;

      gsap.killTweensOf(bot);
      gsap.to(bot, {
        x: target.botX,
        y: target.botY - 24,
        duration: 0.22,
        ease: "steps(3)",
        onComplete: () => {
          gsap.to(bot, {
            y: target.botY,
            duration: 0.2,
            ease: "bounce.out",
            onComplete: () => {
              setScore((currentScore) => currentScore + 10);
              setStatus("Nice jump! Keep going.");
            },
          });
        },
      });
      gsap.to(hatRef.current, {
        rotation: target.botX > 0 ? 12 : -12,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "steps(2)",
      });
      setStatus("Jumping to your cursor...");
    };

    const handlePointerLeave = () => {
      gsap.to(".bot-cursor-target", {
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(eyesRef.current, { x: 0, duration: 0.2, ease: "steps(2)" });
      setStatus("Come back and teach me another move.");
    };

    arena.addEventListener("pointermove", handlePointerMove);
    arena.addEventListener("pointerdown", handlePointerDown);
    arena.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      arena.removeEventListener("pointermove", handlePointerMove);
      arena.removeEventListener("pointerdown", handlePointerDown);
      arena.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf([bot, eyesRef.current, hatRef.current, ".bot-cursor-target"]);
    };
  }, []);

  return (
    <section
      aria-labelledby="bot-game-title"
      className="relative overflow-hidden border-t border-white/5 bg-gray-100 px-4 py-16 md:px-12 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-deep/20 blur-[130px]" />
      <div className="relative w-full">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-fire">
              Interactive assistant
            </p>
            <h2
              id="bot-game-title"
              className="font-head text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.88] tracking-tighter"
            >
              Teach the bot.
            </h2>
          </div>
          <div className="shrink-0 text-right font-mono uppercase tracking-[0.2em]">
            <p className="text-xs text-gray-400">Score</p>
            <p className="text-3xl font-bold text-red-fire">{score}</p>
          </div>
        </div>

        <div
          ref={arenaRef}
          className="relative h-[390px] w-full cursor-crosshair overflow-hidden border-b-8 border-red-deep bg-gradient-to-b from-gray-200/50 to-gray-100 px-8 select-none touch-none"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div
            className="bot-cursor-target pointer-events-none absolute z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-400 opacity-0"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-orange-400" />
          </div>

          <div
            ref={botRef}
            className="absolute bottom-10 left-1/2 z-10 h-[4.5rem] w-24 -translate-x-1/2 bg-red-fire shadow-[5px_5px_0_rgba(0,0,0,0.35)]"
          >
            <div className="absolute -left-3 bottom-0 h-10 w-3 bg-red-deep" />
            <div className="absolute -right-3 bottom-0 h-10 w-3 bg-red-deep" />
            <div className="absolute -top-5 left-4 h-5 w-14 bg-red-fire" />
            <div
              ref={hatRef}
              className="absolute -top-10 left-1/2 h-10 w-12 -translate-x-1/2 bg-red-deep"
            >
              <span className="absolute -top-3 left-3 h-3 w-6 bg-red-fire" />
              <span className="absolute -top-1 -left-3 h-2 w-[4.5rem] bg-red-fire" />
              <span className="absolute top-1 left-2 h-2 w-8 bg-orange-400" />
            </div>
            <div ref={eyesRef} className="absolute left-1/2 top-6 flex -translate-x-1/2 gap-7">
              <span className="h-3 w-3 bg-black" />
              <span className="h-3 w-3 bg-black" />
            </div>
            <span className="absolute bottom-3 left-5 h-3 w-3 bg-orange-400" />
            <span className="absolute bottom-3 right-5 h-3 w-3 bg-orange-400" />
            <span className="absolute -bottom-5 left-5 h-5 w-4 bg-red-deep" />
            <span className="absolute -bottom-5 right-5 h-5 w-4 bg-red-deep" />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-8 bg-black/50" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
            {status}
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
          Move to aim · Click to throw · +10 points per jump
        </p>
      </div>
    </section>
  );
}
