import React, { useState, useEffect } from 'react';

export default function AnnouncementsScroller() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(console.error);
  }, []);

  // Duplicate list items for seamless continuous -50% loop from bottom to top
  // If API fails or is empty, provide a fallback to avoid breaking layout
  const displayItems = announcements.length > 0 ? announcements : [{ _id: 'fallback', title: 'No new announcements yet.', tag: 'INFO', tagColor: '#3b82f6', time: 'Now', link: '#' }];
  const loopItems = [...displayItems, ...displayItems];

  return (
    <div className="announcements-scroller-card">
      <style>{`
        .announcements-scroller-card {
          flex: 0 0 24%;
          position: relative;
          height: 250px;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(145deg, #006ce6 0%, #0047b3 100%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 12px 36px rgba(0, 108, 230, 0.28);
          display: flex;
          flex-direction: column;
          padding: 14px 12px;
          box-sizing: border-box;
          user-select: none;
        }

        /* Card Header */
        .ann-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          margin-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          flex-shrink: 0;
          z-index: 3;
        }

        .ann-header-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ann-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: annPulse 1.8s ease-in-out infinite;
        }

        @keyframes annPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.85);
          }
        }

        .ann-title {
          font-family: var(--font-display, inherit);
          font-size: 0.88rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .ann-live-badge {
          font-family: var(--font-code, monospace);
          font-size: 0.60rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Scrolling Viewport with Top & Bottom Fade Masks */
        .ann-scroll-viewport {
          flex: 1;
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        /* Continuous Bottom-to-Top Marquee */
        .ann-scroll-track {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: scrollUpLoop 20s linear infinite;
        }

        .ann-scroll-viewport:hover .ann-scroll-track,
        .ann-scroll-viewport:active .ann-scroll-track {
          animation-play-state: paused;
        }

        @keyframes scrollUpLoop {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        /* Individual Announcement Item */
        .ann-item {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          padding: 8px 10px;
          text-decoration: none;
          color: #ffffff;
          display: block;
          transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
        }

        .ann-item:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateX(3px);
        }

        .ann-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .ann-item-tag {
          font-family: var(--font-code, monospace);
          font-size: 0.60rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.3px;
        }

        .ann-item-time {
          font-size: 0.60rem;
          color: rgba(255, 255, 255, 0.75);
        }

        .ann-item-text {
          font-size: 0.74rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.35;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Bottom Status Indicator */
        .ann-footer-hint {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 6px;
          margin-top: 4px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.7);
          flex-shrink: 0;
        }

        .ann-footer-hint span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── Mobile Viewport Adaptations ── */
        @media (max-width: 768px) {
          .announcements-scroller-card {
            flex: 0 0 27%;
            height: 155px;
            border-radius: 12px;
            padding: 8px 7px;
          }

          .ann-header {
            padding-bottom: 4px;
            margin-bottom: 4px;
          }

          .ann-pulse-dot {
            width: 6px;
            height: 6px;
          }

          .ann-title {
            font-size: 0.66rem;
            letter-spacing: 0.2px;
          }

          .ann-live-badge {
            font-size: 0.50rem;
            padding: 1px 4px;
          }

          .ann-scroll-track {
            gap: 5px;
            animation-duration: 16s;
          }

          .ann-item {
            padding: 5px 6px;
            border-radius: 6px;
          }

          .ann-item-top {
            margin-bottom: 2px;
          }

          .ann-item-tag {
            font-size: 0.52rem;
            padding: 0 4px;
          }

          .ann-item-time {
            display: none;
          }

          .ann-item-text {
            font-size: 0.60rem;
            line-height: 1.25;
            -webkit-line-clamp: 2;
          }

          .ann-footer-hint {
            display: none;
          }
        }
      `}</style>

      {/* Header Bar */}
      <div className="ann-header">
        <div className="ann-header-left">
          <span className="ann-pulse-dot"></span>
          <span className="ann-title">Announcements</span>
        </div>
        <span className="ann-live-badge">Live</span>
      </div>

      {/* Smooth Bottom-to-Top Scroller Viewport */}
      <div className="ann-scroll-viewport">
        <div className="ann-scroll-track">
          {loopItems.map((item, idx) => (
            <a
              key={`${item._id || item.id}-${idx}`}
              href={item.link || '#'}
              className="ann-item"
            >
              <div className="ann-item-top">
                <span
                  className="ann-item-tag"
                  style={{
                    backgroundColor: `${item.tagColor}35`,
                    color: '#ffffff',
                    border: `1px solid ${item.tagColor}80`,
                  }}
                >
                  {item.tag}
                </span>
                <span className="ann-item-time">{item.time}</span>
              </div>
              <p className="ann-item-text">{item.title || item.text}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Hint */}
      <div className="ann-footer-hint">
        <span>▲ Auto-scrolling</span>
        <span>Hover to pause</span>
      </div>
    </div>
  );
}
