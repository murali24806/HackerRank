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
    <section id="contact" className="section-padding dark-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Premium Ambient Background Effects */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 234, 106, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 106, 255, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header text-center reveal active" style={{ marginBottom: '60px' }}>
          <span className="eyebrow-tag" style={{ border: '1px solid rgba(0, 234, 106, 0.3)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', color: '#00EA6A', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '15px', background: 'rgba(0, 234, 106, 0.05)' }}>Get In Touch</span>
          <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '15px', background: 'linear-gradient(90deg, #fff, #a0aec0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Let's Build Together</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: '#8b9bb4', lineHeight: '1.6' }}>
            Have questions about upcoming hackathons, or want to collaborate with the HackerRank VIIT Chapter? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-wrapper reveal active" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Left Column: Contact Info */}
          <div className="contact-info" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'rgba(18, 24, 36, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', height: '100%' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'rgba(0, 234, 106, 0.1)', borderRadius: '10px', color: '#00EA6A', fontSize: '1.2rem' }}>✦</span>
                Contact Information
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📍</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '5px', fontWeight: '600' }}>Location</h4>
                    <p style={{ color: '#8b9bb4', fontSize: '0.95rem', lineHeight: '1.6' }}>Vignan's Institute of Information Technology (VIIT)<br/>Duvvada, Visakhapatnam, AP</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>✉️</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '5px', fontWeight: '600' }}>Email</h4>
                    <a href="mailto:hackerrank.viit@gmail.com" style={{ color: '#00EA6A', fontSize: '0.95rem', textDecoration: 'none', fontWeight: '500', transition: 'opacity 0.2s ease' }} onMouseOver={(e)=>e.target.style.opacity=0.8} onMouseOut={(e)=>e.target.style.opacity=1}>hackerrank.viit@gmail.com</a>
                  </div>
                </div>

              </div>

              <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#8b9bb4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Connect with us</h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href="https://www.linkedin.com/company/hackerrank-oncampus-chapter-viit/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s ease' }} onMouseOver={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';}} onMouseOut={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}>
                    LinkedIn <span style={{ opacity: 0.5 }}>↗</span>
                  </a>
                  <a href="https://www.instagram.com/hackerrank_viit?stkn=MTFjNzJ2andxdWh0dw==" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s ease' }} onMouseOver={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';}} onMouseOut={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}>
                    Instagram <span style={{ opacity: 0.5 }}>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-container" style={{ flex: '1 1 500px', background: 'rgba(10, 14, 23, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '50px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', position: 'relative' }}>
            
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '30px', fontWeight: '600' }}>Send us a message</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: '#8b9bb4', fontWeight: '500' }}>Your Name <span style={{ color: '#00EA6A' }}>*</span></label>
                  <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required 
                    style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#00EA6A'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: '#8b9bb4', fontWeight: '500' }}>Email Address <span style={{ color: '#00EA6A' }}>*</span></label>
                  <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => e.target.style.borderColor = '#00EA6A'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: '#8b9bb4', fontWeight: '500' }}>How can we help? <span style={{ color: '#00EA6A' }}>*</span></label>
                <textarea placeholder="Tell us about your query, event registration, or collaboration idea..." value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required 
                  style={{ width: '100%', padding: '16px 18px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s ease' }}
                  onFocus={(e) => e.target.style.borderColor = '#00EA6A'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                ></textarea>
              </div>

              <button type="submit" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  marginTop: '15px', 
                  width: '100%', 
                  padding: '16px', 
                  background: isHovered ? '#00EA6A' : '#fff', 
                  color: '#0e141e', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '1.05rem', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                Send Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}>
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
