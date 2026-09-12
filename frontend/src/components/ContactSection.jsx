import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding dark-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header text-center reveal active">
          <span className="eyebrow-tag">Get In Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have questions about an upcoming event, or want to collaborate with the HackerRank VIIT Chapter? Reach out to us!
          </p>
        </div>

        <div className="contact-grid reveal active" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          
          {/* Contact Info Card */}
          <div className="contact-card" style={{ background: '#121824', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Chapter Information</h3>
            <ul style={{ listStyle: 'none', padding: '0', color: '#a0aec0', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#00EA6A' }}>📍</span>
                <span>Vignan's Institute of Information Technology (VIIT)<br/>Duvvada, Visakhapatnam, AP, India</span>
              </li>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#00EA6A' }}>✉️</span>
                <a href="mailto:hackerrank@vignan.ac.in" style={{ color: '#a0aec0', textDecoration: 'none' }}>hackerrank@vignan.ac.in</a>
              </li>
              <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#00EA6A' }}>📱</span>
                <span>+91 XXXXX XXXXX (Chapter Lead)</span>
              </li>
            </ul>

            <div className="social-pills" style={{ marginTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href="https://www.linkedin.com/company/hackerrank-oncampus-chapter-viit/" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', color: '#fff', textDecoration: 'none', transition: 'background 0.3s ease' }}>LinkedIn</a>
              <a href="https://www.instagram.com/hackerrank_viit?stkn=MTFjNzJ2andxdWh0dw==" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', color: '#fff', textDecoration: 'none', transition: 'background 0.3s ease' }}>Instagram</a>
            </div>
          </div>

          {/* Quick Registration / Inquiry Form Placeholder */}
          <div className="contact-card" style={{ background: '#121824', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Send an Inquiry</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We will get back to you soon."); }}>
              <input type="text" placeholder="Your Name" required style={{ padding: '12px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              <input type="email" placeholder="Your Email" required style={{ padding: '12px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              <textarea placeholder="Message / Event Registration Query" rows="4" required style={{ padding: '12px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
              <button type="submit" className="btn-primary" style={{ marginTop: '10px', alignSelf: 'flex-start', border: 'none', cursor: 'pointer' }}>Send Message</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
