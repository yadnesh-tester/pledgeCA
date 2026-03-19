# PledgeCA - Project Structure & Documentation

## Overview
PledgeCA is a static website for CA, CS, and CMA exam preparation services. It features test series pages, mentorship information, a contact form, and student signup - all built with vanilla HTML/CSS/JS (no frameworks).

---

## File Structure

```
pledgeCA/
|-- index.html              # Homepage (hero, services, testimonials, FAQ)
|-- about.html              # About Us page
|-- services.html           # Services overview (mentoring + test series)
|-- courses.html            # Course selector (CA/CS/CMA > levels)
|-- contact.html            # Contact form with Google Sheet integration
|-- login.html              # Student signup/login with dashboard
|
|-- foundation.html         # CA Foundation - mocks & plans
|-- intermediate.html       # CA Intermediate - mocks & plans
|-- final.html              # CA Final - mocks & plans
|
|-- cs-foundation.html      # CS Foundation - mocks & plans
|-- cs-executive.html       # CS Executive - mocks & plans
|-- cs-professional.html    # CS Professional - mocks & plans
|
|-- cma-foundation.html     # CMA Foundation - mocks & plans
|-- cma-intermediate.html   # CMA Intermediate - mocks & plans
|-- cma-final.html          # CMA Final - mocks & plans
|
|-- refund-policy.html      # Refund policy page
|-- terms.html              # Terms & conditions page
|
|-- styles.css              # All CSS (single file, 1007 lines)
|-- nav.js                  # Shared navbar + mobile menu + bottom bar
|-- footer.js               # Shared footer + WhatsApp float button
|-- script.js               # Animations, carousel, contact form
|-- auth.js                 # Login state display in navbar
|
|-- images/
|   |-- logo.png            # Logo with transparent background
|   |-- logo.webp           # Logo in WebP format (unused, kept as backup)
|
|-- sitemap.xml             # SEO sitemap (all 17 pages)
|-- robots.txt              # Search engine crawl rules
|-- STRUCTURE.md            # This file
```

---

## Shared Components (Single Source of Truth)

### nav.js - Navbar & Mobile UI
Injected into every page via `<nav id="site-nav"></nav>` placeholder.

**Handles:**
- Logo + navigation links (Home, About, Services, Courses, Contact, Login)
- Auto-detects current page and highlights active link
- Mobile hamburger menu with slide-in drawer
- Mobile overlay (click to close menu)
- Mobile bottom bar (Call Now + Contact Now)
- Navbar scroll effect on homepage (transparent to solid)

### footer.js - Footer & WhatsApp
Injected into every page via `<footer id="site-footer"></footer>` placeholder.

**Handles:**
- 4-column footer: Brand info, Quick Links, More Links, Get in Touch
- Social media links (Facebook, Instagram)
- Floating WhatsApp chat button
- Mobile collapsible footer sections

### auth.js - Login State
- Checks localStorage for logged-in user
- Replaces "Login" button with user avatar + name in navbar

---

## Page Flow & Navigation

```
Homepage (index.html)
  |-- Trust Bar: CA/CS/CMA buttons --> courses.html#ca / #cs / #cma
  |-- "Explore Services" --> courses.html
  |-- "Book Free Counseling" --> contact.html
  |
  |-- courses.html (Step 1: Pick exam)
  |     |-- CA --> Step 2: Foundation / Intermediate / Final
  |     |     |-- Each level --> Dedicated test series page
  |     |          |-- foundation.html (2 plans: Moderate, Advance)
  |     |          |-- intermediate.html (3 plans: Moderate, Advance, Premium)
  |     |          |-- final.html (3 plans: Moderate, Advance, Premium)
  |     |
  |     |-- CS --> Step 2: Foundation / Executive / Professional
  |     |     |-- cs-foundation.html / cs-executive.html / cs-professional.html
  |     |
  |     |-- CMA --> Step 2: Foundation / Intermediate / Final
  |           |-- cma-foundation.html / cma-intermediate.html / cma-final.html
```

---

## External Services

| Service | Purpose | Configuration |
|---------|---------|---------------|
| Google Sheets (Apps Script) | Receives signup + contact form data | URL in login.html and contact.html |
| Google Fonts | Inter + Plus Jakarta Sans typefaces | Loaded via CSS link in each HTML head |
| WhatsApp API (wa.me) | Floating chat button on all pages | Configured in footer.js |
| Unsplash | Hero section image on homepage | Direct image URL in index.html |

### Google Sheet Integration
- **Signup form** (login.html): Sends name, phone, email, source="Signup"
- **Contact form** (contact.html + script.js): Sends name, phone, email, message, source="Contact Form"
- Both use `fetch()` with `mode: 'no-cors'`
- Sheet columns: Timestamp | Name | Phone | Email | Message | Source

---

## SEO Implementation

| Feature | Coverage |
|---------|----------|
| Meta descriptions | All 17 pages |
| Canonical URLs | All 17 pages (https://pledgeca.com/) |
| Open Graph tags | All 17 pages |
| Twitter Cards | All 17 pages |
| BreadcrumbList schema | All 17 pages |
| Course schema (JSON-LD) | All 9 test series pages + courses.html |
| FAQPage schema | Homepage |
| EducationalOrganization schema | Homepage |
| AboutPage schema | About page |
| ContactPage schema | Contact page |
| Service schema | Services page |
| sitemap.xml | All 17 pages with priorities |
| robots.txt | Configured |

---

## CSS Architecture (styles.css)

| Section | Description |
|---------|-------------|
| :root variables | Colors, spacing, shadows, fonts, transitions |
| Reset & base | Box-sizing, smooth scroll, body defaults |
| Buttons | .btn, .btn-gold, .btn-navy, .btn-ghost, .btn-lg |
| Navbar | Fixed top bar, blur backdrop, mobile drawer |
| Hero | Full-width hero with gradient overlay |
| Trust bar | 4-column icon strip below hero |
| Sections | About, services, why-pledgeca, counseling, process |
| Testimonials | Carousel with cards, stars, read-more |
| FAQ | Collapsible details/summary elements |
| CTA | Call-to-action banner sections |
| Footer | 4-column grid, mobile collapsible |
| Test series | Mock cards grid, plan comparison cards |
| Forms | Contact form, login/signup forms |
| Responsive | Breakpoints: 1024px, 768px, 480px |

---

## Hosting on Hostinger

### Setup Steps
1. Upload all files to `public_html/` directory
2. Ensure `index.html` is the default document
3. Point domain DNS to Hostinger nameservers
4. Enable SSL certificate (free with Hostinger)
5. Set up email forwarding for support@pledgeca.com

### Hostinger-Specific Optimizations
- Enable Gzip compression in Hostinger dashboard
- Enable browser caching via Hostinger's cache manager
- Enable Cloudflare CDN if available in your plan
- Set PHP version (not needed - static site)

### Post-Deploy Checklist
- [ ] Verify all pages load correctly
- [ ] Test contact form submission (check Google Sheet)
- [ ] Test signup form (check Google Sheet)
- [ ] Test WhatsApp button on mobile
- [ ] Test mobile hamburger menu
- [ ] Submit sitemap to Google Search Console
- [ ] Verify SSL certificate is active (https://)
- [ ] Test all internal links
- [ ] Check PageSpeed Insights score

---

## Authentication Note
The login/signup system uses browser localStorage (client-side only). Passwords are stored in plain text in the browser. This is suitable for a basic lead capture flow but should be replaced with a proper backend for production user authentication.

---

## Contact Information (Hardcoded)
- Phone: +91 97640 15003
- Email: support@pledgeca.com
- WhatsApp: Same phone number
- Facebook: facebook.com/share/17qeVA2Spp/
- Instagram: @pledgeca_official
