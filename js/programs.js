// JavaScript for Academic Programs Section

document.addEventListener('DOMContentLoaded', function() {
  // Initialize program filtering
  initProgramFilter();
});

// Initialize program filtering functionality
function initProgramFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  
  if (!filterButtons.length || !programCards.length) return;
  
  // Add click event to each filter button
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter the program cards
      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Show all or filter by category
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
          // Add animation classes for smooth reveal
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          // Stagger the animations slightly for a nicer effect
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50 * Array.from(programCards).indexOf(card) % 4);
        } else {
          // Hide cards that don't match
          card.classList.add('hide');
        }
      });
    });
  });
}