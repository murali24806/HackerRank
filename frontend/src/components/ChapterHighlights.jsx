import React, { useState, useEffect } from 'react';
import { fetchHighlights } from '../api';
import AnnouncementsScroller from './AnnouncementsScroller';

export default function ChapterHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchHighlights().then(data => {
      if (data && data.length > 0) setHighlights(data);
    });
  }, []);

  useEffect(() => {
    if (highlights.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <section id="highlights" className="section-padding section-compact">
      <div className="container">
        <div className="section-header reveal active">
          <span className="eyebrow-tag">Weekly Spotlight</span>
          <h2 className="section-title">Chapter Highlights</h2>
          <p className="section-subtitle">Featured flagship initiatives and core chapter campaigns.</p>
        </div>

        {/* Compact Banner Row: Main Banner (Left) + Companion Card (Right) */}
        <div className="banner-spotlight-row reveal active">
          {/* Main Slideshow Banner (Left ~76%) */}
          <div className="main-banner-card" id="slideshow-box">
            <div className="slideshow-track">
              {highlights.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="banner-content">
                    <div className="banner-brand-badge">
                      <span className="badge-brand">{slide.brand || "HackerRank"}</span>
                      <span className="badge-cross">&times;</span>
                      <span className="badge-sub">{slide.badgeSub || "VIIT CHAPTER"}</span>
                    </div>
                    <h3 className="banner-title">
                      {slide.titlePrefix || "Exclusive"}{" "}
                      <span className="text-accent">{slide.titleAccent}</span>
                    </h3>
                    <p className="banner-desc">{slide.description}</p>
                    <a href={slide.buttonLink || "#events"} className="banner-btn">
                      {slide.buttonText || "Book Now"}
                    </a>
                  </div>
                  <div className="banner-media">
                    <img src={slide.image} alt={slide.titleAccent} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="slide-indicators banner-dots" id="slide-dots">
              {highlights.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side Companion Card: Live Announcements Scroller (Bottom to Top) */}
          <AnnouncementsScroller />
        </div>
      </div>
    </section>
  );
}
