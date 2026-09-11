import React, { useState, useEffect } from 'react';
import './AnnouncementsMarquee.css';

export default function AnnouncementsMarquee() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAnnouncements(data);
      })
      .catch(console.error);
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="announcements-wrapper">
      <div className="announcements-label">📢 LATEST</div>
      <div className="marquee-container">
        <div className="marquee-content">
          {announcements.map((ann, idx) => (
            <span key={ann._id || idx} className="announcement-item">
              <span className="announcement-text">{ann.text}</span>
              {ann.link && (
                <a href={ann.link} target="_blank" rel="noopener noreferrer" className="announcement-link">
                  [Read More]
                </a>
              )}
              <span className="separator">•</span>
            </span>
          ))}
          {/* Duplicate for seamless scrolling */}
          {announcements.map((ann, idx) => (
            <span key={`dup-${ann._id || idx}`} className="announcement-item">
              <span className="announcement-text">{ann.text}</span>
              {ann.link && (
                <a href={ann.link} target="_blank" rel="noopener noreferrer" className="announcement-link">
                  [Read More]
                </a>
              )}
              <span className="separator">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
