import React from 'react';
import FluidExpandingGrid from './ui/fluid-expanding-grid';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Modern High-Tech Animated Background */}
      <div className="hero-bg-grid"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-overlay"></div>

      <div className="hero-content reveal active">
        <div className="hero-badge">
          <span className="pulse-dot"></span>
          <span>Official On Campus Chapter • VIIT Visakhapatnam</span>
        </div>

        <h1 className="glitch" data-text="CODE. COMPETE. CONQUER.">
          CODE. COMPETE. CONQUER.
        </h1>

        <p className="hero-desc">
          Where ideas become code, challenges become skills, and coders become problem solvers.
        </p>

        <div className="hero-buttons">
          <a href="#events" className="btn-primary">
            Explore Events <span className="arrow">&rarr;</span>
          </a>
          <a href="#highlights" className="btn-secondary">
            View Highlights
          </a>
        </div>

        {/* ── Fluid Expanding Club Image Grid ── */}
        <FluidExpandingGrid />

      </div>
    </section>
  );
}
