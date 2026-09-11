"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PhotoGallery = ({
  animationDelay = 0.35,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.35) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const scale = isMobile ? 0.48 : isTablet ? 0.75 : 1;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const photos = [
    {
      id: 1,
      order: 0,
      x: -315,
      y: 18,
      w: 175,
      h: 245,
      rotate: -1.5,
      zIndex: 20,
      direction: "left" as const,
      src: "https://cdn.21st.dev/assets/mirror/57/57332c2066d3283d7c8b8fb7d1f2b4fb6fe692e6d770884ca969cf986ecb420c.jpg",
      alt: "Couple at historical ruins",
    },
    {
      id: 2,
      order: 1,
      x: -165,
      y: 35,
      w: 220,
      h: 155,
      rotate: 2.5,
      zIndex: 35,
      direction: "left" as const,
      src: "https://cdn.21st.dev/assets/mirror/2a/2ab6ce934d6bf8516dda60e58fad804ac2197ee86111687dae55c72b0040d161.jpg",
      alt: "Sea fortress view",
    },
    {
      id: 3,
      order: 2,
      x: 0,
      y: 42,
      w: 240,
      h: 260,
      rotate: -1,
      zIndex: 50,
      direction: "right" as const,
      src: "https://cdn.21st.dev/assets/mirror/05/05e8cb2f9105f8b6b5a600e3bf99a9a3f354d4a427f2fa533526cea2cb00e00c.jpg",
      alt: "Portrait with heart light",
    },
    {
      id: 4,
      order: 3,
      x: 175,
      y: 32,
      w: 230,
      h: 160,
      rotate: -2.8,
      zIndex: 35,
      direction: "right" as const,
      src: "https://cdn.21st.dev/assets/mirror/44/44bcf2a8cafad29f508d198ab98cae0f6cf50acbc1326a36bf864f2e86f6a89e.jpg",
      alt: "Couple overlooking mountains",
    },
    {
      id: 5,
      order: 4,
      x: 325,
      y: 22,
      w: 175,
      h: 245,
      rotate: 2,
      zIndex: 20,
      direction: "left" as const,
      src: "https://cdn.21st.dev/assets/mirror/8d/8d0a29816b1faeb5946abe01b3bfbf0637c4ef2aa2595d9896a738a4db137ebf.jpg",
      alt: "Peacock wildlife closeup",
    },
  ];

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 0.95,
      opacity: 0,
    }),
    visible: (custom: { x: number; y: number; rotate: number; order: number }) => ({
      x: custom.x * scale,
      y: custom.y * scale,
      rotate: custom.rotate,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.12,
      },
    }),
  };

  return (
    <div className="hero-photo-gallery relative w-full my-8 select-none">
      <div className="absolute inset-0 max-md:hidden -top-6 -z-10 h-[340px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <p className="text-center text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-slate-400 mb-2">
        A JOURNEY THROUGH VISUAL STORIES
      </p>

      <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
        Welcome to My <span className="text-rose-500 drop-shadow-[0_0_18px_rgba(244,63,94,0.45)]">Stories</span>
      </h2>

      <div className="relative mb-6 h-[270px] sm:h-[300px] md:h-[320px] w-full flex items-center justify-center">
        <motion.div
          className="relative mx-auto flex w-full max-w-6xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[260px] w-[240px]">
              {[...photos]
                .sort((a, b) => a.zIndex - b.zIndex)
                .map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ zIndex: photo.zIndex }}
                    variants={photoVariants}
                    custom={{
                      x: photo.x,
                      y: photo.y,
                      rotate: photo.rotate,
                      order: photo.order,
                    }}
                  >
                    <PhotoCard
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.w * scale}
                      height={photo.h * scale}
                      direction={photo.direction}
                      defaultRotate={photo.rotate}
                    />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex w-full justify-center mt-2">
        <a href="#gallery">
          <Button className="rounded-full px-7 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-[0_4px_16px_rgba(244,63,94,0.35)] transition-all hover:scale-105 active:scale-95">
            View All Stories
          </Button>
        </a>
      </div>
    </div>
  );
};

export const PhotoCard = ({
  src,
  alt,
  width,
  height,
  direction = "left",
  defaultRotate = 0,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  direction?: "left" | "right";
  defaultRotate?: number;
}) => {
  const x = useMotionValue(width / 2);
  const y = useMotionValue(height / 2);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(width / 2);
    y.set(height / 2);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{
        scale: 1.08,
        rotateZ: defaultRotate + 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_15px_35px_rgba(0,0,0,0.7)] bg-[#0f172a] border border-white/10 transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
        <img
          className="rounded-[26px] object-cover w-full h-full pointer-events-none select-none"
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
