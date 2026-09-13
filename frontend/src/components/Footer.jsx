import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/images/logo.jpeg" alt="Logo" loading="lazy" />
              <h3>HackerRank</h3>
            </div>
            <p>
              Official On Campus Chapter at Vignan's Institute of Information Technology (VIIT), Duvvada, Visakhapatnam.
            </p>
            <div className="social-pills">
              <a href="https://www.linkedin.com/company/hackerrank-oncampus-chapter-viit/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/hackerrank_viit?stkn=MTFjNzJ2andxdWh0dw==" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#highlights">Highlights</a></li>
                <li><a href="#events">Upcoming Events</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://hackerrank.com" target="_blank" rel="noopener noreferrer">HackerRank Practice</a></li>
                <li><a href="#events">Event Registrations</a></li>
                <li><a href="#about">Chapter Guidelines</a></li>
                <li><a href="#resources">Resources &amp; Roadmaps</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 HackerRank On Campus Chapter VIIT. Crafted with ❤️ for VIIT Coders.</p>
          <div className="footer-tag">CODE. COMPETE. CONQUER.</div>
        </div>
      </div>
    </footer>
  );
}
