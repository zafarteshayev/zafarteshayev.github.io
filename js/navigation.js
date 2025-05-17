// Navigation Related JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  initMobileMenu();
  
  // Dropdown menu behavior
  initDropdownMenus();
});

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Toggle aria-expanded attribute for accessibility
      const isExpanded = navLinks.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      
      // Prevent background scrolling when menu is open
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

// Initialize dropdown menus
function initDropdownMenus() {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  
  // Check if on mobile
  function isMobile() {
    return window.innerWidth <= 991;
  }
  
  // Set up dropdown behavior
  dropdownItems.forEach(item => {
    // Touch/click event handler
    item.addEventListener('click', function(e) {
      if (isMobile()) {
        // Only handle clicks on the direct child <a> for mobile
        if (e.target === this.querySelector('a')) {
          e.preventDefault();
          
          // Toggle this dropdown
          this.classList.toggle('active');
          
          // Close other dropdowns
          dropdownItems.forEach(otherItem => {
            if (otherItem !== this) {
              otherItem.classList.remove('active');
            }
          });
        }
      }
    });
    
    // Handle hover for desktop
    if (!isMobile()) {
      item.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      item.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
    }
  });
  
  // Handle window resize to reset mobile menu state
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      document.body.style.overflow = '';
      
      // Reset mobile menu
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
      
      // Reset dropdowns
      dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}