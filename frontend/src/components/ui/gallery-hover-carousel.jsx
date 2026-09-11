import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./carousel";

const DEFAULT_ITEMS = [
  {
    id: "item-1",
    title: "CodeSprint 2026",
    summary:
      "Annual flagship competitive programming contest with 300+ participants competing for the top coder title.",
    url: "#gallery",
    tag: "Contest",
    image: "/assets/images/gallery1.jpg",
  },
  {
    id: "item-2",
    title: "DSA Intensive Workshop",
    summary:
      "Deep dive problem-solving session covering dynamic programming, trees, and advanced graph algorithms.",
    url: "#gallery",
    tag: "Workshop",
    image: "/assets/images/gallery2.jpg",
  },
  {
    id: "item-3",
    title: "Alumni AMA & Tech Talk",
    summary:
      "Engineers from Google, Amazon & Microsoft share FAANG interview preparation strategies and career advice.",
    url: "#gallery",
    tag: "Alumni",
    image: "/assets/images/gallery3.jpg",
  },
  {
    id: "item-4",
    title: "Hackathon Champions",
    summary:
      "VIIT winners celebrating their victory with championship trophies, prize pool distribution, and certificates.",
    url: "#gallery",
    tag: "Triumph",
    image: "/assets/images/gallery4.jpg",
  },
  {
    id: "item-5",
    title: "Campus Coding Marathon",
    summary:
      "24-hour overnight code marathon tackling real-world algorithmic problems with peer collaboration.",
    url: "#gallery",
    tag: "Marathon",
    image: "/assets/images/event3.jpg",
  },
  {
    id: "item-6",
    title: "Project Innovation Showcase",
    summary:
      "Students demonstrating full-stack applications, open-source projects, and autonomous algorithmic systems.",
    url: "#gallery",
    tag: "Showcase",
    image: "/assets/images/event1.jpg",
  },
];

export default function GalleryHoverCarousel({
  heading = "Visual Archives",
  subtitle = "A glimpse into our high-energy hackathons, coding sprints, and campus triumphs.",
  items = DEFAULT_ITEMS,
  onItemClick,
}) {
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <div className="gallery-hover-carousel-wrapper">
      {/* Scoped CSS for the exact hover animation requested */}
      <style>{`
        .gallery-hover-carousel-wrapper {
          width: 100%;
          position: relative;
          box-sizing: border-box;
        }

        .ghc-header {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .ghc-header {
            flex-direction: row;
            align-items: flex-end;
            margin-bottom: 36px;
          }
        }

        .ghc-header-text {
          max-width: 680px;
        }

        .ghc-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--color-primary, #5c3bfe);
          margin-bottom: 6px;
          font-family: var(--font-code, monospace);
        }

        .ghc-title {
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--color-text, #111827);
          margin: 0 0 8px;
        }

        .ghc-subtitle {
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          color: var(--color-text-dim, #6b7280);
          line-height: 1.55;
          margin: 0;
        }

        .ghc-nav-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .ghc-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(92, 59, 254, 0.2);
          background: var(--color-surface, #ffffff);
          color: var(--color-text, #111827);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ghc-nav-btn:hover:not(:disabled) {
          background: var(--color-primary, #5c3bfe);
          color: #ffffff;
          border-color: var(--color-primary, #5c3bfe);
          box-shadow: 0 4px 16px rgba(92, 59, 254, 0.3);
          transform: translateY(-2px);
        }

        .ghc-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }

        /* ── Strict Horizontal Carousel Alignment ── */
        .carousel-root {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .carousel-viewport {
          display: flex !important;
          flex-direction: row !important;
          width: 100% !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-behavior: smooth !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          padding: 8px 4px 20px 4px !important;
          scroll-snap-type: x proximity;
        }

        .carousel-viewport::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
        }

        .carousel-track {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: stretch !important;
          gap: 24px !important;
          width: max-content !important;
          min-width: 100% !important;
        }

        .carousel-item {
          flex: 0 0 auto !important;
          flex-shrink: 0 !important;
          display: block !important;
          scroll-snap-align: start;
        }

        /* ── Card Styling & Dimensions ── */
        .ghc-card-link {
          display: block;
          position: relative;
          width: 340px;
          height: 420px;
          text-decoration: none;
          color: inherit;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .ghc-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #0f172a;
          border: 1px solid rgba(92, 59, 254, 0.15);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .ghc-card-link:hover .ghc-card,
        .ghc-card-link:focus-visible .ghc-card {
          border-color: var(--color-primary, #5c3bfe);
          box-shadow: 0 16px 40px rgba(92, 59, 254, 0.22);
          transform: translateY(-4px);
        }

        /* 1. Image container shrinks from 100% to 50% on hover */
        .ghc-img-container {
          position: relative;
          width: 100%;
          height: 100%;
          transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .ghc-card-link:hover .ghc-img-container,
        .ghc-card-link:focus .ghc-img-container {
          height: 50%;
        }

        .ghc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ghc-card-link:hover .ghc-img,
        .ghc-card-link:focus .ghc-img {
          transform: scale(1.06);
        }

        /* Category badge */
        .ghc-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          z-index: 2;
          font-family: var(--font-code, monospace);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        /* Title chip visible on resting state */
        .ghc-title-chip {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: 8px 12px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 0.86rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          z-index: 2;
        }

        .ghc-card-link:hover .ghc-title-chip,
        .ghc-card-link:focus .ghc-title-chip {
          opacity: 0;
          transform: translateY(8px);
        }

        /* 2. Fade overlay at bottom of image */
        .ghc-img-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .ghc-card-link:hover .ghc-img-fade,
        .ghc-card-link:focus .ghc-img-fade {
          opacity: 1;
        }

        /* 3. Text description section expands from bottom on hover */
        .ghc-text-section {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          padding: 0 20px;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(92, 59, 254, 0.12);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .ghc-card-link:hover .ghc-text-section,
        .ghc-card-link:focus .ghc-text-section {
          height: 50%;
          opacity: 1;
          padding: 16px 20px;
        }

        .ghc-item-title {
          font-size: 1.10rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px;
          line-height: 1.3;
        }

        .ghc-item-summary {
          font-size: 0.82rem;
          color: #4b5563;
          line-height: 1.45;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* 4. Action arrow button rotates -45deg on hover */
        .ghc-arrow-btn {
          position: absolute;
          bottom: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-surface, #ffffff);
          border: 1px solid rgba(92, 59, 254, 0.25);
          color: var(--color-primary, #5c3bfe);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(92, 59, 254, 0.15);
        }

        .ghc-card-link:hover .ghc-arrow-btn,
        .ghc-card-link:focus .ghc-arrow-btn {
          transform: rotate(-45deg);
          background: var(--color-primary, #5c3bfe);
          color: #ffffff;
          border-color: var(--color-primary, #5c3bfe);
        }

        /* ── Responsive: Tablet Breakpoint (<= 768px) ── */
        @media (max-width: 768px) {
          .ghc-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
          }

          .ghc-card-link {
            width: 280px;
            height: 380px;
          }

          .carousel-track {
            gap: 16px !important;
          }

          .ghc-card {
            border-radius: 20px;
          }

          .ghc-item-title {
            font-size: 1.02rem;
          }
        }

        /* ── Responsive: Mobile Phone Breakpoint (<= 480px) ── */
        @media (max-width: 480px) {
          .ghc-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 18px;
          }

          .ghc-nav-buttons {
            align-self: flex-end;
          }

          .ghc-nav-btn {
            width: 36px;
            height: 36px;
          }

          .ghc-title {
            font-size: 1.5rem;
          }

          .ghc-subtitle {
            font-size: 0.85rem;
          }

          /* Fluid mobile card sizing with peek-through for next slide */
          .ghc-card-link {
            width: calc(84vw - 16px);
            max-width: 290px;
            min-width: 230px;
            height: 350px;
          }

          .carousel-track {
            gap: 12px !important;
          }

          .ghc-card {
            border-radius: 18px;
          }

          .ghc-badge {
            top: 10px;
            left: 10px;
            font-size: 0.62rem;
            padding: 3px 8px;
          }

          .ghc-title-chip {
            bottom: 10px;
            left: 10px;
            right: 10px;
            font-size: 0.80rem;
            padding: 6px 10px;
          }

          .ghc-item-title {
            font-size: 0.96rem;
          }

          .ghc-item-summary {
            font-size: 0.76rem;
            line-height: 1.4;
          }

          /* Mobile Touch: tap/active also reveals text section */
          .ghc-card-link:active .ghc-img-container {
            height: 50%;
          }

          .ghc-card-link:active .ghc-text-section {
            height: 50%;
            opacity: 1;
            padding: 12px 14px;
          }

          .ghc-card-link:active .ghc-title-chip {
            opacity: 0;
          }

          .ghc-card-link:active .ghc-arrow-btn {
            transform: rotate(-45deg);
            background: var(--color-primary, #5c3bfe);
            color: #ffffff;
          }
        }
      `}</style>

      {/* ── Section Header with Title & Navigation Controls ── */}
      <div className="ghc-header">
        <div className="ghc-header-text">
          <span className="ghc-eyebrow">Visual Archives</span>
          <h2 className="ghc-title">{heading}</h2>
          <p className="ghc-subtitle">{subtitle}</p>
        </div>

        <div className="ghc-nav-buttons">
          <button
            type="button"
            className="ghc-nav-btn"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="ghc-nav-btn"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Carousel Slider ── */}
      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent className="w-full">
          {items.map((item) => (
            <CarouselItem key={item.id || item._id}>
              <a
                href={item.url || "#gallery"}
                className="ghc-card-link"
                onClick={(e) => {
                  if (onItemClick) {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }}
              >
                <div className="ghc-card">
                  {/* Image container: shrinks to 50% on hover */}
                  <div className="ghc-img-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="ghc-img"
                      loading="lazy"
                    />
                    {item.tag && <span className="ghc-badge">{item.tag}</span>}
                    <div className="ghc-img-fade" />
                    <div className="ghc-title-chip">
                      <span>{item.title}</span>
                    </div>
                  </div>

                  {/* Text Section: expands into bottom 50% on hover */}
                  <div className="ghc-text-section">
                    <h3 className="ghc-item-title">{item.title}</h3>
                    <p className="ghc-item-summary">{item.summary || item.description}</p>
                    <div className="ghc-arrow-btn">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
