// JavaScript for Sliders and Carousels

document.addEventListener('DOMContentLoaded', function() {
  // Initialize campus life slider
  initCampusSlider();
  
  // Initialize testimonial slider
  initTestimonialSlider();
});

// Initialize the campus life image slider
function initCampusSlider() {
  const slides = document.querySelectorAll('.campus-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds per slide
  
  // Function to show a specific slide
  function showSlide(index) {
    // Remove all active classes
    slides.forEach(slide => {
      slide.classList.remove('active', 'prev');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add prev class to current slide (for transition out)
    slides[currentSlide].classList.add('prev');
    
    // Update current slide index
    currentSlide = index;
    
    // Add active class to new current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Function to go to the next slide
  function nextSlide() {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }
  
  // Function to go to the previous slide
  function prevSlide() {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }
  
  // Start automatic slideshow
  function startSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, slideDuration);
  }
  
  // Pause slideshow on interaction
  function pauseSlideshow() {
    clearInterval(slideInterval);
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      pauseSlideshow();
      showSlide(index);
      startSlideshow();
    });
  });
  
  // Event listeners for arrows
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      pauseSlideshow();
      prevSlide();
      startSlideshow();
    });
    
    nextBtn.addEventListener('click', function() {
      pauseSlideshow();
      nextSlide();
      startSlideshow();
    });
  }
  
  // Start the slideshow
  startSlideshow();
  
  // Pause slideshow when user interacts with the slider
  const sliderContainer = document.querySelector('.campus-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', pauseSlideshow);
    sliderContainer.addEventListener('mouseleave', startSlideshow);
    sliderContainer.addEventListener('touchstart', pauseSlideshow, { passive: true });
    sliderContainer.addEventListener('touchend', startSlideshow, { passive: true });
  }
}

// Initialize the testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (!testimonials.length || !dots.length) return;
  
  let currentTestimonial = 0;
  let testimonialInterval;
  const testimonialDuration = 8000; // 8 seconds per testimonial
  
  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Remove all active classes
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Update current testimonial index
    currentTestimonial = index;
    
    // Add active class to new current testimonial
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
  }
  
  // Function to go to the next testimonial
  function nextTestimonial() {
    const newIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(newIndex);
  }
  
  // Start automatic testimonial rotation
  function startTestimonialRotation() {
    if (testimonialInterval) {
      clearInterval(testimonialInterval);
    }
    testimonialInterval = setInterval(nextTestimonial, testimonialDuration);
  }
  
  // Pause testimonial rotation on interaction
  function pauseTestimonialRotation() {
    clearInterval(testimonialInterval);
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      pauseTestimonialRotation();
      showTestimonial(index);
      startTestimonialRotation();
    });
  });
  
  // Start the testimonial rotation
  startTestimonialRotation();
}