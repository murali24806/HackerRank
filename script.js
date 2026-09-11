/**
 * HackerRank VIIT On Campus Chapter
 * UI/UX Pro Max Dynamic Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Mobile Menu
  initNavbar();

  // 2. Scroll Reveal Animations
  initScrollReveal();

  // 3. Featured Spotlight Slideshow
  initSlideshow();

  // 4. Upcoming Events Horizontal Slider
  initEventsSlider();

  // 5. Team Winding Animated SVG Curve
  initTeamCurve();

  // 6. Gallery Filters & Lightbox Modal
  initGallery();

  // 7. Join Us Form Handler
  initJoinForm();
});

/* ==========================================================================
   1. Navbar Controller
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile hamburger toggle
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Active nav state based on section scroll position
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop;
      const secId = sec.getAttribute('id');
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${secId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. Featured Spotlight Slideshow
   ========================================================================== */
function initSlideshow() {
  const box = document.getElementById('slideshow-box');
  if (!box) return;

  const slides = box.querySelectorAll('.slide');
  const dots = box.querySelectorAll('.dot');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');

  let currentIndex = 0;
  let timer = null;
  const autoPlayInterval = 4500;

  function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, autoPlayInterval);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      showSlide(idx);
      startAutoPlay();
    });
  });

  box.addEventListener('mouseenter', stopAutoPlay);
  box.addEventListener('mouseleave', startAutoPlay);

  // Initial launch
  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   4. Upcoming Events Horizontal Slider
   ========================================================================== */
function initEventsSlider() {
  const container = document.getElementById('events-interactive-container');
  const prevBtn = document.getElementById('event-slide-prev');
  const nextBtn = document.getElementById('event-slide-next');

  if (!container) return;

  const options = container.querySelectorAll('.event-option');
  let activeIndex = 0;

  function setActiveOption(index) {
    if (index >= options.length) activeIndex = 0;
    else if (index < 0) activeIndex = options.length - 1;
    else activeIndex = index;

    options.forEach((opt, i) => {
      opt.classList.toggle('active', i === activeIndex);
    });
  }

  // Click on option
  options.forEach((opt, idx) => {
    opt.addEventListener('click', () => {
      setActiveOption(idx);
    });
  });

  // Next / Prev buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setActiveOption(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setActiveOption(activeIndex + 1);
    });
  }

  // Keyboard navigation when hovering or focused
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setActiveOption(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setActiveOption(activeIndex - 1);
    }
  });
}

/* ==========================================================================
   5. Dynamic Winding Curve Path for Our Team
   ========================================================================== */
function initTeamCurve() {
  const container = document.getElementById('team-flow-container');
  const curveBg = document.getElementById('curve-back');
  const curvePulse = document.getElementById('curve-animated');
  if (!container || !curveBg || !curvePulse) return;

  function updatePath() {
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
    let pathD = `M ${points[0].x} ${points[0].y}`;

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
        pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p2.x} ${p2.y}`;
      } else {
        const deltaY = (p2.y - p1.y) * 0.55;
        const cp1X = p1.x;
        const cp1Y = p1.y + deltaY;
        const cp2X = p2.x;
        const cp2Y = p2.y - deltaY;
        pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p2.x} ${p2.y}`;
      }
    }

    curveBg.setAttribute('d', pathD);
    curvePulse.setAttribute('d', pathD);
  }

  window.addEventListener('resize', debounce(updatePath, 150));
  window.addEventListener('load', updatePath);
  setTimeout(updatePath, 150);
  setTimeout(updatePath, 500);
  setTimeout(updatePath, 1200);
}

/* ==========================================================================
   6. Gallery Filters & Lightbox Modal
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  // Filter switching
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.dataset.title || '';
      const desc = item.dataset.desc || '';

      if (modal && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Lightbox
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Join Us Form Handler
   ========================================================================== */
function initJoinForm() {
  const form = document.getElementById('join-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;

    feedback.className = 'form-feedback success';
    feedback.innerHTML = `🎉 Thank you <strong>${escapeHtml(name)}</strong>! Your application has been received. Our team will contact you shortly via college email.`;
    form.reset();
  });
}

// Utility: Debounce helper for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility: HTML sanitization
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
