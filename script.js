// 1. Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// 2. Smooth Scrolling (Modified to not interfere with cross-page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Only prevent default if we are on the same page
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.offsetTop;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
  });
});

// 3. Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
});

// 4. Highlight Service Logic (For Services Page)
document.addEventListener('DOMContentLoaded', () => {
    // Check if there is a hash in the URL (e.g., services.html#strength)
    if (window.location.hash) {
        const hash = window.location.hash; // e.g., "#strength"
        const targetElement = document.querySelector(hash);
        
        if (targetElement) {
            // Scroll to element
            setTimeout(() => {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add Highlight Class
                targetElement.classList.add('highlight-effect');
                
                // Remove highlight after a few seconds (optional)
                setTimeout(() => {
                    targetElement.classList.remove('highlight-effect');
                    targetElement.style.borderColor = '#e53e3e'; // Keep border
                }, 3000);
            }, 300); // Small delay to ensure page load
        }
    }
});

// 5. Trainer Modal Logic
const trainerCard = document.querySelector('.trainer-card'); // Or querySelectorAll if multiple
const modal = document.getElementById('trainer-modal');
const closeModalBtn = document.getElementById('close-modal');

if (trainerCard && modal) {
    trainerCard.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// 6. Intersection Observer for Fade In
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card, .pricing-card, .trainer-card, .detail-card');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    // Stagger animation slightly
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});