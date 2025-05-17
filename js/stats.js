// JavaScript for Animated Statistics Counter

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the stats counter animation
  initStatsCounter();
});

// Initialize the animated statistics counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (!statNumbers.length) return;
  
  let animated = false;
  
  // Function to animate the counters
  function animateCounters() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
      const targetValue = parseInt(stat.getAttribute('data-count'));
      let currentValue = 0;
      const duration = 2000; // 2 seconds
      const increment = targetValue / (duration / 16); // 60fps (roughly)
      
      // Start counter animation
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(counter);
        }
        stat.textContent = Math.floor(currentValue).toLocaleString();
      }, 16);
    });
    
    animated = true;
  }
  
  // Check if elements are in the viewport
  function checkIfInView() {
    const stats = document.querySelector('.stats');
    if (!stats) return;
    
    const elementTop = stats.getBoundingClientRect().top;
    const elementHeight = stats.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // If stats section is visible
    if (elementTop < windowHeight - elementHeight / 2) {
      animateCounters();
      // Remove scroll listener once animated
      window.removeEventListener('scroll', checkIfInView);
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', checkIfInView);
  
  // Check on load (in case stats are already visible)
  checkIfInView();
}