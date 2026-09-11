import React from "react";

// ── Static Hero Media Grid ──────────────────────────────────────────────────
// Layout: [Image 1] [Image 2]   ← top row, equal halves
//         [   Club Video    ]   ← bottom row, full width, autoplay+muted

const MEDIA = {
  images: [
    {
      src: "/assets/images/img1.jpg",
      alt: "HackerRank VIIT",
      label: "",
    },
    {
      src: "/assets/images/img2.jpg",
      alt: "HackerRank VIIT",
      label: "",
    },
  ],
  videoSrc: "/animation.mp4",
  videoLabel: "HackerRank VIIT Chapter",
};

export function FluidExpandingGrid() {
  return (
    <div className="hero-media-wrapper">
      {/* Embedded scoped responsive styles */}
      <style>{`
        .hero-media-wrapper {
          width: 100%;
          max-width: 960px;
          margin: 38px auto 0;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
        }

        /* Top row: 2 images side-by-side */
        .hero-media-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          height: 230px;
        }

        .hero-img-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #d1d5db;
          box-shadow: 0 6px 24px rgba(92, 59, 254, 0.12);
          border: 1px solid rgba(92, 59, 254, 0.14);
        }

        .hero-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-img-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 18px 12px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Bottom video card: responsive 16:9 player */
        .hero-video-card {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #0f172a;
          box-shadow: 0 8px 32px rgba(92, 59, 254, 0.16);
          border: 1px solid rgba(92, 59, 254, 0.18);
        }

        .hero-video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .hero-video-label {
          position: absolute;
          bottom: 14px;
          left: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: none;
          z-index: 2;
        }

        .hero-video-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
          flex-shrink: 0;
        }

        .hero-label-text {
          font-family: var(--font-code, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.8px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
        }

        /* ── Tablet View (max-width: 768px) ── */
        @media (max-width: 768px) {
          .hero-media-wrapper {
            margin: 28px auto 0;
            padding: 0 12px;
            gap: 12px;
          }

          .hero-media-top-row {
            gap: 12px;
            height: 170px;
          }

          .hero-img-card,
          .hero-video-card {
            border-radius: 16px;
          }

          .hero-img-label {
            padding: 18px 12px 10px;
          }

          .hero-video-label {
            bottom: 10px;
            left: 14px;
          }

          .hero-label-text {
            font-size: 0.70rem;
            letter-spacing: 0.6px;
          }
        }

        /* ── Mobile View (max-width: 480px) ── */
        @media (max-width: 480px) {
          .hero-media-wrapper {
            margin: 20px auto 0;
            padding: 0 8px;
            gap: 10px;
          }

          .hero-media-top-row {
            gap: 8px;
            height: 120px;
          }

          .hero-img-card,
          .hero-video-card {
            border-radius: 13px;
          }

          .hero-img-label {
            padding: 14px 8px 6px;
          }

          .hero-video-label {
            bottom: 8px;
            left: 10px;
            gap: 6px;
          }

          .hero-video-dot {
            width: 6px;
            height: 6px;
          }

          .hero-label-text {
            font-size: 0.62rem;
            letter-spacing: 0.4px;
          }
        }

        /* ── Small Mobile (<= 360px) ── */
        @media (max-width: 360px) {
          .hero-media-wrapper {
            padding: 0 4px;
            gap: 8px;
          }
          .hero-media-top-row {
            height: 105px;
            gap: 6px;
          }
          .hero-label-text {
            font-size: 0.56rem;
          }
        }
      `}</style>

      {/* ── Top row: 2 images ── */}
      <div className="hero-media-top-row">
        {MEDIA.images.map((img) => (
          <div key={img.alt} className="hero-img-card">
            <img src={img.src} alt={img.alt} />
            {img.label && (
              <div className="hero-img-label">
                <span className="hero-label-text">{img.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Bottom row: autoplay animation video ── */}
      <div className="hero-video-card">
        <video
          src="/animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hero-video-player"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div className="hero-video-label">
          <span className="hero-video-dot"></span>
          <span className="hero-label-text">HackerRank VIIT Chapter</span>
        </div>
      </div>
    </div>
  );
}

export default FluidExpandingGrid;
