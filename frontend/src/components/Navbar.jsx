import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'highlights', 'events', 'team', 'gallery', 'resources'];
      const scrollPos = window.scrollY + 140;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'nav-scrolled' : ''}`} id="navbar">
      <div class="nav-container">
        <a href="#home" className="logo">
          <img src="/assets/images/logo.jpeg" alt="HackerRank VIIT Logo" />
          <div className="logo-text">
            <span className="brand-name">HackerRank</span>
            <span className="chapter-badge">VIIT CHAPTER</span>
          </div>
        </a>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="nav-links">
          <li>
            <a
              href="#home"
              className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#highlights"
              className={`nav-item ${activeSection === 'highlights' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Highlights
            </a>
          </li>
          <li>
            <a
              href="#events"
              className={`nav-item ${activeSection === 'events' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="#team"
              className={`nav-item ${activeSection === 'team' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Our Team
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`nav-item ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#resources"
              className="btn-primary nav-cta"
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </a>
          </li>
        </ul>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          id="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}
