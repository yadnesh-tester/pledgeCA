// ===== PledgeCA Auth - Navbar User State =====
(function() {
  const user = JSON.parse(localStorage.getItem('pledgeca_current') || 'null');
  if (!user) return;

  const firstName = user.name.split(' ')[0];
  const initial = user.name.charAt(0).toUpperCase();

  // Replace all Login buttons in navbar with user avatar + name
  document.querySelectorAll('.nav-cta').forEach(function(cta) {
    const link = cta.querySelector('a');
    if (link && (link.textContent.trim() === 'Login' || link.href.includes('login.html'))) {
      cta.innerHTML =
        '<a href="login.html" class="nav-user-btn">' +
        '<span class="nav-user-avatar">' + initial + '</span>' +
        '<span class="nav-user-name">' + firstName + '</span>' +
        '</a>';
    }
  });

  // Replace mobile bottom bar Login button
  document.querySelectorAll('.mobile-bottom-bar-inner a').forEach(function(link) {
    if (link.textContent.trim() === 'Login' && link.href.includes('login.html')) {
      link.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"/><circle cx="12" cy="7" r="4"/></svg> ' + firstName;
    }
  });
})();
