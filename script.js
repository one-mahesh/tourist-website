// =====================================================
// SMOOTH SCROLLING FOR NAVIGATION
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 50);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 50);
}

// Trigger counter animation on scroll
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const values = { '10': 10, '7': 7, '5000': 5000, '∞': '∞' };
      entry.target.querySelectorAll('h3').forEach(h3 => {
        const text = h3.textContent;
        if (text === '∞') {
          h3.textContent = '∞';
        } else {
          const num = parseInt(text);
          if (!isNaN(num)) {
            animateCounter(h3, num);
          }
        }
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card').forEach(card => {
  counterObserver.observe(card);
});

// Intersection Observer for animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe destination cards for animation
document.querySelectorAll('.destination-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Search Filter Functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
      const h3 = card.querySelector('h3');
      const destinationName = h3 ? h3.textContent.toLowerCase() : '';
      
      if (destinationName.includes(searchTerm)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.3s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
}

// Add click effect to stat cards
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.05)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Legacy function for old page links
function openPage(page) {
  window.location.href = page;
}