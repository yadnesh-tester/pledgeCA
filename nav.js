// ===== Shared Navbar, Mobile Overlay & Mobile Bottom Bar =====
(function() {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  // Detect current page
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  var isHome = (page === 'index.html' || page === '' || page === '/');

  // Set nav element attributes
  nav.className = isHome ? 'navbar' : 'navbar scrolled';
  nav.id = 'navbar';

  // Helper: return ' active' if href matches current page
  function activeClass(href) {
    if (href === 'index.html') {
      return isHome ? ' active' : '';
    }
    return (page === href) ? ' active' : '';
  }

  // Build navbar inner HTML
  nav.innerHTML =
    '<div class="container nav-inner">' +
      '<a href="index.html"><img src="images/logo.png" alt="PledgeCA" class="logo-img"></a>' +
      '<ul class="nav-links" id="navLinks">' +
        '<li class="nav-drawer-header"><button class="nav-drawer-close" aria-label="Close menu">&times;</button></li>' +
        '<li><a href="index.html"' + (activeClass('index.html') ? ' class="active"' : '') + '>Home</a></li>' +
        '<li><a href="about.html"' + (activeClass('about.html') ? ' class="active"' : '') + '>About Us</a></li>' +
        '<li><a href="services.html"' + (activeClass('services.html') ? ' class="active"' : '') + '>Services</a></li>' +
        '<li><a href="courses.html"' + (activeClass('courses.html') ? ' class="active"' : '') + '>Courses</a></li>' +
        '<li><a href="contact.html"' + (activeClass('contact.html') ? ' class="active"' : '') + '>Contact</a></li>' +
        '<li class="nav-cta"><a href="login.html" class="btn btn-gold' + activeClass('login.html') + '">Login</a></li>' +
      '</ul>' +
      '<button class="menu-toggle" id="menuToggle" aria-label="Menu"><span></span></button>' +
    '</div>';

  // Create mobile overlay
  var overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  overlay.id = 'mobileOverlay';
  nav.parentNode.insertBefore(overlay, nav.nextSibling);

  // Create mobile bottom bar
  var bottomBar = document.createElement('div');
  bottomBar.className = 'mobile-bottom-bar';
  bottomBar.innerHTML =
    '<div class="mobile-bottom-bar-inner">' +
      '<a href="tel:+919764015003" class="btn-call">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 11.07 11.07 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 11.07 11.07 0 002.81.7A2 2 0 0122 16.92z"/>' +
        '</svg> Call Now' +
      '</a>' +
      '<a href="contact.html" class="btn btn-gold">Contact Now</a>' +
    '</div>';
  overlay.parentNode.insertBefore(bottomBar, overlay.nextSibling);

  // ===== Mobile menu toggle handlers =====
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  var drawerClose = nav.querySelector('.nav-drawer-close');

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

  menuToggle.addEventListener('click', function() {
    navLinks.classList.contains('active') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMenu);
  }

  // ===== Navbar scroll effect (homepage only) =====
  if (isHome) {
    var scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          nav.classList.toggle('scrolled', window.scrollY > 40);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }
})();
