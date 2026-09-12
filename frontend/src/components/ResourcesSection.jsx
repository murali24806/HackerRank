import React, { useState } from 'react';
import {
  FaBook,
  FaLaptopCode,
  FaStickyNote,
  FaMapMarkedAlt,
  FaExternalLinkAlt,
  FaDownload,
  FaCheckCircle,
  FaStar,
  FaCodeBranch,
  FaTerminal
} from 'react-icons/fa';

export default function ResourcesSection() {
  const [activeTab, setActiveTab] = useState('resources');

  const tabs = [
    { id: 'resources', label: 'Resources', icon: <FaBook /> },
    { id: 'platforms', label: 'Coding Platforms', icon: <FaLaptopCode /> },
    { id: 'notes', label: 'Notes', icon: <FaStickyNote /> },
    { id: 'roadmap', label: 'Road Map', icon: <FaMapMarkedAlt /> },
  ];

  return (
    <section id="resources" className="resources-section section-padding">
      <style>{`
        .resources-section {
          position: relative;
          background: var(--color-bg, #f4f6fb);
        }

        .res-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .res-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 36px;
        }

        .res-eyebrow {
          display: inline-block;
          font-family: var(--font-code, monospace);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--color-primary, #5c3bfe);
          background: rgba(92, 59, 254, 0.08);
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 12px;
          border: 1px solid rgba(92, 59, 254, 0.15);
        }

        .res-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--color-text, #111827);
          letter-spacing: -0.5px;
          margin: 0 0 12px;
        }

        .res-subtitle {
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: var(--color-text-dim, #6b7280);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Tabs Navigation Bar ── */
        .res-tabs-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 38px;
          flex-wrap: wrap;
        }

        .res-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 30px;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: var(--font-body, inherit);
          background: #ffffff;
          color: var(--color-text-dim, #4b5563);
          border: 1px solid rgba(92, 59, 254, 0.15);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .res-tab-btn:hover {
          color: var(--color-primary, #5c3bfe);
          border-color: rgba(92, 59, 254, 0.35);
          background: rgba(92, 59, 254, 0.05);
          transform: translateY(-2px);
        }

        .res-tab-btn.active {
          background: var(--color-primary, #5c3bfe);
          color: #ffffff;
          border-color: var(--color-primary, #5c3bfe);
          box-shadow: 0 6px 20px rgba(92, 59, 254, 0.32);
          transform: translateY(-2px);
        }

        /* ── Cards Grid ── */
        .res-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .res-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 26px;
          border: 1px solid rgba(92, 59, 254, 0.12);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .res-card:hover {
          border-color: var(--color-primary, #5c3bfe);
          box-shadow: 0 16px 40px rgba(92, 59, 254, 0.14);
          transform: translateY(-5px);
        }

        .res-card-tag {
          font-family: var(--font-code, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(92, 59, 254, 0.09);
          color: var(--color-primary, #5c3bfe);
          width: fit-content;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .res-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
          line-height: 1.35;
        }

        .res-card-desc {
          font-size: 0.90rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .res-card-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          background: rgba(92, 59, 254, 0.08);
          color: var(--color-primary, #5c3bfe);
          text-decoration: none;
          width: fit-content;
          transition: all 0.2s ease;
        }

        .res-card-action:hover {
          background: var(--color-primary, #5c3bfe);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(92, 59, 254, 0.28);
        }

        /* ── Roadmap Timeline Style ── */
        .roadmap-container {
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 920px;
          margin: 0 auto;
        }

        .roadmap-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px 28px;
          border: 1px solid rgba(92, 59, 254, 0.14);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          gap: 22px;
          align-items: flex-start;
          transition: all 0.25s ease;
        }

        .roadmap-card:hover {
          border-color: var(--color-primary, #5c3bfe);
          box-shadow: 0 12px 32px rgba(92, 59, 254, 0.12);
          transform: translateY(-3px);
        }

        .roadmap-badge-num {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-primary, #5c3bfe);
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(92, 59, 254, 0.35);
        }

        .roadmap-details {
          flex: 1;
        }

        .roadmap-details h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .roadmap-details p {
          font-size: 0.92rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0 0 14px;
        }

        .roadmap-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .roadmap-tag-pill {
          font-family: var(--font-code, monospace);
          font-size: 0.74rem;
          font-weight: 600;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 4px 10px;
          border-radius: 6px;
        }

        /* ── Responsive Adaptations ── */
        @media (max-width: 768px) {
          .res-header {
            margin-bottom: 26px;
          }
          .res-tabs-nav {
            gap: 8px;
            margin-bottom: 26px;
          }
          .res-tab-btn {
            padding: 9px 16px;
            font-size: 0.85rem;
          }
          .res-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .res-card {
            padding: 20px;
            border-radius: 16px;
          }
          .roadmap-card {
            padding: 18px;
            border-radius: 16px;
            gap: 14px;
          }
          .roadmap-badge-num {
            width: 36px;
            height: 36px;
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="res-container">
        {/* Section Header */}
        <div className="res-header reveal active">
          <span className="res-eyebrow">Student Learning &amp; Dev Portal</span>
          <h2 className="res-title">Student Hub &amp; Resources</h2>
          <p className="res-subtitle">
            Curated coding sheets, competitive platforms, core subject notes, and step-by-step career roadmaps for HackerRank VIIT engineers.
          </p>
        </div>

        {/* Responsive Interactive Tab Bar */}
        <div className="res-tabs-nav reveal active">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`res-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: RESOURCES ── */}
        {activeTab === 'resources' && (
          <div className="res-cards-grid reveal active">
            <div className="res-card">
              <div>
                <span className="res-card-tag">DSA Sheet</span>
                <h3 className="res-card-title">Striver SDE Sheet &amp; NeetCode 150</h3>
                <p className="res-card-desc">
                  The quintessential collection of 180+ problems covering Dynamic Programming, Graph Traversal, Binary Search, and Heaps frequently tested at Google, Microsoft, and Amazon.
                </p>
              </div>
              <a
                href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Access SDE Sheet <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Architecture</span>
                <h3 className="res-card-title">System Design Primer &amp; Patterns</h3>
                <p className="res-card-desc">
                  Learn how to design large-scale distributed systems. Includes detailed blueprints for Redis caching, message queues (Kafka), load balancing, and SQL vs NoSQL trade-offs.
                </p>
              </div>
              <a
                href="https://github.com/donnemartin/system-design-primer"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Explore Architecture <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Interview Prep</span>
                <h3 className="res-card-title">FAANG Behavioral &amp; STAR Guide</h3>
                <p className="res-card-desc">
                  Master behavioral interviews with the Situation-Task-Action-Result framework, leadership principles, impactful resume templates, and salary negotiation strategies.
                </p>
              </div>
              <a
                href="https://www.hackerrank.com/interview/interview-preparation-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                HackerRank Interview Kit <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Developer Tools</span>
                <h3 className="res-card-title">Git, Docker &amp; Linux Cheat Sheets</h3>
                <p className="res-card-desc">
                  Essential command-line shortcuts, Docker container orchestration, and standard Git branch management workflows to turbocharge your developer productivity.
                </p>
              </div>
              <a
                href="https://education.github.com/git-cheat-sheet-education.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Download Git Cheat Sheet <FaDownload size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Algorithms</span>
                <h3 className="res-card-title">Competitive Programmer's Handbook</h3>
                <p className="res-card-desc">
                  Renowned comprehensive algorithmic handbook by Antti Laaksonen covering mathematical techniques, dynamic programming optimizations, and advanced data structures.
                </p>
              </div>
              <a
                href="https://cses.fi/book/book.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Download CP Book (PDF) <FaDownload size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Core CS</span>
                <h3 className="res-card-title">InterviewBit Core Subjects Guide</h3>
                <p className="res-card-desc">
                  Fast-paced interview preparation modules for Object-Oriented Programming, DBMS, Computer Networks, and Operating Systems with real interview question sets.
                </p>
              </div>
              <a
                href="https://www.interviewbit.com/technical-interview-questions/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                View Interview Q&amp;A <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        )}

        {/* ── TAB 2: CODING PLATFORMS ── */}
        {activeTab === 'platforms' && (
          <div className="res-cards-grid reveal active">
            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#00ea6420', color: '#00b04c' }}>
                  Official Chapter Arena
                </span>
                <h3 className="res-card-title">HackerRank VIIT Arena</h3>
                <p className="res-card-desc">
                  Solve chapter problem sets, participate in weekly contests, and earn official skill certificates in Python, Problem Solving, SQL, Java, and C++.
                </p>
              </div>
              <a
                href="https://www.hackerrank.com"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch HackerRank <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#ffa11620', color: '#d97706' }}>
                  Interview Practice
                </span>
                <h3 className="res-card-title">LeetCode Practice Arena</h3>
                <p className="res-card-desc">
                  Solve the Daily LeetCoding Challenge, participate in Weekly &amp; Biweekly contests, and practice company-tagged questions for top tech firms.
                </p>
              </div>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch LeetCode <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#3b82f620', color: '#2563eb' }}>
                  Global CP Contests
                </span>
                <h3 className="res-card-title">Codeforces Arena</h3>
                <p className="res-card-desc">
                  World-standard competitive programming arena with Div 2, Div 3, and Div 4 timed rounds to develop algorithmic agility and ICPC-level mastery.
                </p>
              </div>
              <a
                href="https://codeforces.com"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch Codeforces <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#8b5cf620', color: '#7c3aed' }}>
                  Beginner to Pro
                </span>
                <h3 className="res-card-title">CodeChef &amp; AtCoder</h3>
                <p className="res-card-desc">
                  Participate in monthly Starters, Cook-Off rounds on CodeChef, and clean mathematical algorithm contests on AtCoder Beginner Contests (ABC).
                </p>
              </div>
              <a
                href="https://www.codechef.com"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch CodeChef <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#ec489920', color: '#db2777' }}>
                  Classic Problems
                </span>
                <h3 className="res-card-title">CSES Problem Set</h3>
                <p className="res-card-desc">
                  Curated collection of 300 classic algorithmic problems covering Dynamic Programming, Graph Algorithms, Range Queries, and Tree Algorithms.
                </p>
              </div>
              <a
                href="https://cses.fi/problemset/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch CSES Set <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag" style={{ background: '#10b98120', color: '#059669' }}>
                  Articles &amp; Quizzes
                </span>
                <h3 className="res-card-title">GeeksforGeeks Practice</h3>
                <p className="res-card-desc">
                  Topic-wise coding problems, company-wise interview experiences, and comprehensive computer science tutorials for semester and placement prep.
                </p>
              </div>
              <a
                href="https://practice.geeksforgeeks.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Launch GeeksforGeeks <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        )}

        {/* ── TAB 3: NOTES ── */}
        {activeTab === 'notes' && (
          <div className="res-cards-grid reveal active">
            <div className="res-card">
              <div>
                <span className="res-card-tag">Core CS</span>
                <h3 className="res-card-title">Data Structures &amp; Algorithms</h3>
                <p className="res-card-desc">
                  Visual revision notes covering Arrays, Linked Lists, Binary Trees, AVL Trees, Segment Trees, Graph BFS/DFS, Disjoint Set Union, and Dynamic Programming.
                </p>
              </div>
              <a
                href="https://github.com/trekhleb/javascript-algorithms"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                View DSA Notes <FaBook size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Operating Systems</span>
                <h3 className="res-card-title">OS Concepts &amp; Architecture</h3>
                <p className="res-card-desc">
                  Process synchronization, Critical Section, Semaphores, Mutexes, Deadlock handling, CPU Scheduling algorithms, Paging, and Virtual Memory management.
                </p>
              </div>
              <a
                href="https://www.geeksforgeeks.org/operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                View OS Notes <FaBook size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Database</span>
                <h3 className="res-card-title">DBMS &amp; SQL Interview Notes</h3>
                <p className="res-card-desc">
                  Comprehensive breakdown of ACID transactions, Database Normalization (1NF through BCNF), Indexing with B+ Trees, Joins, and Relational vs NoSQL architectures.
                </p>
              </div>
              <a
                href="https://www.geeksforgeeks.org/dbms/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                View DBMS Notes <FaBook size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Networks</span>
                <h3 className="res-card-title">Computer Networks (CN)</h3>
                <p className="res-card-desc">
                  OSI 7 Layers model, TCP 3-way handshake, UDP vs TCP protocols, IP addressing and subnetting, DNS resolution lifecycle, and modern HTTP/2 / HTTP/3 protocols.
                </p>
              </div>
              <a
                href="https://www.geeksforgeeks.org/computer-network-tutorials/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                View CN Notes <FaBook size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Object Oriented</span>
                <h3 className="res-card-title">OOPs &amp; Design Patterns</h3>
                <p className="res-card-desc">
                  Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, and real-world implementation of Singleton, Factory, and Observer design patterns.
                </p>
              </div>
              <a
                href="https://refactoring.guru/design-patterns"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                Explore Design Patterns <FaBook size={12} />
              </a>
            </div>

            <div className="res-card">
              <div>
                <span className="res-card-tag">Web Security</span>
                <h3 className="res-card-title">Web Security &amp; REST APIs</h3>
                <p className="res-card-desc">
                  RESTful API best practices, JWT Authentication flow, CORS, XSS, CSRF prevention, Rate Limiting, and SSL/TLS encryption fundamentals.
                </p>
              </div>
              <a
                href="https://owasp.org/www-project-top-ten/"
                target="_blank"
                rel="noopener noreferrer"
                className="res-card-action"
              >
                OWASP Top 10 Guide <FaBook size={12} />
              </a>
            </div>
          </div>
        )}

        {/* ── TAB 4: ROAD MAP ── */}
        {activeTab === 'roadmap' && (
          <div className="roadmap-container reveal active">
            <div className="roadmap-card">
              <div className="roadmap-badge-num">1</div>
              <div className="roadmap-details">
                <h4>Competitive Programming &amp; DSA Roadmap</h4>
                <p>
                  Master core algorithms from ground up. Start with C++ STL or Java Collections, conquer standard patterns (Two Pointers, Sliding Window), and scale up to Dynamic Programming and Advanced Graph algorithms.
                </p>
                <div className="roadmap-tags">
                  <span className="roadmap-tag-pill">C++ STL / Java</span>
                  <span className="roadmap-tag-pill">Time Complexity O(N)</span>
                  <span className="roadmap-tag-pill">Binary Search &amp; Sorting</span>
                  <span className="roadmap-tag-pill">Trees &amp; Binary Heaps</span>
                  <span className="roadmap-tag-pill">Dynamic Programming</span>
                  <span className="roadmap-tag-pill">Graph BFS/DFS &amp; DSU</span>
                </div>
              </div>
            </div>

            <div className="roadmap-card">
              <div className="roadmap-badge-num">2</div>
              <div className="roadmap-details">
                <h4>Full-Stack Web Development (MERN &amp; Next.js)</h4>
                <p>
                  Build modern, production-grade applications. Develop deep knowledge of React state management, backend API architecture with Node.js and Express, database schema design in MongoDB/PostgreSQL, and full cloud deployment.
                </p>
                <div className="roadmap-tags">
                  <span className="roadmap-tag-pill">HTML5 &amp; Modern CSS</span>
                  <span className="roadmap-tag-pill">JavaScript ES6+ &amp; Async</span>
                  <span className="roadmap-tag-pill">React &amp; Vite</span>
                  <span className="roadmap-tag-pill">Node.js &amp; Express.js</span>
                  <span className="roadmap-tag-pill">MongoDB &amp; PostgreSQL</span>
                  <span className="roadmap-tag-pill">REST APIs &amp; JWT Auth</span>
                </div>
              </div>
            </div>

            <div className="roadmap-card">
              <div className="roadmap-badge-num">3</div>
              <div className="roadmap-details">
                <h4>AI, Machine Learning &amp; Data Engineering</h4>
                <p>
                  Transition from numerical computing to deep neural networks. Master Python libraries, probability and statistical foundations, Scikit-Learn pipelines, and building predictive generative models with PyTorch.
                </p>
                <div className="roadmap-tags">
                  <span className="roadmap-tag-pill">Python Data Science</span>
                  <span className="roadmap-tag-pill">NumPy &amp; Pandas</span>
                  <span className="roadmap-tag-pill">Linear Algebra &amp; Stats</span>
                  <span className="roadmap-tag-pill">Scikit-Learn ML</span>
                  <span className="roadmap-tag-pill">PyTorch &amp; Deep Learning</span>
                  <span className="roadmap-tag-pill">LLMs &amp; LangChain</span>
                </div>
              </div>
            </div>

            <div className="roadmap-card">
              <div className="roadmap-badge-num">4</div>
              <div className="roadmap-details">
                <h4>Cloud, DevOps &amp; Production Systems</h4>
                <p>
                  Bridge code and infrastructure. Learn containerization with Docker, continuous integration and deployment with GitHub Actions, cloud architecture on AWS/Cloudflare, and Kubernetes cluster orchestration.
                </p>
                <div className="roadmap-tags">
                  <span className="roadmap-tag-pill">Linux &amp; Shell Scripting</span>
                  <span className="roadmap-tag-pill">Git &amp; GitHub Workflows</span>
                  <span className="roadmap-tag-pill">Docker Containers</span>
                  <span className="roadmap-tag-pill">GitHub Actions CI/CD</span>
                  <span className="roadmap-tag-pill">AWS / Vercel / Render</span>
                  <span className="roadmap-tag-pill">Kubernetes &amp; Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
