// Main JavaScript File

// Add event listener for when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize dynamic header behavior
  initHeaderBehavior();
  
  // Initialize animations for elements with 'animate-in' class
  initAnimations();
});

// Initialize header behavior (transparent to solid on scroll)
function initHeaderBehavior() {
  const header = document.getElementById('header');
  
  // Function to handle scroll events
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Initial check on page load
  handleScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
}

// Initialize animations for elements that should animate when they become visible
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-in');
  
  // If IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If element is in viewport
        if (entry.isIntersecting) {
          // Add a style to override the animation delay if needed
          entry.target.style.animationDelay = entry.target.classList.contains('delay-1') ? '0.2s' : 
                                              entry.target.classList.contains('delay-2') ? '0.4s' : 
                                              entry.target.classList.contains('delay-3') ? '0.6s' : '0s';
          
          // Add the visibility class
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Stop observing the element after it's animated
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animatedElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
}