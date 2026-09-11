"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DEMO_IMAGES = [
  "https://cdn.21st.dev/assets/mirror/9c/9c0892e59c262cc1da34c88d977221da3f36aaef35ede7924d66b80c219be979.jpg",
  "https://cdn.21st.dev/assets/mirror/cb/cb5e5ebf2a894b2cd0e47b41b1fc76a3021ca1e2d2164e68aedca123cd33144f.jpg",
  "https://cdn.21st.dev/assets/mirror/98/989f6e3fb1763ee781695ca8471c7b5c34ee8162b73cb966a692df7183434dd6.jpg",
  "https://cdn.21st.dev/assets/mirror/d4/d42e2bf7d2616d0f8b7133f77efbc40bfbd042fbe5dd5e2ae3bb0b0cd5bf0b00.jpg",
  "https://cdn.21st.dev/assets/mirror/34/34ec840fc286ece83ac48705cb38c8b7bfae31022d3869530edad1e1b1305933.jpg",
  "https://cdn.21st.dev/assets/mirror/3a/3ad7469aaf0ee239cd4a79d5cbd089e88ee36def81eff12b76288139985a8bea.jpg",
  "https://cdn.21st.dev/assets/mirror/82/82d335fc097e30d74dc1b664327e735c0c2c01f807575623c72e2379f3bb3ae6.jpg",
  "https://cdn.21st.dev/assets/mirror/d5/d55bd9d62a8a40170fdb1bab434888bb28c9f11cf7d20bd6dcbe3befe8077abe.jpg",
];

export const AnimatedImageMarquee: React.FC<{
  images?: string[];
  speed?: number;
  className?: string;
}> = ({
  images = DEMO_IMAGES,
  speed = 35,
  className,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const transitionSettings = {
    ease: "linear",
    duration: speed,
    repeat: Infinity,
  };

  return (
    <div
      className={cn(
        "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden my-4 py-2 select-none",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex gap-5 w-max">
        {/* Track 1 - sliding from left to right */}
        <motion.div
          className="flex shrink-0 gap-5 items-center"
          animate={{
            x: isPaused ? undefined : ["-100%", "0%"],
          }}
          transition={transitionSettings}
        >
          {images.map((src, index) => (
            <MarqueeCard key={`track1-${index}`} src={src} index={index} />
          ))}
        </motion.div>

        {/* Track 2 - sliding from left to right */}
        <motion.div
          className="flex shrink-0 gap-5 items-center"
          animate={{
            x: isPaused ? undefined : ["-100%", "0%"],
          }}
          transition={transitionSettings}
        >
          {images.map((src, index) => (
            <MarqueeCard key={`track2-${index}`} src={src} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const MarqueeCard: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  return (
    <motion.div
      className="relative aspect-[3/4] h-52 sm:h-64 md:h-72 flex-shrink-0 cursor-pointer"
      whileHover={{
        scale: 1.05,
        zIndex: 30,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.75)] bg-[#0d1420] border border-white/10 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,234,100,0.25)] hover:border-[#00ea64]/40">
        <img
          src={src}
          alt={`Showcase ${index + 1}`}
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};
