/**
 * INDUS RISE DTC — MASTER JAVASCRIPT CONTROLLER
 * Handles page preloader, multi-page navigation, ambient canvas graphics,
 * animated counters, scroll reveals, interactive filters, accordions, and modals.
 */

// --------------------------------------------------------------------------
// 1. Interactive Branded Preloader
// --------------------------------------------------------------------------
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  const preloaderStatus = document.getElementById('preloader-status-text');

  if (!preloader) return;

  const statusPhrases = [
    'INITIALIZING ECOSYSTEM...',
    'CONNECTING FOUNDER NETWORK...',
    'SYNCING INNOVATION LABS...',
    'WELCOME TO INDUS RISE'
  ];

  let phraseIndex = 0;
  let progress = 15;

  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress > 90) progress = 90;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (preloaderStatus && phraseIndex < statusPhrases.length - 1) {
      phraseIndex++;
      preloaderStatus.textContent = statusPhrases[phraseIndex];
    }
  }, 120);

  function dismissPreloader() {
    clearInterval(progressInterval);
    if (progressBar) progressBar.style.width = '100%';
    if (preloaderStatus) preloaderStatus.textContent = statusPhrases[statusPhrases.length - 1];

    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.add('page-loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 700);
    }, 280);
  }

  window.addEventListener('load', dismissPreloader);
  // Fallback safety timeout so user is never blocked
  setTimeout(dismissPreloader, 1400);
})();

document.addEventListener('DOMContentLoaded', () => {
  // Common Elements
  const header = document.querySelector('.site-header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  const sideDots = document.querySelectorAll('.side-dot');
  const sections = document.querySelectorAll('section[id], header[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const modal = document.getElementById('join-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-join-modal');
  const joinForms = document.querySelectorAll('#indus-join-form, #dedicated-join-form');
  const toast = document.getElementById('toast-notice');

  /* --------------------------------------------------------------------------
     2. Multi-Page Active Navigation Highlighting
     ----------------------------------------------------------------------- */
  function highlightCurrentPage() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Extract filename
      const linkPath = href.split('#')[0].split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else if (currentPath === 'index.html' && (href === '#' || href === '#hero' || href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  highlightCurrentPage();

  /* --------------------------------------------------------------------------
     3. Scroll Progress Bar & Sticky Header
     ----------------------------------------------------------------------- */
  function updateScrollState() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateScrollState);
  });
  updateScrollState();

  /* --------------------------------------------------------------------------
     4. Back to Top Button
     ----------------------------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Mobile Navigation Drawer
     ----------------------------------------------------------------------- */
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. Scroll-Triggered Reveal Animations
     ----------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     7. Side Dots Navigation (In-page anchor navigation on index.html)
     ----------------------------------------------------------------------- */
  if ('IntersectionObserver' in window && sections.length > 0 && sideDots.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          sideDots.forEach(dot => {
            if (dot.getAttribute('data-target') === currentId) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      threshold: 0.35
    });

    sections.forEach(sec => sectionObserver.observe(sec));

    sideDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetId = dot.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Animated Stats Number Counters
     ----------------------------------------------------------------------- */
  const counterElements = document.querySelectorAll('[data-count]');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'), 10);
          const suffix = target.getAttribute('data-suffix') || '+';
          const prefix = target.getAttribute('data-prefix') || '';
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * countTo);

            target.textContent = `${prefix}${currentCount}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = `${prefix}${countTo}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     9. Interactive Event Filter & Search
     ----------------------------------------------------------------------- */
  if (filterBtns.length > 0 && eventCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        eventCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.classList.add('is-visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. Interactive Accordion (FAQs)
     ----------------------------------------------------------------------- */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(headerBtn => {
    headerBtn.addEventListener('click', () => {
      const item = headerBtn.closest('.accordion-item');
      if (!item) return;

      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all sibling items in the same group
      const parentGroup = item.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingBody = sibling.querySelector('.accordion-body');
            if (siblingBody) siblingBody.style.maxHeight = null;
          }
        });
      }

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (body) body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });

  /* --------------------------------------------------------------------------
     11. Interactive Card Spotlight Glow (Mouse-Follow Effect)
     ----------------------------------------------------------------------- */
  const glowCards = document.querySelectorAll('.card-glow-spot');

  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });
  });

  /* --------------------------------------------------------------------------
     12. Join Indus Modal Dialog
     ----------------------------------------------------------------------- */
  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If the button is a direct link to join.html and user is on a mobile device or prefers direct navigation, allow link; else open modal
      if (modal) {
        e.preventDefault();
        openModal();
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. Join Form Submission & Feedback Toast
     ----------------------------------------------------------------------- */
  function showToast(message) {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4800);
  }

  joinForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting application...';
      }

      setTimeout(() => {
        closeModal();
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        showToast('🎉 Application received! Welcome to the Indus Rise DTC founder journey.');
      }, 950);
    });
  });

  /* --------------------------------------------------------------------------
     14. Launchpad Portal Category Filter (index.html)
     ----------------------------------------------------------------------- */
  const portalFilterPills = document.querySelectorAll('[data-portal-filter]');
  const portalCards = document.querySelectorAll('.portal-card');

  portalFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      portalFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-portal-filter');

      portalCards.forEach(card => {
        const category = card.getAttribute('data-portal-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     15. Startup Showcase Category Filter (startups.html)
     ----------------------------------------------------------------------- */
  const startupFilterPills = document.querySelectorAll('[data-startup-filter]');
  const startupCards = document.querySelectorAll('.startup-card');

  startupFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      startupFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-startup-filter');

      startupCards.forEach(card => {
        const category = card.getAttribute('data-startup-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     16. Founder Vault Category Filter (resources.html)
     ----------------------------------------------------------------------- */
  const resourceFilterPills = document.querySelectorAll('[data-resource-filter]');
  const resourceCards = document.querySelectorAll('.resource-card');

  resourceFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      resourceFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-resource-filter');

      resourceCards.forEach(card => {
        const category = card.getAttribute('data-resource-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     17. Pitch Deck Modal Viewer (startups.html)
     ----------------------------------------------------------------------- */
  const pitchModal = document.getElementById('pitch-modal');
  const closePitchBtn = document.getElementById('close-pitch-modal');
  const openPitchBtns = document.querySelectorAll('.open-pitch-modal');
  const pitchHeading = document.getElementById('pitch-modal-heading');
  const pitchSub = document.getElementById('pitch-modal-sub');
  const downloadDeckBtn = document.getElementById('download-deck-btn');

  openPitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const startupTitle = btn.getAttribute('data-startup-title') || 'Startup';
      const deckName = btn.getAttribute('data-startup-deck') || 'Pitch Deck';

      if (pitchHeading) pitchHeading.textContent = `${startupTitle} Pitch Deck`;
      if (pitchSub) pitchSub.textContent = `Viewing executive summary: ${deckName}`;

      if (pitchModal) {
        pitchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closePitchBtn && pitchModal) {
    closePitchBtn.addEventListener('click', () => {
      pitchModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    pitchModal.addEventListener('click', (e) => {
      if (e.target === pitchModal) {
        pitchModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (downloadDeckBtn) {
    downloadDeckBtn.addEventListener('click', () => {
      if (pitchModal) pitchModal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('📥 Downloading Pitch Deck (.PDF)... Access granted!');
    });
  }

  /* --------------------------------------------------------------------------
     18. Vault Download & Demo Triggers
     ----------------------------------------------------------------------- */
  const vaultDownloadBtns = document.querySelectorAll('.trigger-vault-download');
  vaultDownloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const resourceName = btn.getAttribute('data-resource-name') || 'Resource File';
      showToast(`📥 Initializing download for: ${resourceName}`);
    });
  });

  const demoToastBtns = document.querySelectorAll('.trigger-demo-toast');
  demoToastBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('🚀 Access requested! You have been placed on the VIP Founder priority queue.');
    });
  });

  /* --------------------------------------------------------------------------
     14. Ambient Constellation Particle Canvas Animation
     ----------------------------------------------------------------------- */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 42;
    const maxDistance = 120;
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 600;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.radius = Math.random() * 2 + 1.2;
        this.color = Math.random() > 0.4 ? 'rgba(245, 161, 107, 0.7)' : 'rgba(255, 255, 255, 0.5)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.x -= (dx / dist) * 0.8;
            this.y -= (dy / dist) * 0.8;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 161, 107, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
});
