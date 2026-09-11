import React, { useState } from 'react';
import { 
  FaBook, 
  FaLaptopCode, 
  FaStickyNote, 
  FaMapMarkedAlt, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaCode, 
  FaCheckCircle, 
  FaChevronRight,
  FaDownload
} from 'react-icons/fa';

export default function StudentHubCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'platforms' | 'notes' | 'roadmap'

  const openTab = (tabKey) => {
    setActiveTab(tabKey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* ── Companion Card in Chapter Highlights ── */}
      <div className="student-hub-card">
        <style>{`
          .student-hub-card {
            flex: 0 0 24%;
            position: relative;
            height: 250px;
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(145deg, #4f32e6 0%, #2e12b8 100%);
            border: 1px solid rgba(255, 255, 255, 0.22);
            box-shadow: 0 12px 36px rgba(79, 50, 230, 0.3);
            display: flex;
            flex-direction: column;
            padding: 14px 12px;
            box-sizing: border-box;
            user-select: none;
          }

          .hub-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.18);
            flex-shrink: 0;
          }

          .hub-header-left {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .hub-header-badge {
            font-family: var(--font-code, monospace);
            font-size: 0.60rem;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 2px 6px;
            border-radius: 4px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .hub-header-title {
            font-family: var(--font-display, inherit);
            font-size: 0.88rem;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .hub-pulse-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 6px #22c55e;
          }

          /* 2x2 Grid of Quick Navigation Tiles */
          .hub-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            flex: 1;
          }

          .hub-tile {
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            color: #ffffff;
            text-decoration: none;
            position: relative;
            overflow: hidden;
          }

          .hub-tile::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            opacity: 0;
            transition: opacity 0.25s ease;
          }

          .hub-tile:hover {
            background: rgba(255, 255, 255, 0.24);
            border-color: rgba(255, 255, 255, 0.45);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
          }

          .hub-tile:hover::before {
            opacity: 1;
          }

          .hub-tile-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;
          }

          .hub-tile-icon {
            font-size: 1.1rem;
            color: #ffffff;
          }

          .hub-tile-arrow {
            font-size: 0.65rem;
            opacity: 0.7;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }

          .hub-tile:hover .hub-tile-arrow {
            transform: translateX(2px);
            opacity: 1;
          }

          .hub-tile-name {
            font-size: 0.74rem;
            font-weight: 700;
            line-height: 1.2;
            color: #ffffff;
            margin: 0;
          }

          .hub-tile-desc {
            font-size: 0.58rem;
            color: rgba(255, 255, 255, 0.75);
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Mobile adjustments */
          @media (max-width: 768px) {
            .student-hub-card {
              flex: 0 0 27%;
              height: 155px;
              border-radius: 12px;
              padding: 8px 6px;
            }

            .hub-card-header {
              padding-bottom: 4px;
              margin-bottom: 4px;
            }

            .hub-header-title {
              font-size: 0.64rem;
              letter-spacing: 0.2px;
            }

            .hub-header-badge {
              display: none;
            }

            .hub-grid {
              gap: 4px;
            }

            .hub-tile {
              padding: 5px 6px;
              border-radius: 8px;
            }

            .hub-tile-top {
              margin-bottom: 2px;
            }

            .hub-tile-icon {
              font-size: 0.85rem;
            }

            .hub-tile-arrow {
              display: none;
            }

            .hub-tile-name {
              font-size: 0.62rem;
              line-height: 1.15;
            }

            .hub-tile-desc {
              display: none;
            }
          }
        `}</style>

        {/* Card Header */}
        <div className="hub-card-header">
          <div className="hub-header-left">
            <span className="hub-pulse-dot"></span>
            <span className="hub-header-title">Student Hub</span>
          </div>
          <span className="hub-header-badge">VIIT</span>
        </div>

        {/* 2x2 Interactive Navigation Tiles */}
        <div className="hub-grid">
          {/* Tile 1: Resources */}
          <div className="hub-tile" onClick={() => openTab('resources')}>
            <div className="hub-tile-top">
              <span className="hub-tile-icon"><FaBook /></span>
              <span className="hub-tile-arrow"><FaChevronRight /></span>
            </div>
            <div>
              <p className="hub-tile-name">Resources</p>
              <span className="hub-tile-desc">Sheets &amp; Tools</span>
            </div>
          </div>

          {/* Tile 2: Coding Platforms */}
          <div className="hub-tile" onClick={() => openTab('platforms')}>
            <div className="hub-tile-top">
              <span className="hub-tile-icon"><FaLaptopCode /></span>
              <span className="hub-tile-arrow"><FaChevronRight /></span>
            </div>
            <div>
              <p className="hub-tile-name">Platforms</p>
              <span className="hub-tile-desc">HackerRank, LC</span>
            </div>
          </div>

          {/* Tile 3: Notes */}
          <div className="hub-tile" onClick={() => openTab('notes')}>
            <div className="hub-tile-top">
              <span className="hub-tile-icon"><FaStickyNote /></span>
              <span className="hub-tile-arrow"><FaChevronRight /></span>
            </div>
            <div>
              <p className="hub-tile-name">Notes</p>
              <span className="hub-tile-desc">DSA, OS, DBMS</span>
            </div>
          </div>

          {/* Tile 4: Roadmap */}
          <div className="hub-tile" onClick={() => openTab('roadmap')}>
            <div className="hub-tile-top">
              <span className="hub-tile-icon"><FaMapMarkedAlt /></span>
              <span className="hub-tile-arrow"><FaChevronRight /></span>
            </div>
            <div>
              <p className="hub-tile-name">Road Map</p>
              <span className="hub-tile-desc">Career Guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Full-Screen / Modal Portal View ── */}
      {isModalOpen && (
        <div className="hub-modal-backdrop" onClick={closeModal}>
          <style>{`
            .hub-modal-backdrop {
              position: fixed;
              inset: 0;
              background: rgba(15, 23, 42, 0.78);
              backdrop-filter: blur(14px);
              -webkit-backdrop-filter: blur(14px);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              box-sizing: border-box;
              animation: hubFadeIn 0.25s ease-out;
            }

            @keyframes hubFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .hub-modal-window {
              background: #ffffff;
              border-radius: 24px;
              width: 100%;
              max-width: 980px;
              max-height: 88vh;
              overflow-y: auto;
              box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
              border: 1px solid rgba(92, 59, 254, 0.18);
              display: flex;
              flex-direction: column;
              animation: hubSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              box-sizing: border-box;
            }

            @keyframes hubSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }

            /* Modal Header */
            .hub-modal-head {
              padding: 24px 28px 18px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid rgba(92, 59, 254, 0.12);
              background: #f8fafc;
              border-radius: 24px 24px 0 0;
              position: sticky;
              top: 0;
              z-index: 10;
            }

            .hub-modal-head-title h3 {
              font-size: 1.45rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 4px;
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .hub-modal-head-title p {
              font-size: 0.88rem;
              color: #64748b;
              margin: 0;
            }

            .hub-close-btn {
              width: 38px;
              height: 38px;
              border-radius: 50%;
              border: 1px solid #e2e8f0;
              background: #ffffff;
              color: #475569;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 1.1rem;
              transition: all 0.2s ease;
            }

            .hub-close-btn:hover {
              background: #fee2e2;
              color: #ef4444;
              border-color: #fca5a5;
              transform: rotate(90deg);
            }

            /* Navigation Tabs */
            .hub-modal-tabs {
              display: flex;
              gap: 10px;
              padding: 14px 28px;
              background: #ffffff;
              border-bottom: 1px solid #f1f5f9;
              overflow-x: auto;
              scrollbar-width: none;
            }

            .hub-tab-btn {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 9px 18px;
              border-radius: 30px;
              font-size: 0.88rem;
              font-weight: 700;
              border: 1px solid #e2e8f0;
              background: #f8fafc;
              color: #475569;
              cursor: pointer;
              white-space: nowrap;
              transition: all 0.2s ease;
            }

            .hub-tab-btn:hover {
              color: #5c3bfe;
              border-color: rgba(92, 59, 254, 0.3);
              background: rgba(92, 59, 254, 0.05);
            }

            .hub-tab-btn.active {
              background: #5c3bfe;
              color: #ffffff;
              border-color: #5c3bfe;
              box-shadow: 0 4px 14px rgba(92, 59, 254, 0.3);
            }

            /* Modal Body Content */
            .hub-modal-body {
              padding: 28px;
              flex: 1;
            }

            .hub-content-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 20px;
            }

            .hub-content-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: all 0.25s ease;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
            }

            .hub-content-card:hover {
              border-color: #5c3bfe;
              box-shadow: 0 10px 25px rgba(92, 59, 254, 0.12);
              transform: translateY(-3px);
            }

            .hub-card-tag {
              font-family: var(--font-code, monospace);
              font-size: 0.68rem;
              font-weight: 700;
              padding: 3px 8px;
              border-radius: 6px;
              background: rgba(92, 59, 254, 0.1);
              color: #5c3bfe;
              width: fit-content;
              margin-bottom: 10px;
              text-transform: uppercase;
            }

            .hub-card-title {
              font-size: 1.08rem;
              font-weight: 700;
              color: #0f172a;
              margin: 0 0 6px;
            }

            .hub-card-desc {
              font-size: 0.84rem;
              color: #64748b;
              line-height: 1.5;
              margin: 0 0 16px;
            }

            .hub-card-action {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-size: 0.84rem;
              font-weight: 700;
              color: #5c3bfe;
              text-decoration: none;
              padding: 8px 14px;
              background: rgba(92, 59, 254, 0.08);
              border-radius: 8px;
              width: fit-content;
              transition: all 0.2s ease;
            }

            .hub-card-action:hover {
              background: #5c3bfe;
              color: #ffffff;
            }

            /* Roadmap Timeline view */
            .roadmap-timeline {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .roadmap-step {
              display: flex;
              gap: 16px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 18px 20px;
              align-items: flex-start;
            }

            .roadmap-num {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: #5c3bfe;
              color: #ffffff;
              font-weight: 800;
              font-size: 0.95rem;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .roadmap-info h4 {
              margin: 0 0 4px;
              font-size: 1.05rem;
              font-weight: 700;
              color: #0f172a;
            }

            .roadmap-info p {
              margin: 0 0 8px;
              font-size: 0.85rem;
              color: #64748b;
              line-height: 1.5;
            }

            .roadmap-skills {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
            }

            .roadmap-skill-chip {
              font-size: 0.72rem;
              font-family: var(--font-code, monospace);
              background: #ffffff;
              border: 1px solid #cbd5e1;
              color: #334155;
              padding: 2px 8px;
              border-radius: 4px;
            }

            @media (max-width: 640px) {
              .hub-modal-window {
                max-height: 92vh;
                border-radius: 18px;
              }
              .hub-modal-head {
                padding: 16px 18px 12px;
              }
              .hub-modal-tabs {
                padding: 10px 14px;
              }
              .hub-modal-body {
                padding: 16px;
              }
              .hub-content-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="hub-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="hub-modal-head">
              <div className="hub-modal-head-title">
                <h3>
                  <span>🎓 HackerRank VIIT</span>
                  <span style={{ color: '#5c3bfe' }}>Developer Portal</span>
                </h3>
                <p>Curated learning materials, coding platforms, study notes, and career roadmaps.</p>
              </div>
              <button className="hub-close-btn" onClick={closeModal} aria-label="Close modal">
                <FaTimes />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="hub-modal-tabs">
              <button
                className={`hub-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <FaBook /> Resources
              </button>
              <button
                className={`hub-tab-btn ${activeTab === 'platforms' ? 'active' : ''}`}
                onClick={() => setActiveTab('platforms')}
              >
                <FaLaptopCode /> Coding Platforms
              </button>
              <button
                className={`hub-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <FaStickyNote /> Notes
              </button>
              <button
                className={`hub-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
                onClick={() => setActiveTab('roadmap')}
              >
                <FaMapMarkedAlt /> Road Map
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="hub-modal-body">
              {/* ── TAB 1: RESOURCES ── */}
              {activeTab === 'resources' && (
                <div className="hub-content-grid">
                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">DSA Sheet</span>
                      <h4 className="hub-card-title">Striver SDE Sheet &amp; NeetCode 150</h4>
                      <p className="hub-card-desc">
                        Top 180 curated coding interview questions covering Dynamic Programming, Trees, Graphs, and Arrays asked in Google, Amazon &amp; Microsoft.
                      </p>
                    </div>
                    <a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Open SDE Sheet <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">System Design</span>
                      <h4 className="hub-card-title">System Design Primer &amp; Patterns</h4>
                      <p className="hub-card-desc">
                        Comprehensive architecture guide on Microservices, Caching (Redis), Load Balancers, Kafka, and Database Sharding for scalable systems.
                      </p>
                    </div>
                    <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Explore Primer <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Interview Kit</span>
                      <h4 className="hub-card-title">FAANG Behavioral &amp; STAR Guide</h4>
                      <p className="hub-card-desc">
                        Proven techniques for HR &amp; Technical manager rounds, salary negotiation strategies, and impactful engineering resume templates.
                      </p>
                    </div>
                    <a href="https://www.hackerrank.com/interview/interview-preparation-kit" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      HackerRank Prep Kit <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Developer Tools</span>
                      <h4 className="hub-card-title">Git, Docker &amp; Terminal Cheat Sheets</h4>
                      <p className="hub-card-desc">
                        Essential command-line shortcuts, Docker containers workflow, and standard open-source Git branch management cheat sheets.
                      </p>
                    </div>
                    <a href="https://education.github.com/git-cheat-sheet-education.pdf" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Download Cheat Sheet <FaDownload size={11} />
                    </a>
                  </div>
                </div>
              )}

              {/* ── TAB 2: CODING PLATFORMS ── */}
              {activeTab === 'platforms' && (
                <div className="hub-content-grid">
                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag" style={{ background: '#00ea6420', color: '#00b04c' }}>Official Partner</span>
                      <h4 className="hub-card-title">HackerRank VIIT Arena</h4>
                      <p className="hub-card-desc">
                        Solve weekly problems, practice domain skills (Python, C++, Java, SQL), and compete in official college leaderboard contests.
                      </p>
                    </div>
                    <a href="https://www.hackerrank.com" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Visit HackerRank <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag" style={{ background: '#ffa11620', color: '#d97706' }}>Interview Prep</span>
                      <h4 className="hub-card-title">LeetCode Practice Arena</h4>
                      <p className="hub-card-desc">
                        Master the Daily LeetCoding challenge, join weekly contests, and prepare for top tier software engineering interviews.
                      </p>
                    </div>
                    <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Open LeetCode <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag" style={{ background: '#3b82f620', color: '#2563eb' }}>Competitive CP</span>
                      <h4 className="hub-card-title">Codeforces Div 2 &amp; Div 3</h4>
                      <p className="hub-card-desc">
                        World-class algorithmic rounds to improve problem-solving speed, math acumen, and international rating for ICPC aspirants.
                      </p>
                    </div>
                    <a href="https://codeforces.com" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Explore Codeforces <FaExternalLinkAlt size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag" style={{ background: '#8b5cf620', color: '#7c3aed' }}>Contests</span>
                      <h4 className="hub-card-title">CodeChef &amp; AtCoder</h4>
                      <p className="hub-card-desc">
                        Participate in CodeChef Starters and AtCoder Beginner Contests (ABC) designed for building solid logical reasoning.
                      </p>
                    </div>
                    <a href="https://www.codechef.com" target="_blank" rel="noopener noreferrer" className="hub-card-action">
                      Visit CodeChef <FaExternalLinkAlt size={11} />
                    </a>
                  </div>
                </div>
              )}

              {/* ── TAB 3: NOTES ── */}
              {activeTab === 'notes' && (
                <div className="hub-content-grid">
                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Core CS</span>
                      <h4 className="hub-card-title">Data Structures &amp; Algorithms</h4>
                      <p className="hub-card-desc">
                        Visual, handwritten &amp; code-ready notes on Binary Search, Trees, Heaps, Graph BFS/DFS, and 1D/2D Dynamic Programming.
                      </p>
                    </div>
                    <a href="#events" className="hub-card-action" onClick={(e) => { e.preventDefault(); alert("Accessing VIIT Chapter DSA Notes Library"); }}>
                      View DSA Notes <FaDownload size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Operating Systems</span>
                      <h4 className="hub-card-title">OS Concepts &amp; Interview Qs</h4>
                      <p className="hub-card-desc">
                        Process synchronization, Semaphores, Deadlock prevention, Virtual Memory, Paging, and Linux kernel fundamentals.
                      </p>
                    </div>
                    <a href="#events" className="hub-card-action" onClick={(e) => { e.preventDefault(); alert("Accessing VIIT Chapter OS Notes"); }}>
                      View OS Notes <FaDownload size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Database</span>
                      <h4 className="hub-card-title">DBMS &amp; SQL Mastery</h4>
                      <p className="hub-card-desc">
                        SQL Queries, ACID properties, Normalization (1NF to BCNF), Indexing algorithms (B+ Trees), and NoSQL MongoDB comparisons.
                      </p>
                    </div>
                    <a href="#events" className="hub-card-action" onClick={(e) => { e.preventDefault(); alert("Accessing VIIT Chapter DBMS Notes"); }}>
                      View DBMS Notes <FaDownload size={11} />
                    </a>
                  </div>

                  <div className="hub-content-card">
                    <div>
                      <span className="hub-card-tag">Networks</span>
                      <h4 className="hub-card-title">Computer Networks (CN)</h4>
                      <p className="hub-card-desc">
                        OSI 7 Layers, TCP 3-way handshake, UDP vs TCP, DNS resolution flow, HTTP/1.1 vs HTTP/2 vs HTTP/3, and WebSockets.
                      </p>
                    </div>
                    <a href="#events" className="hub-card-action" onClick={(e) => { e.preventDefault(); alert("Accessing VIIT Chapter CN Notes"); }}>
                      View CN Notes <FaDownload size={11} />
                    </a>
                  </div>
                </div>
              )}

              {/* ── TAB 4: ROADMAP ── */}
              {activeTab === 'roadmap' && (
                <div className="roadmap-timeline">
                  <div className="roadmap-step">
                    <div className="roadmap-num">1</div>
                    <div className="roadmap-info">
                      <h4>Competitive Programming &amp; Algorithmic Mastery</h4>
                      <p>Start with a core programming language (C++ or Java), master STL/Collections, then systematically conquer DSA topics from Arrays to Graphs.</p>
                      <div className="roadmap-skills">
                        <span className="roadmap-skill-chip">C++ STL</span>
                        <span className="roadmap-skill-chip">Time Complexity O(N)</span>
                        <span className="roadmap-skill-chip">Recursion &amp; Backtracking</span>
                        <span className="roadmap-skill-chip">Dynamic Programming</span>
                        <span className="roadmap-skill-chip">Graph Theory</span>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-step">
                    <div className="roadmap-num">2</div>
                    <div className="roadmap-info">
                      <h4>Full-Stack Web Development (MERN / Next.js)</h4>
                      <p>Build modern responsive applications with React, Tailwind, and Node.js. Learn backend REST APIs, authentication with JWT, and database modeling.</p>
                      <div className="roadmap-skills">
                        <span className="roadmap-skill-chip">HTML5 / Modern CSS</span>
                        <span className="roadmap-skill-chip">JavaScript ES6+</span>
                        <span className="roadmap-skill-chip">React &amp; Vite</span>
                        <span className="roadmap-skill-chip">Node.js &amp; Express</span>
                        <span className="roadmap-skill-chip">MongoDB / PostgreSQL</span>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-step">
                    <div className="roadmap-num">3</div>
                    <div className="roadmap-info">
                      <h4>AI, Machine Learning &amp; Data Engineering</h4>
                      <p>Learn Python data libraries, mathematical foundations of Linear Algebra and Statistics, and develop predictive machine learning models.</p>
                      <div className="roadmap-skills">
                        <span className="roadmap-skill-chip">Python</span>
                        <span className="roadmap-skill-chip">NumPy &amp; Pandas</span>
                        <span className="roadmap-skill-chip">Scikit-Learn</span>
                        <span className="roadmap-skill-chip">PyTorch</span>
                        <span className="roadmap-skill-chip">LangChain / LLMs</span>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-step">
                    <div className="roadmap-num">4</div>
                    <div className="roadmap-info">
                      <h4>Cloud, DevOps &amp; Production Deployment</h4>
                      <p>Containerize applications using Docker, configure CI/CD deployment pipelines on GitHub Actions, and deploy to AWS, Vercel, and Render.</p>
                      <div className="roadmap-skills">
                        <span className="roadmap-skill-chip">Linux &amp; Bash</span>
                        <span className="roadmap-skill-chip">Docker Containers</span>
                        <span className="roadmap-skill-chip">GitHub Actions CI/CD</span>
                        <span className="roadmap-skill-chip">AWS / Cloudflare</span>
                        <span className="roadmap-skill-chip">Kubernetes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
