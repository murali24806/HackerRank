import React, { useState, useEffect } from 'react';
import './AnnouncementsMarquee.css';
import { fetchAnnouncements } from '../api';

export default function AnnouncementsMarquee() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements().then(data => {
      if (Array.isArray(data)) setAnnouncements(data);
    });
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="announcements-wrapper">
      <div className="announcements-label">📢 LATEST</div>
      <div className="marquee-container">
        <div className="marquee-content">
          {announcements.map((ann, idx) => (
            <span key={ann._id || idx} className="announcement-item">
              <span className="announcement-text">{ann.title || ann.text}</span>
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
              <span className="announcement-text">{ann.title || ann.text}</span>
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
