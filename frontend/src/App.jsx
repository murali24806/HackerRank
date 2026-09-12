import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChapterHighlights from './components/ChapterHighlights';
import UpcomingEvents from './components/UpcomingEvents';
import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import AnnouncementsMarquee from './components/AnnouncementsMarquee';

const isAdmin = window.location.pathname === '/admin';

export default function App() {
  if (isAdmin) return <AdminPanel />;

  return (
    <div className="app-root">
      {/* Background Animated Gradients */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* Navigation Bar */}
      <Navbar />

      <main>
        {/* Scrolling Announcements */}
        <AnnouncementsMarquee />

        {/* Hero Section */}
        <Hero />

        {/* Chapter Highlights Banner */}
        <ChapterHighlights />

        {/* Upcoming Events: Interactive Accordion Selector */}
        <UpcomingEvents />

        {/* Leadership: Winding Curve Animated Team Path */}
        <TeamSection />

        {/* Glowing Divider */}
        <div className="divider-wrapper container reveal active">
          <div className="neon-line-divider">
            <span className="divider-center-icon">&lt; / &gt;</span>
          </div>
        </div>

        {/* Event Photos Gallery & Lightbox */}
        <GallerySection />

        {/* Student Hub: Resources, Coding Platforms, Notes, Road Map */}
        <ResourcesSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Chapter Footer */}
      <Footer />
    </div>
  );
}
