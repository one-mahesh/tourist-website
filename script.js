// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =====================================================
// FILTER FUNCTIONALITY (Mountain, Beach, City)
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.textContent.toLowerCase().trim();
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter cards
      destinationCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        
        if (filter === 'all') {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          if (cardCategory.includes(filter) || card.textContent.toLowerCase().includes(filter)) {
            card.classList.remove('hidden');
            card.style.display = '';
          } else {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Set first filter button as active
  if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
  }
});

// =====================================================
// INSTANT NAVIGATION (Fast scrolling)
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'auto',
        block: 'start'
      });
    }
  });
});

// Stats Counter Animation (Optimized)
function animateCounter(element, target, duration = 1500) {
  let current = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.floor(target * progress);
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  requestAnimationFrame(update);
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

// Intersection Observer for animations on scroll (Optimized - no animations)
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.05 });

// Observe destination cards
document.querySelectorAll('.destination-card').forEach(card => {
  card.style.opacity = '1';
  observer.observe(card);
});

// Search Filter Functionality (Optimized with debouncing)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  let debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const searchTerm = this.value.toLowerCase();
      const destinationCards = document.querySelectorAll('.destination-card');
      
      destinationCards.forEach(card => {
        const h3 = card.querySelector('h3');
        const destinationName = h3 ? h3.textContent.toLowerCase() : '';
        
        if (destinationName.includes(searchTerm)) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    }, 150);
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