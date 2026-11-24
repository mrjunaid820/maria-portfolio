/**
 * MARIA MAJID - PROFESSIONAL PORTFOLIO
 * Author: Maria Majid
 * Script: main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 0. Dual Theme System (Blue Cyber Glass & Crystal Light Glass)
  // ------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'maria_majid_portfolio_theme';
  const themeButtons = document.querySelectorAll('[data-theme-target]');
  const themeSwitchers = document.querySelectorAll('.theme-switcher');

  const getSystemTheme = () => {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  };

  const getActiveTheme = () => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      console.warn('localStorage not accessible:', e);
    }
    return getSystemTheme();
  };

  const applyTheme = (theme, saveToStorage = true) => {
    // 1. Set data-theme on <html>
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Persist in localStorage
    if (saveToStorage) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        console.warn('Failed to save theme preference:', e);
      }
    }

    // 3. Update all switcher buttons in both desktop & mobile navigation
    themeButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-theme-target') === theme;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-checked', isTarget ? 'true' : 'false');
    });

    // 4. Update data-active-theme on all switcher containers for slider position
    themeSwitchers.forEach(sw => {
      sw.setAttribute('data-active-theme', theme);
    });
  };

  // Attach click & keyboard listeners to all theme buttons
  themeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTheme = btn.getAttribute('data-theme-target');
      if (targetTheme) {
        applyTheme(targetTheme, true);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        applyTheme('light', true);
        const lightBtn = btn.parentElement ? btn.parentElement.querySelector('[data-theme-target="light"]') : null;
        if (lightBtn) lightBtn.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        applyTheme('dark', true);
        const darkBtn = btn.parentElement ? btn.parentElement.querySelector('[data-theme-target="dark"]') : null;
        if (darkBtn) darkBtn.focus();
      }
    });
  });

  // Listen for system theme changes if no explicit user preference is saved
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (e) => {
      try {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      } catch (err) {
        // Fallback
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  // Initialize theme synchronization
  applyTheme(getActiveTheme(), false);

  // ------------------------------------------------------------------------
  // 0. Interactive Glass Cursor Spotlight (Desktop only, passive)
  // ------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);
  }

  // ------------------------------------------------------------------------
  // 1. Navigation & Mobile Menu
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Blur Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Hamburger Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. ScrollSpy (Active Navigation Link on Scroll)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ------------------------------------------------------------------------
  // 3. Scroll Reveal Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  document.body.classList.add('js-reveal');
  const revealElements = document.querySelectorAll('.fade-in-up');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '50px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ------------------------------------------------------------------------
  // 4. Modal System (General handler for Projects, CV, and Verification)
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('globalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalActions = document.getElementById('modalActions');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const openModal = (title, bodyHtml, actionsHtml = '') => {
    if (!modalBackdrop) return;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = bodyHtml;
    modalActions.innerHTML = actionsHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 5. Project Preview Data & Handlers
  // ------------------------------------------------------------------------
  const projectData = {
    'hospital-management': {
      title: 'Hospital Management System',
      category: 'Healthcare Information System',
      status: 'Academic Project / In Development',
      description: `
        <p>A comprehensive Hospital Management System designed to streamline medical institution workflows, patient records administration, and clinical coordination.</p>
        <div style="margin: 1.25rem 0; padding: 1rem; background: rgba(139, 92, 246, 0.1); border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: 8px;">
          <strong style="color: #C084FC; display: block; margin-bottom: 0.35rem;">Project Status Notice:</strong>
          <span style="font-size: 0.875rem; color: #CBD5E1;">This project is currently under active development as part of Maria's Computer Science practical portfolio. As specified, technology stack and code repositories are customizable placeholders and will be connected upon public deployment.</span>
        </div>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: #94A3B8; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <li>• Modular architecture for patient records and admission tracking</li>
          <li>• Doctor appointment queue management mockup</li>
          <li>• Secure administrative data handling considerations</li>
        </ul>
      `,
      actions: `
        <button class="btn btn-secondary" onclick="window.location.href='#contact'; document.getElementById('globalModal').classList.remove('active'); document.body.style.overflow='';">Inquire About This Project</button>
        <button class="btn btn-primary" onclick="window.mainApp.showToast('Project repository link will be updated upon release.')">Repository (In Development)</button>
      `
    },
    'ecommerce-website': {
      title: 'E-commerce Website',
      category: 'Web Application & Online Store',
      status: 'Web Prototype / In Development',
      description: `
        <p>A modern e-commerce storefront concept developed to deliver an intuitive online shopping experience with product listings, cart interfaces, and responsive user flows.</p>
        <div style="margin: 1.25rem 0; padding: 1rem; background: rgba(139, 92, 246, 0.1); border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: 8px;">
          <strong style="color: #C084FC; display: block; margin-bottom: 0.35rem;">Project Status Notice:</strong>
          <span style="font-size: 0.875rem; color: #CBD5E1;">This project reflects Maria's continuous web development practice. The user interface layout, catalog organization, and responsive styling are being refined for final deployment.</span>
        </div>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: #94A3B8; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <li>• Responsive storefront catalog layout across desktop and mobile devices</li>
          <li>• Interactive product presentation and shopping cart interface design</li>
          <li>• Clean visual hierarchy aligned with contemporary web standards</li>
        </ul>
      `,
      actions: `
        <button class="btn btn-secondary" onclick="window.location.href='#contact'; document.getElementById('globalModal').classList.remove('active'); document.body.style.overflow='';">Inquire About This Project</button>
        <button class="btn btn-primary" onclick="window.mainApp.showToast('Live preview will be connected upon deployment.')">Demo (In Development)</button>
      `
    }
  };

  document.querySelectorAll('[data-project-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = projectData[projId];
      if (data) {
        openModal(
          `<div>${data.title}</div><span style="font-size: 0.8125rem; color: var(--primary-accent); font-weight: 500;">${data.category} &bull; ${data.status}</span>`,
          data.description,
          data.actions
        );
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. CV Download & View Modal Handler
  // ------------------------------------------------------------------------
  document.querySelectorAll('[data-trigger-cv]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Maria Majid – Curriculum Vitae',
        `
          <p>You can download Maria Majid's complete CV in PDF format, or view the clean printable resume directly in your browser.</p>
          <div style="margin: 1.25rem 0; padding: 1.25rem; background: var(--bg-secondary); border: 1px solid var(--glass-border); border-radius: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <span style="font-weight: 600; color: var(--text-main);">Maria_Majid_CV.pdf</span>
              <span style="font-size: 0.75rem; color: var(--primary-accent); font-family: monospace;">PDF Document</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0;">Includes verified educational background at National Excellence Institute, 2-year teaching experience, courses, certifications, and technical competencies.</p>
          </div>
          <p style="font-size: 0.8125rem; color: var(--text-muted);"><em>Note for candidate: Replace the file at <code>assets/docs/Maria_Majid_CV.pdf</code> anytime with your updated official PDF.</em></p>
        `,
        `
          <a href="assets/docs/Maria_Majid_CV.pdf" download="Maria_Majid_CV.pdf" class="btn btn-primary" onclick="window.mainApp.showToast('Downloading Maria Majid CV PDF...');">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF CV
          </a>
          <a href="assets/docs/Maria_Majid_CV.html" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            View Printable CV
          </a>
        `
      );
    });
  });

  // ------------------------------------------------------------------------
  // 7. Verified Contact Channels (Phone & WhatsApp)
  // ------------------------------------------------------------------------
  document.querySelectorAll('[data-verify-channel]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const channel = btn.getAttribute('data-verify-channel');
      const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'Direct Phone';

      openModal(
        `${channelName} Verification Policy`,
        `
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(139, 92, 246, 0.15); border: 1px solid #8B5CF6; display: inline-flex; align-items: center; justify-content: center; color: #C084FC; margin-bottom: 1rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h4 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 0.5rem;">Verified Channel Only</h4>
            <p style="font-size: 0.9rem; color: #CBD5E1; line-height: 1.6;">
              In compliance with professional privacy guidelines, direct ${channelName} contact details are provided exclusively to confirmed recruiters, hiring managers, and prospective employers.
            </p>
          </div>
          <div style="background: rgba(13, 10, 24, 0.7); border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 1rem; font-size: 0.85rem; color: #94A3B8;">
            Please send an inquiry via email to receive Maria's direct contact line immediately for interview scheduling or recruitment correspondence.
          </div>
        `,
        `
          <a href="mailto:mariamajid786mani@gmail.com?subject=Interview%20Request%20-%20Phone%2FWhatsApp%20Contact" class="btn btn-primary">
            Request Contact via Email
          </a>
          <button class="btn btn-secondary" onclick="document.getElementById('globalModal').classList.remove('active'); document.body.style.overflow='';">Close</button>
        `
      );
    });
  });

  // ------------------------------------------------------------------------
  // 8. Copy Email to Clipboard
  // ------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn, [data-copy-email]');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'mariamajid786mani@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email address copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  });

  const fallbackCopyText = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Email address copied to clipboard!');
  };

  // ------------------------------------------------------------------------
  // 9. Toast Notification Utility
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // Expose to window for inline onclick handlers
  window.mainApp = {
    showToast,
    openModal,
    closeModal
  };

  // ------------------------------------------------------------------------
  // 10. Contact Form Submission Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const subjectInput = document.getElementById('subject');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : `Portfolio Inquiry from ${name}`;

      // Basic client-side validation
      if (!name || !email || !message) {
        showFormStatus('error', 'Please fill in all required fields (Name, Email, Message).');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('error', 'Please enter a valid email address.');
        return;
      }

      // Simulate submission loading
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Sending Message...
      `;

      // Netlify AJAX submission handler with offline/local fallback
      const formData = new FormData(contactForm);
      const urlEncodedBody = new URLSearchParams(formData).toString();

      const triggerLocalFallback = () => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showFormStatus('success', 'Thank you! Your message has been prepared. Opening your mail client...');
        showToast('Message prepared! Opening mail draft...');
        const mailtoUrl = `mailto:mariamajid786mani@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;
        window.location.href = mailtoUrl;
        contactForm.reset();
      };

      // Check if we are running in a web environment where Netlify Forms can receive POST
      if (window.location.protocol.startsWith('http')) {
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlEncodedBody
        })
        .then(response => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          if (response.ok) {
            showFormStatus('success', 'Thank you! Your message has been received via Netlify. Maria Majid will respond shortly.');
            showToast('Message sent successfully!');
            contactForm.reset();
          } else {
            triggerLocalFallback();
          }
        })
        .catch(() => {
          triggerLocalFallback();
        });
      } else {
        // Local file:/// execution fallback
        setTimeout(() => {
          triggerLocalFallback();
        }, 600);
      }
    });
  }

  const showFormStatus = (type, message) => {
    if (!formStatus) return;
    formStatus.className = `form-status ${type}`;
    formStatus.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' 
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
        }
      </svg>
      <span>${message}</span>
    `;
    formStatus.style.display = 'flex';
  };

  // ------------------------------------------------------------------------
  // 11. Back to Top Button
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Inject keyframe animation for spinner if missing
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
  `;
  document.head.appendChild(styleSheet);
});
