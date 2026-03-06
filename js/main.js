// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(27, 79, 114, 0.98)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'var(--primary)';
    navbar.style.backdropFilter = 'none';
  }
});

// ============ COUNTER ANIMATION ============
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    if (counter.dataset.animated) return;

    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      counter.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    counter.dataset.animated = 'true';
    requestAnimationFrame(update);
  });
}

// ============ SCROLL ANIMATIONS ============
function handleScrollAnimations() {
  // Counter animation
  const statsSection = document.getElementById('statistics');
  if (statsSection) {
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      animateCounters();
    }
  }

  // Fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

// Add fade-in class to sections
document.querySelectorAll('.section > .container').forEach(el => {
  el.classList.add('fade-in');
});

window.addEventListener('scroll', handleScrollAnimations, { passive: true });
// Trigger once on load
handleScrollAnimations();

// ============ TEAM ACCORDION ============
document.querySelectorAll('.team-group-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const group = toggle.dataset.group;
    const content = document.getElementById(group);
    const isActive = toggle.classList.contains('active');

    // Close all
    document.querySelectorAll('.team-group-toggle').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.team-group-content').forEach(c => c.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) {
      toggle.classList.add('active');
      content.classList.add('active');
    }
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = '#ffffff';
        link.style.background = 'rgba(255, 255, 255, 0.15)';
      } else {
        link.style.color = '';
        link.style.background = '';
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink, { passive: true });
