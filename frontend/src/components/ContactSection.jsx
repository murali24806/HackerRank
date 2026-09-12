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
    <section id="contact" className="section-padding" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#050508' }}>
      
      {/* Intense Ambient Background Orbs for Glass Refraction */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 234, 106, 0.25) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 106, 255, 0.2) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(138, 43, 226, 0.15) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header text-center reveal active" style={{ marginBottom: '50px' }}>
          <span className="eyebrow-tag" style={{ border: '1px solid rgba(255, 255, 255, 0.2)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', color: '#fff', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>Get In Touch</span>
          <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '15px', color: '#ffffff', letterSpacing: '-1px' }}>Let's Build Together</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.7', fontWeight: '400' }}>
            Have questions about upcoming hackathons, or want to collaborate with the HackerRank VIIT Chapter? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-wrapper reveal active" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Left Column: Contact Info (iPhone Frosted Glass) */}
          <div className="contact-info" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))', 
              backdropFilter: 'blur(24px) saturate(150%)', 
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.15)', 
              borderRadius: '24px', 
              padding: '40px', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', letterSpacing: '-0.5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', background: 'linear-gradient(135deg, #00EA6A, #00a84b)', borderRadius: '14px', color: '#fff', fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(0, 234, 106, 0.3)' }}>✦</div>
                  Contact Info
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)' }}>📍</div>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px', fontWeight: '600' }}>Location</h4>
                      <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.5' }}>VIIT Campus<br/>Duvvada, Visakhapatnam</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)' }}>✉️</div>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px', fontWeight: '600' }}>Email</h4>
                      <a href="mailto:hackerrank.viit@gmail.com" style={{ color: '#00EA6A', fontSize: '1rem', textDecoration: 'none', fontWeight: '600', transition: 'opacity 0.2s ease' }} onMouseOver={(e)=>e.target.style.opacity=0.8} onMouseOut={(e)=>e.target.style.opacity=1}>hackerrank.viit@gmail.com</a>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: '#e2e8f0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', fontWeight: '600' }}>Connect with us</h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href="https://www.linkedin.com/company/hackerrank-oncampus-chapter-viit/" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' }} onMouseOver={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.15)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseOut={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)'}}>
                    LinkedIn <span style={{ opacity: 0.6 }}>↗</span>
                  </a>
                  <a href="https://www.instagram.com/hackerrank_viit?stkn=MTFjNzJ2andxdWh0dw==" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' }} onMouseOver={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.15)'; e.currentTarget.style.transform='translateY(-2px)'}} onMouseOut={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)'}}>
                    Instagram <span style={{ opacity: 0.6 }}>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (iPhone Frosted Glass) */}
          <div className="contact-form-container" style={{ 
            flex: '1 1 500px', 
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))', 
            backdropFilter: 'blur(30px) saturate(200%)', 
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.15)', 
            borderRadius: '24px', 
            padding: '50px 40px', 
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)', 
            position: 'relative' 
          }}>
            
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '30px', fontWeight: '700', letterSpacing: '-0.5px' }}>Send a message</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600' }}>Your Name <span style={{ color: '#00EA6A' }}>*</span></label>
                  <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required 
                    style={{ width: '100%', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#ffffff', fontSize: '1.05rem', outline: 'none', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                    onFocus={(e) => { e.target.style.borderColor = '#00EA6A'; e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.boxShadow = '0 0 0 4px rgba(0,234,106,0.15), inset 0 2px 4px rgba(0,0,0,0.2)'; }} 
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.3)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; }}
                  />
                </div>
                
                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600' }}>Email Address <span style={{ color: '#00EA6A' }}>*</span></label>
                  <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    style={{ width: '100%', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#ffffff', fontSize: '1.05rem', outline: 'none', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                    onFocus={(e) => { e.target.style.borderColor = '#00EA6A'; e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.boxShadow = '0 0 0 4px rgba(0,234,106,0.15), inset 0 2px 4px rgba(0,0,0,0.2)'; }} 
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.3)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600' }}>How can we help? <span style={{ color: '#00EA6A' }}>*</span></label>
                <textarea placeholder="Tell us about your query..." value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required 
                  style={{ width: '100%', padding: '18px 20px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#ffffff', fontSize: '1.05rem', outline: 'none', resize: 'vertical', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#00EA6A'; e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.boxShadow = '0 0 0 4px rgba(0,234,106,0.15), inset 0 2px 4px rgba(0,0,0,0.2)'; }} 
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.3)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; }}
                ></textarea>
              </div>

              <button type="submit" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  marginTop: '15px', 
                  width: '100%', 
                  padding: '18px', 
                  background: isHovered ? '#00EA6A' : 'linear-gradient(135deg, #ffffff, #e2e8f0)', 
                  color: isHovered ? '#000000' : '#050508', 
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
                  boxShadow: isHovered ? '0 15px 30px rgba(0,234,106,0.4)' : '0 10px 25px rgba(255,255,255,0.1)',
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
