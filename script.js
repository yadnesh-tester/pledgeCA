// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('mobileOverlay');
const drawerClose = document.querySelector('.nav-drawer-close');

function closeMenu() {
  navLinks.classList.remove('active');
  menuToggle.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  navLinks.classList.add('active');
  menuToggle.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

menuToggle.addEventListener('click', () => {
  navLinks.classList.contains('active') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

if (drawerClose) {
  drawerClose.addEventListener('click', closeMenu);
}

// ===== Collapsible footer sections (mobile) =====
document.querySelectorAll('.footer-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.parentElement;
    if (!parent) return;
    const isExpanded = parent.classList.contains('expanded');

    document.querySelectorAll('.footer-grid > div:not(.footer-brand)').forEach(div => {
      div.classList.remove('expanded');
      const btn = div.querySelector('.footer-toggle');
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (!isExpanded) {
      parent.classList.add('expanded');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Scroll reveal animations =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth counter animation =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const end = target.getAttribute('data-count');
      const suffix = target.getAttribute('data-suffix') || '';
      const prefix = target.getAttribute('data-prefix') || '';
      const isFloat = end.includes('.');
      const endVal = parseFloat(end);
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = isFloat
          ? (eased * endVal).toFixed(1)
          : Math.floor(eased * endVal);
        target.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ===== Infinite Testimonials Carousel =====
(function() {
  const track = document.getElementById('testiTrack');
  if (!track) return;

  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const cards = Array.from(track.children);
  const totalCards = cards.length;

  function getPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  let perView = getPerView();
  let currentIndex = 0;
  let isTransitioning = false;

  // Clone cards for infinite loop: clone last `perView` to front, first `perView` to end
  function setupClones() {
    // Remove existing clones
    track.querySelectorAll('.clone').forEach(c => c.remove());

    perView = getPerView();
    const frontClones = [];
    const backClones = [];

    for (let i = 0; i < perView; i++) {
      const backClone = cards[i].cloneNode(true);
      backClone.classList.add('clone');
      backClones.push(backClone);
    }
    for (let i = totalCards - perView; i < totalCards; i++) {
      const frontClone = cards[i].cloneNode(true);
      frontClone.classList.add('clone');
      frontClones.push(frontClone);
    }

    frontClones.forEach(c => track.insertBefore(c, track.firstChild));
    backClones.forEach(c => track.appendChild(c));
  }

  function getCardWidth() {
    const allCards = track.querySelectorAll('.testi-card');
    if (allCards.length === 0) return 0;
    const style = getComputedStyle(allCards[0]);
    return allCards[0].offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  function goTo(index, animate) {
    if (animate === undefined) animate = true;
    const cardWidth = getCardWidth();
    const offset = (index + perView) * cardWidth;

    if (!animate) {
      track.classList.add('no-transition');
    } else {
      track.classList.remove('no-transition');
    }

    track.style.transform = 'translateX(-' + offset + 'px)';
    currentIndex = index;

    if (!animate) {
      // Force reflow
      track.offsetHeight;
      track.classList.remove('no-transition');
    }
  }

  function next() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex += perView;
    goTo(currentIndex, true);
  }

  function prev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex -= perView;
    goTo(currentIndex, true);
  }

  // After transition ends, check if we need to jump to the real position
  track.addEventListener('transitionend', () => {
    isTransitioning = false;

    if (currentIndex >= totalCards) {
      goTo(currentIndex - totalCards, false);
    } else if (currentIndex < 0) {
      goTo(currentIndex + totalCards, false);
    }
  });

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Touch/swipe support
  let startX = 0;
  let deltaX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) next();
      else prev();
    }
    deltaX = 0;
  });

  // Initialize
  setupClones();
  goTo(0, false);

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newPerView = getPerView();
      if (newPerView !== perView) {
        setupClones();
        currentIndex = 0;
      }
      goTo(currentIndex, false);
    }, 250);
  });

  // Auto-play (optional: every 5 seconds)
  let autoPlay = setInterval(next, 5000);

  // Pause on hover
  const wrapper = document.querySelector('.carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
    wrapper.addEventListener('mouseleave', () => { autoPlay = setInterval(next, 5000); });
  }
})();

// ===== Contact form with validation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const firstName = contactForm.querySelector('#firstName');
    const lastName = contactForm.querySelector('#lastName');
    const phone = contactForm.querySelector('#phone');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    let isValid = true;

    [firstName, lastName, phone, email, message].forEach(field => {
      if (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        }
      }
    });

    // Email format check
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Phone format check (Indian mobile)
    if (phone && phone.value && !/^[\+]?[\d\s\-]{10,15}$/.test(phone.value.replace(/\s/g, ''))) {
      phone.style.borderColor = '#ef4444';
      isValid = false;
    }

    if (!isValid) return;

    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#0ea5a0';
    btn.style.borderColor = '#0ea5a0';
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}
