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
