/**
 * GREEN EARTH FOUNDATION - INTERACTIVE LOGIC & SCRIPTS
 * Handles navigation, animated counters, modals, form validations, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimatedCounters();
  initDonationSection();
  initModals();
  initForms();
  initScrollTop();
});

/* ==========================================================================
   DONATION SECTION (ON-PAGE)
   ========================================================================== */
function initDonationSection() {
  let currentFrequency = 'onetime';
  const tabOnetime = document.getElementById('tab-onetime');
  const tabMonthly = document.getElementById('tab-monthly');
  const freqLabels = document.querySelectorAll('[data-freq-text]');
  const tierButtons = document.querySelectorAll('.btn-donate-tier');
  const customDonationForm = document.getElementById('custom-donation-form');

  if (tabOnetime && tabMonthly) {
    tabOnetime.addEventListener('click', () => {
      currentFrequency = 'onetime';
      tabOnetime.classList.add('active');
      tabMonthly.classList.remove('active');
      freqLabels.forEach(label => label.textContent = 'One-Time Contribution');
    });

    tabMonthly.addEventListener('click', () => {
      currentFrequency = 'monthly';
      tabMonthly.classList.add('active');
      tabOnetime.classList.remove('active');
      freqLabels.forEach(label => label.textContent = 'Monthly Recurring Gift');
    });
  }

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = btn.getAttribute('data-amount') || '1000';
      const formattedAmount = parseInt(amount, 10).toLocaleString();
      const freqText = currentFrequency === 'monthly' ? 'monthly recurring' : 'one-time';

      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Processing...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        showToast(
          'Contribution Received! 💚',
          `Thank you for your ${freqText} gift of ₹${formattedAmount}! Your support directly empowers native tree planting and coastline revitalization.`,
          'success'
        );
      }, 650);
    });
  });

  if (customDonationForm) {
    customDonationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customInput = document.getElementById('section-custom-amount');
      const amount = customInput ? customInput.value.trim() : '';

      if (!amount || parseInt(amount, 10) < 50) {
        showToast('Please enter an amount of at least ₹50.', '', 'warning');
        return;
      }

      const formattedAmount = parseInt(amount, 10).toLocaleString();
      const freqText = currentFrequency === 'monthly' ? 'monthly recurring' : 'one-time';
      const submitBtn = customDonationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Processing...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        customDonationForm.reset();
        showToast(
          'Contribution Received! 💚',
          `Thank you for your generous ${freqText} gift of ₹${formattedAmount}! Every rupee fosters a greener planet.`,
          'success'
        );
      }, 650);
    });
  }
}


/* ==========================================================================
   NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking any nav link
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Active section highlighting
  function highlightCurrentSection() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   ANIMATED IMPACT STATS COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => animateValue(stat));
        obs.disconnect(); // Animate once
      }
    });
  }, { threshold: 0.25 });

  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    observer.observe(impactSection);
  }

  function animateValue(elem) {
    const target = parseInt(elem.getAttribute('data-target'), 10);
    const suffix = elem.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      elem.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        elem.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }
}

/* ==========================================================================
   MODAL COMPONENT (DONATION & JOIN US)
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('.modal-close-btn, [data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(`modal-${modalId}`);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    const firstInput = modal.querySelector('input, button');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Donation Tier Selection Logic
  const tierButtons = document.querySelectorAll('.tier-btn');
  const customAmountInput = document.getElementById('custom-donation-amount');

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (customAmountInput) {
        customAmountInput.value = '';
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      if (customAmountInput.value) {
        tierButtons.forEach(b => b.classList.remove('selected'));
      }
    });
  }

  // Donation Frequency Buttons
  const freqTabs = document.querySelectorAll('.freq-tab');
  freqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      freqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

/* ==========================================================================
   FORMS & VALIDATION
   ========================================================================== */
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#contact-name').value.trim();
      const email = contactForm.querySelector('#contact-email').value.trim();
      const subject = contactForm.querySelector('#contact-subject').value;
      const message = contactForm.querySelector('#contact-message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        showToast('Required Fields', 'Please complete all required fields.', 'warning');
        return;
      }

      if (!isValidEmail(email)) {
        showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
        return;
      }

      // Simulate loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg> Sending...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast(
          'Message Delivered! 🌱',
          `Thank you ${name}! Our environmental team will reply within 24 hours.`,
          'success'
        );
      }, 750);
    });
  }

  // Donation Form
  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const donorName = donationForm.querySelector('#donor-name').value.trim() || 'Generous Friend';
      const selectedTier = donationForm.querySelector('.tier-btn.selected');
      const customAmount = donationForm.querySelector('#custom-donation-amount').value;
      const amount = customAmount ? `₹${customAmount}` : (selectedTier ? selectedTier.querySelector('.tier-amount').textContent : '₹1,000');

      const submitBtn = donationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Processing...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        donationForm.reset();
        const modal = document.getElementById('modal-donate');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
        showToast(
          'Donation Received! 💚',
          `Thank you ${donorName}! Your gift of ${amount} directly supports tree planting and shoreline revival.`,
          'success'
        );
      }, 700);
    });
  }

  // Join Us / Volunteer Form
  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = volunteerForm.querySelector('#vol-name').value.trim();
      const email = volunteerForm.querySelector('#vol-email').value.trim();
      const role = volunteerForm.querySelector('#vol-role').value;

      if (!name || !email) {
        showToast('Incomplete Form', 'Please enter your name and email.', 'warning');
        return;
      }

      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Registering...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        volunteerForm.reset();
        const modal = document.getElementById('modal-join');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
        showToast(
          'Welcome to the Family! 🌿',
          `Welcome aboard, ${name}! We sent your onboarding volunteer package to ${email}.`,
          'success'
        );
      }, 700);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && isValidEmail(emailInput.value.trim())) {
        showToast('Subscribed! 📬', 'Thank you for subscribing to our monthly conservation bulletin.', 'success');
        newsletterForm.reset();
      } else {
        showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'warning'
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-message">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Auto-remove after 4.2 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4200);
}

/* ==========================================================================
   SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
