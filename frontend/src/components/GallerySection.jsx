import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../api';
import GalleryHoverCarousel from './ui/gallery-hover-carousel';

export default function GallerySection() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    fetchGallery().then(data => {
      if (data && data.length > 0) setGallery(data);
    });
  }, []);

  const itemsToDisplay = gallery && gallery.length > 0 ? gallery : [];
  const filteredItems = filter === 'all'
    ? itemsToDisplay
    : itemsToDisplay.filter(item => item.category === filter);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleItemClick = (item) => {
    // If driveLink exists, open it in a new tab
    if (item.driveLink) {
      window.open(item.driveLink, '_blank', 'noopener,noreferrer');
    } else {
      setActiveModalItem(item);
    }
  };

  return (
    <>
      <section id="gallery" className="gallery section-padding dark-bg">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="gallery-filters reveal active" style={{ marginBottom: '24px' }}>
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Photos</button>
            <button className={`filter-btn ${filter === 'hackathons' ? 'active' : ''}`} onClick={() => setFilter('hackathons')}>Hackathons</button>
            <button className={`filter-btn ${filter === 'workshops' ? 'active' : ''}`} onClick={() => setFilter('workshops')}>Workshops</button>
            <button className={`filter-btn ${filter === 'celebrations' ? 'active' : ''}`} onClick={() => setFilter('celebrations')}>Celebrations</button>
          </div>

          {/* Interactive Animated Hover Carousel */}
          <div className="reveal active">
            <GalleryHoverCarousel
              heading="Gallery (Event Photos)"
              subtitle="Hover over any card to reveal details. Click to view the full album on Google Drive."
              items={filteredItems.map((item, idx) => ({
                id: item._id || `gallery-item-${idx}`,
                title: item.title,
                summary: item.description || item.summary,
                tag: item.tag || (item.category ? item.category.toUpperCase() : 'EVENT'),
                image: item.image,
                driveLink: item.driveLink || null,
                url: item.driveLink || '#gallery',
              }))}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal — shown only when no driveLink */}
      <div className={`lightbox-modal ${activeModalItem ? 'active' : ''}`}>
        <div className="lightbox-backdrop" onClick={() => setActiveModalItem(null)} />
        {activeModalItem && (
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setActiveModalItem(null)} aria-label="Close">
              &times;
            </button>
            <img src={activeModalItem.image} alt={activeModalItem.title} loading="lazy" />
            <div className="lightbox-caption">
              <h3>{activeModalItem.title}</h3>
              <p>{activeModalItem.description || activeModalItem.summary}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
