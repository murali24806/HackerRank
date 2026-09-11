import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const DEMO_IMAGES = [
  "https://cdn.21st.dev/assets/mirror/9c/9c0892e59c262cc1da34c88d977221da3f36aaef35ede7924d66b80c219be979.jpg",
  "https://cdn.21st.dev/assets/mirror/cb/cb5e5ebf2a894b2cd0e47b41b1fc76a3021ca1e2d2164e68aedca123cd33144f.jpg",
  "https://cdn.21st.dev/assets/mirror/98/989f6e3fb1763ee781695ca8471c7b5c34ee8162b73cb966a692df7183434dd6.jpg",
  "https://cdn.21st.dev/assets/mirror/d4/d42e2bf7d2616d0f8b7133f77efbc40bfbd042fbe5dd5e2ae3bb0b0cd5bf0b00.jpg",
  "https://cdn.21st.dev/assets/mirror/34/34ec840fc286ece83ac48705cb38c8b7bfae31022d3869530edad1e1b1305933.jpg",
  "https://cdn.21st.dev/assets/mirror/3a/3ad7469aaf0ee239cd4a79d5cbd089e88ee36def81eff12b76288139985a8bea.jpg",
  "https://cdn.21st.dev/assets/mirror/82/82d335fc097e30d74dc1b664327e735c0c2c01f807575623c72e2379f3bb3ae6.jpg",
  "https://cdn.21st.dev/assets/mirror/d5/d55bd9d62a8a40170fdb1bab434888bb28c9f11cf7d20bd6dcbe3befe8077abe.jpg",
];

export const AnimatedImageMarquee = ({
  images = DEMO_IMAGES,
  speed = 30,
  className,
}) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden h-full flex items-stretch", className)}
    >
      {/* Dual tracks for seamless infinite loop */}
      <motion.div
        className="flex shrink-0 gap-4 items-stretch"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {images.map((src, index) => (
          <MarqueeCard key={`a-${index}`} src={src} index={index} />
        ))}
      </motion.div>

      <motion.div
        className="flex shrink-0 gap-4 items-stretch"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {images.map((src, index) => (
          <MarqueeCard key={`b-${index}`} src={src} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeCard = ({ src, index }) => (
  <div className="relative flex-shrink-0 w-36 sm:w-44 md:w-52 h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1420]">
    <img
      src={src}
      alt={`Moment ${index + 1}`}
      className="w-full h-full object-cover select-none pointer-events-none"
      loading="lazy"
    />
  </div>
);
