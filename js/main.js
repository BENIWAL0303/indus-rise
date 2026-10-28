/**
 * INDUS ASCENDS — MASTER JAVASCRIPT CONTROLLER
 * Handles scroll effects, navigation, interactive filters, modal dialogs, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const backToTopBtn = document.getElementById('back-to-top');
  const sideDots = document.querySelectorAll('.side-dot');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], header[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const modal = document.getElementById('join-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-join-modal');
  const joinForm = document.getElementById('indus-join-form');
  const toast = document.getElementById('toast-notice');

  /* --------------------------------------------------------------------------
     1. Scroll Progress Bar & Header Scrolled State
     ----------------------------------------------------------------------- */
  function updateScrollState() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    // Toggle header backdrop shadow
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Toggle Back-To-Top button
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
     2. Back to Top Button
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
     3. Mobile Navigation Drawer
     ----------------------------------------------------------------------- */
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking any link inside it
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Scroll-Triggered Reveal Animations (Intersection Observer)
     ----------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, no need to keep observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     5. Active Section Tracking (Nav links & Side Dots)
     ----------------------------------------------------------------------- */
  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');

          // Update header desktop links
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          // Update floating side dots
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
  }

  // Side dots click to scroll
  sideDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Event Category Filter
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
     7. Join Indus Modal Dialog
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
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    // Click outside dialog to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Join Form Submission & Toast Feedback
     ----------------------------------------------------------------------- */
  function showToast(message) {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = joinForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting application...';

      // Simulate network request
      setTimeout(() => {
        closeModal();
        joinForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('🎉 Application submitted! Welcome to the Indus Rise DTC journey.');
      }, 900);
    });
  }
});
