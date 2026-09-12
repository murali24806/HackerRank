import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../api';
import { FaCode, FaLaptopCode, FaFire, FaShieldAlt, FaBrain } from 'react-icons/fa';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchEvents().then(data => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'laptop':
        return <FaLaptopCode size={20} />;
      case 'fire':
        return <FaFire size={20} />;
      case 'shield':
        return <FaShieldAlt size={20} />;
      case 'brain':
        return <FaBrain size={20} />;
      default:
        return <FaCode size={20} />;
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < events.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="events" className="events section-padding dark-bg">
      <div className="container">
        <div className="events-header-wrap reveal active">
          <div>
            <span className="eyebrow-tag">Calendar of Contests</span>
            <h2 className="section-title text-left">Upcoming Events</h2>
            <p className="section-subtitle text-left">
              Sharpen your logic and solve algorithmic challenges alongside VIIT's finest coders.
            </p>
          </div>

          <div className="slider-controls">
            <span className="slide-hint">&larr; slide &rarr;</span>
            <button
              className="slider-arrow"
              onClick={handlePrev}
              aria-label="Previous event"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="slider-arrow"
              onClick={handleNext}
              aria-label="Next event"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Interactive Expanding Selector Accordion */}
        <div className="events-interactive-selector reveal active" id="events-interactive-container">
          {events.map((event, index) => (
            <div
              key={event._id || event.id || index}
              className={`event-option ${index === activeIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url('${event.image}')` }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIndex(index);
              }}
            >
              <div className="event-option-shadow"></div>

              <div className="event-option-badge">
                <span className="badge-month">{event.month}</span>
                <span className="badge-day">{event.day}</span>
              </div>

              <div className="event-option-label">
                <div className="event-option-icon">
                  {getIcon(event.iconType)}
                </div>
                <div className="event-option-info">
                  <div className="event-option-tag">
                    {event.tag} &bull; {event.prize}
                  </div>
                  <div className="event-option-main">{event.title}</div>
                  <div className="event-option-sub">{event.description}</div>
                  <div className="event-option-action">
                    <a href="#contact" className="btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                      Register Now &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
