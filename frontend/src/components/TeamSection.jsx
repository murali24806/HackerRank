import React, { useState, useEffect, useRef } from 'react';
import { fetchTeam } from '../api';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const containerRef = useRef(null);
  const [pathD, setPathD] = useState('');

  useEffect(() => {
    fetchTeam().then(data => {
      if (data && data.length > 0) setTeam(data);
    });
  }, []);

  const updatePath = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rings = container.querySelectorAll('.avatar-ring');
    if (rings.length < 2) return;

    const containerRect = container.getBoundingClientRect();
    const points = [];

    rings.forEach(ring => {
      const rect = ring.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      points.push({ x, y });
    });

    const isMobile = window.innerWidth <= 768;
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      if (isMobile) {
        // Fluid S-curve winding gracefully between avatars and around info on mobile
        const deltaY = (p2.y - p1.y) * 0.5;
        const waveMagnitude = Math.min(60, Math.max(35, containerRect.width * 0.14));
        const wave = (i % 2 === 0 ? waveMagnitude : -waveMagnitude);
        const cp1X = p1.x + wave;
        const cp1Y = p1.y + deltaY * 0.5;
        const cp2X = p2.x + wave;
        const cp2Y = p2.y - deltaY * 0.5;
        d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p2.x} ${p2.y}`;
      } else {
        const deltaY = (p2.y - p1.y) * 0.55;
        const cp1X = p1.x;
        const cp1Y = p1.y + deltaY;
        const cp2X = p2.x;
        const cp2Y = p2.y - deltaY;
        d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p2.x} ${p2.y}`;
      }
    }

    setPathD(d);
  };

  useEffect(() => {
    updatePath();
    const t1 = setTimeout(updatePath, 150);
    const t2 = setTimeout(updatePath, 500);
    const t3 = setTimeout(updatePath, 1200);
    window.addEventListener('resize', updatePath);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updatePath);
    };
  }, [team]);

  return (
    <section id="team" className="team section-padding">
      <div className="container">
        <div className="section-header reveal active">
          <span className="eyebrow-tag">Leadership & Core</span>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the visionary leads guiding the HackerRank VIIT community forward.
          </p>
        </div>

        {/* Dynamic Curved Path Winding Timeline */}
        <div className="team-flow-container" id="team-flow-container" ref={containerRef}>
          {/* Animated SVG Path */}
          <svg className="team-curve-svg" id="team-curve-svg" aria-hidden="true">
            <defs>
              <linearGradient id="neon-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ea64" />
                <stop offset="50%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#00ea64" />
              </linearGradient>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {pathD && <path id="curve-back" className="curve-bg" d={pathD} />}
            {pathD && <path id="curve-animated" className="curve-pulse" d={pathD} />}
          </svg>

          {/* Team Members List */}
          <div className="team-members-list">
            {team.map((member, index) => {
              const isRight = member.nodePosition === 'right' || index % 2 === 0;

              return (
                <div
                  key={member._id || index}
                  className={`team-flow-row ${isRight ? 'right-node' : 'left-node'} reveal active`}
                >
                  {/* If node is on left, node appears first */}
                  {!isRight && (
                    <div className="member-node-col">
                      <div className="avatar-ring">
                        <img src={member.avatar} alt={member.name} className="member-avatar" loading="lazy" />
                        <span className="node-indicator"></span>
                      </div>
                    </div>
                  )}

                  <div className="member-info-col">
                    <div className="member-meta">
                      <span className={`member-role-badge ${member.badgeClass || 'badge-lead'}`}>
                        {member.role}
                      </span>
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-bio">{member.bio}</p>
                      <div className="social-links-row">
                        {member.socials?.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="GitHub"
                          >
                            <FaGithub size={18} />
                          </a>
                        )}
                        {member.socials?.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="LinkedIn"
                          >
                            <FaLinkedin size={18} />
                          </a>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* If node is on right, node appears second */}
                  {isRight && (
                    <div className="member-node-col">
                      <div className="avatar-ring">
                        <img src={member.avatar} alt={member.name} className="member-avatar" loading="lazy" />
                        <span className="node-indicator"></span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
