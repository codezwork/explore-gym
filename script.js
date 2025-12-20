// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Free Trial button scroll to trial section
const freeTrialBtn = document.querySelector('.hero .btn-primary[data-scroll-to="trial"]');
if (freeTrialBtn) {
  freeTrialBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const trialSection = document.querySelector('.trial');
    if (trialSection) {
      const headerOffset = 80;
      const elementPosition = trialSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to sections and observe them
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add fade-in to cards
  const cards = document.querySelectorAll('.service-card, .pricing-card, .trainer-card, .story-card, .feature');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// Form submission
const trialForm = document.querySelector('.trial-form');
if (trialForm) {
  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(trialForm);
    const name = trialForm.querySelector('input[type="text"]').value;
    const email = trialForm.querySelector('input[type="email"]').value;
    const phone = trialForm.querySelector('input[type="tel"]').value;
    
    // Simple validation
    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = trialForm.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you! We will contact you soon to schedule your free trial.');
      trialForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('featured')) {
      card.style.transform = 'scale(1.05)';
    } else {
      card.style.transform = 'translateY(0) scale(1)';
    }
  });
});

// Service card interactions
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 15px 40px rgba(229, 62, 62, 0.4)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 10px 30px rgba(229, 62, 62, 0.3)';
  });
});

// Trainer card interactions
document.querySelectorAll('.trainer-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const img = card.querySelector('img');
    img.style.transform = 'scale(1.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('img');
    img.style.transform = 'scale(1)';
  });
});

// Facilities image hover effects
document.querySelectorAll('.facilities-grid img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.filter = 'brightness(1.2)';
  });
  
  img.addEventListener('mouseleave', () => {
    img.style.filter = 'brightness(1)';
  });
});

// Counter animation for stats (if you want to add animated counters)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background img');
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Button click animations
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Schedule table responsiveness
function handleScheduleTable() {
  const table = document.querySelector('.schedule-table');
  if (window.innerWidth < 768) {
    table.style.fontSize = '0.7rem';
  } else {
    table.style.fontSize = '1rem';
  }
}

window.addEventListener('resize', handleScheduleTable);
handleScheduleTable();

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}