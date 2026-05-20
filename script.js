document.addEventListener('DOMContentLoaded', () => {
  // Hero animation reveal (homepage)
  const heroContent = document.getElementById('hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.remove('opacity-0', 'translate-y-8');
      heroContent.classList.add('opacity-100', 'translate-y-0');
    }, 300);
  }

  // Parallax for hero image (homepage)
  const heroImage = document.getElementById('hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      if (scroll < window.innerHeight) {
        heroImage.style.transform = `translateY(${scroll * 0.4}px) scale(1.1)`;
      }
    }, { passive: true });
  }

  // Intersection Observer — scroll reveal for sections
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section > div, header > div').forEach(el => {
    if (!el.closest('nav') && !el.classList.contains('reveal-service')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
      revealObserver.observe(el);
    }
  });

  // Services page: reveal-service scroll animation
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-service').forEach(el => serviceObserver.observe(el));

  // Nav scroll behavior
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(255, 248, 245, 0.97)';
        nav.style.boxShadow = '0 1px 0 rgba(209, 197, 180, 0.4)';
      } else {
        nav.style.backgroundColor = 'rgba(255, 248, 245, 0.80)';
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // Mobile hamburger menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('ham-open');
      menuToggle.classList.toggle('ham-open');
      mobileMenu.classList.toggle('hidden');
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('ham-open');
        mobileMenu.classList.add('hidden');
      });
    });
    // Close menu on scroll
    window.addEventListener('scroll', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        menuToggle.classList.remove('ham-open');
        mobileMenu.classList.add('hidden');
      }
    }, { passive: true });
  }
});
