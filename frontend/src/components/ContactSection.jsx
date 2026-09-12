import React, { useState } from 'react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:hackerrank.viit@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg)' }}>
      
      {/* Light Ambient Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(92, 59, 254, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header text-center reveal active" style={{ marginBottom: '60px' }}>
          <span className="eyebrow-tag" style={{ border: '1px solid rgba(92, 59, 254, 0.3)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '15px', background: 'rgba(92, 59, 254, 0.05)' }}>Get In Touch</span>
          <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '15px', color: 'var(--color-text)' }}>Let's Build Together</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            Have questions about upcoming hackathons, or want to collaborate with the HackerRank VIIT Chapter? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-wrapper reveal active" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Left Column: Contact Info (Light Glass) */}
          <div className="contact-info" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              backdropFilter: 'blur(20px) saturate(150%)', 
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 1)', 
              borderRadius: '24px', 
              padding: '45px 40px', 
              boxShadow: 'var(--glass-shadow)', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', background: 'var(--color-primary)', borderRadius: '14px', color: '#fff', fontSize: '1.2rem', boxShadow: '0 10px 20px var(--color-primary-glow)' }}>✦</div>
                  Contact Info
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                  
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid rgba(92, 59, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>📍</div>
                    <div>
                      <h4 style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: '4px', fontWeight: '600' }}>Location</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>VIIT Campus<br/>Duvvada, Visakhapatnam</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid rgba(92, 59, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>✉️</div>
                    <div>
                      <h4 style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: '4px', fontWeight: '600' }}>Email</h4>
                      <a href="mailto:hackerrank.viit@gmail.com" style={{ color: 'var(--color-primary)', fontSize: '1.05rem', textDecoration: 'none', fontWeight: '600', transition: 'opacity 0.2s ease' }} onMouseOver={(e)=>e.target.style.opacity=0.8} onMouseOut={(e)=>e.target.style.opacity=1}>hackerrank.viit@gmail.com</a>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <h4 style={{ color: 'var(--color-text-subtle)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', fontWeight: '600' }}>Connect with us</h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href="https://www.linkedin.com/company/hackerrank-oncampus-chapter-viit/" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--color-bg)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease' }} onMouseOver={(e)=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)'}} onMouseOut={(e)=>{e.currentTarget.style.background='var(--color-bg)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'}}>
                    LinkedIn <span style={{ opacity: 0.4 }}>↗</span>
                  </a>
                  <a href="https://www.instagram.com/hackerrank_viit?stkn=MTFjNzJ2andxdWh0dw==" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--color-bg)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease' }} onMouseOver={(e)=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)'}} onMouseOut={(e)=>{e.currentTarget.style.background='var(--color-bg)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'}}>
                    Instagram <span style={{ opacity: 0.4 }}>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (Light Glass) */}
          <div className="contact-form-container" style={{ 
            flex: '1 1 500px', 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(20px) saturate(150%)', 
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 1)', 
            borderRadius: '24px', 
            padding: '45px 40px', 
            boxShadow: 'var(--glass-shadow)', 
            position: 'relative' 
          }}>
            
            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '35px', fontWeight: '700' }}>Send a message</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Your Name <span style={{ color: 'var(--color-primary)' }}>*</span></label>
                  <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required 
                    style={{ width: '100%', padding: '16px 20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px var(--color-primary-glow)'; }} 
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                  />
                </div>
                
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Email Address <span style={{ color: 'var(--color-primary)' }}>*</span></label>
                  <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    style={{ width: '100%', padding: '16px 20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px var(--color-primary-glow)'; }} 
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>How can we help? <span style={{ color: 'var(--color-primary)' }}>*</span></label>
                <textarea placeholder="Tell us about your query..." value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required 
                  style={{ width: '100%', padding: '16px 20px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', resize: 'vertical', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px var(--color-primary-glow)'; }} 
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                ></textarea>
              </div>

              <button type="submit" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  marginTop: '15px', 
                  width: '100%', 
                  padding: '18px', 
                  background: 'var(--color-primary)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '16px', 
                  fontSize: '1.1rem', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isHovered ? '0 15px 30px var(--color-primary-glow)' : '0 10px 20px rgba(92, 59, 254, 0.2)',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                Send Message
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(6px)' : 'translateX(0)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
