import React, { useState, useEffect, useCallback } from 'react';
import './UpdatesModal.css';
import { fetchAnnouncements } from '../api';

export default function UpdatesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load announcements
  const loadAnnouncements = useCallback(async () => {
    try {
      const data = await fetchAnnouncements();
      if (Array.isArray(data) && data.length > 0) {
        // Filter those marked for popup and active
        const popupItems = data.filter(a => a.active !== false && (a.showAsPopup === true || a.showAsPopup === undefined));
        const listToUse = popupItems.length > 0 ? popupItems : data.filter(a => a.active !== false);
        setAnnouncements(listToUse);

        // Check if user already dismissed in this session
        const dismissed = sessionStorage.getItem('hr_updates_modal_dismissed');
        if (!dismissed && listToUse.length > 0) {
          // Open popup after a smooth gentle delay on entry
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      }
    } catch (err) {
      console.warn("Could not load updates modal:", err);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();

    // Listen for custom open event (e.g. from floating button or marquee)
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-updates-modal', handleOpenModal);
    return () => window.removeEventListener('open-updates-modal', handleOpenModal);
  }, [loadAnnouncements]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem('hr_updates_modal_dismissed', 'true');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const current = announcements[currentIndex] || announcements[0];

  return (
    <>
      {/* Floating Re-open Badge Button (Always available for quick access) */}
      {announcements.length > 0 && !isOpen && (
        <button
          className="updates-floating-badge"
          onClick={() => setIsOpen(true)}
          title="View latest announcements & event registrations"
          aria-label="View Announcements"
        >
          <span className="badge-pulse-dot"></span>
          <span className="badge-icon">📢</span>
          <span className="badge-text">Updates & Events</span>
          <span className="badge-count">{announcements.length}</span>
        </button>
      )}

      {/* Popup Window */}
      {isOpen && current && (
        <div
          className="updates-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="updates-modal-title"
        >
          <div
            className="updates-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="updates-modal-ambient"></div>

            {/* Header / Top Bar */}
            <div className="updates-modal-header">
              <div className="updates-header-meta">
                <span
                  className="updates-tag"
                  style={{
                    backgroundColor: current.tagColor ? `${current.tagColor}22` : '#00ea6422',
                    color: current.tagColor || '#00ea64',
                    borderColor: current.tagColor ? `${current.tagColor}66` : '#00ea6466'
                  }}
                >
                  <span
                    className="tag-live-dot"
                    style={{ backgroundColor: current.tagColor || '#00ea64' }}
                  ></span>
                  {current.tag || 'LATEST UPDATE'}
                </span>

                {current.time && (
                  <span className="updates-time">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {current.time}
                  </span>
                )}
              </div>

              {/* Cross Close Button */}
              <button
                className="updates-close-btn"
                onClick={closeModal}
                aria-label="Close updates window"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Banner Image (if available) */}
            {current.image && (
              <div className="updates-image-wrapper">
                <img
                  src={current.image}
                  alt={current.title}
                  className="updates-banner-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="updates-img-gradient"></div>
              </div>
            )}

            {/* Content Body */}
            <div className="updates-modal-body">
              <h2 id="updates-modal-title" className="updates-title">
                {current.title}
              </h2>

              {current.description && (
                <p className="updates-desc">
                  {current.description}
                </p>
              )}

              {/* If multiple announcements exist, show pagination / carousel controls */}
              {announcements.length > 1 && (
                <div className="updates-pagination-bar">
                  <div className="updates-dots">
                    {announcements.map((_, i) => (
                      <button
                        key={i}
                        className={`updates-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to update ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="updates-nav-btns">
                    <button
                      className="updates-nav-arrow"
                      onClick={handlePrev}
                      aria-label="Previous announcement"
                    >
                      ‹
                    </button>
                    <span className="updates-counter">
                      {currentIndex + 1} / {announcements.length}
                    </span>
                    <button
                      className="updates-nav-arrow"
                      onClick={handleNext}
                      aria-label="Next announcement"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Footer */}
            <div className="updates-modal-footer">
              <button
                type="button"
                className="updates-btn-dismiss"
                onClick={closeModal}
              >
                Dismiss
              </button>

              {current.link ? (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="updates-btn-action"
                  onClick={closeModal}
                >
                  <span>{current.buttonText || 'Register Now'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  className="updates-btn-action"
                  onClick={closeModal}
                >
                  Explore Chapter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
