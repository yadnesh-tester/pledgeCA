// ===== Shared Footer & WhatsApp Float =====
(function() {
  var footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.className = 'footer';
  footer.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="index.html" class="footer-logo-text">PledgeCA</a>' +
          '<p>Empowering future Chartered Accountants with structured guidance, expert mentorship, and comprehensive resources.</p>' +
          '<div class="social-links">' +
            '<a href="https://www.facebook.com/share/17qeVA2Spp/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>' +
            '<a href="https://www.instagram.com/pledgeca_official?igsh=MTAyczh0dzB6YzFkdQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div><button class="footer-toggle" aria-expanded="false">Quick Links <span class="chevron">&#9660;</span></button><h4>Quick Links</h4><ul class="footer-links"><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="courses.html">Courses</a></li></ul></div>' +
        '<div><button class="footer-toggle" aria-expanded="false">More Links <span class="chevron">&#9660;</span></button><h4>More Links</h4><ul class="footer-links"><li><a href="contact.html">Contact</a></li><li><a href="index.html#testimonials">Reviews &amp; Testimonials</a></li><li><a href="refund-policy.html">Refund Policy</a></li><li><a href="terms.html">Terms &amp; Conditions</a></li></ul></div>' +
        '<div><button class="footer-toggle" aria-expanded="false">Get in Touch <span class="chevron">&#9660;</span></button><h4>Get in Touch</h4><ul class="footer-contact"><li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 11.07 11.07 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 11.07 11.07 0 002.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:+919764015003">+91 97640 15003</a></li><li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:support@pledgeca.com">support@pledgeca.com</a></li></ul></div>' +
      '</div>' +
      '<div class="footer-bottom">&copy; 2026 PledgeCA. All rights reserved. | Pledging Success</div>' +
    '</div>';

  // WhatsApp float
  var wa = document.createElement('a');
  wa.href = 'https://wa.me/919764015003?text=Hi%20PledgeCA%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20test%20series%20and%20mentorship%20programs';
  wa.className = 'whatsapp-float';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.innerHTML = '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.13 6.742 3.05 9.38L1.054 31.29l6.124-1.96A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.335 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.668-1.218-4.76-1.972-7.824-6.8-8.062-7.114-.23-.314-1.904-2.536-1.904-4.836s1.204-3.432 1.632-3.902c.428-.47.934-.588 1.246-.588.312 0 .624.002.896.016.288.014.674-.11 1.054.804.39.938 1.326 3.238 1.442 3.472.116.234.194.508.04.82-.156.312-.234.508-.468.782-.234.274-.492.612-.702.822-.234.234-.478.488-.206.958.274.47 1.216 2.006 2.612 3.25 1.794 1.598 3.306 2.094 3.776 2.328.47.234.742.196 1.016-.118.274-.314 1.17-1.364 1.482-1.834.312-.47.624-.39 1.054-.234.43.156 2.728 1.286 3.198 1.52.47.234.782.352.898.546.116.196.116 1.12-.274 2.218z"/></svg>';
  footer.parentNode.insertBefore(wa, footer.nextSibling);

  // Footer toggle (mobile collapsible)
  footer.querySelectorAll('.footer-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      var parent = toggle.parentElement;
      if (!parent) return;
      var isExpanded = parent.classList.contains('expanded');
      footer.querySelectorAll('.footer-grid > div:not(.footer-brand)').forEach(function(div) {
        div.classList.remove('expanded');
        var btn = div.querySelector('.footer-toggle');
        if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
      });
      if (!isExpanded) {
        parent.classList.add('expanded');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
