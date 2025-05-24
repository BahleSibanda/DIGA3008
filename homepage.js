document.addEventListener('DOMContentLoaded', function() {
  const ovalText = document.getElementById('main-heading');
  const originalText = "Bahle's Biblioteca";
  const newText = "glad you're here";
  
  // Check if we're returning from another page/section
  const isReturningVisit = sessionStorage.getItem('textChanged') === 'true';
  
  // Set initial state based on session storage
  if (isReturningVisit) {
    ovalText.textContent = originalText;
    sessionStorage.removeItem('textChanged');
  }
  
  // Handle click event
  ovalText.addEventListener('click', function() {
    this.textContent = newText;
    this.classList.add('changed');
    
    // Set a timeout to revert after delay (e.g., 5 seconds)
    setTimeout(() => {
      this.classList.remove('changed');
    }, 5000); // 5000ms = 5 seconds
  });
  
  // Track navigation away from current section
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (ovalText.textContent === newText) {
        sessionStorage.setItem('textChanged', 'true');
      }
    });
  });
  
  // Also track scroll to other sections
  window.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about-section');
    const rect = aboutSection.getBoundingClientRect();
    
    // If user scrolls to about section
    if (rect.top <= 100) { // 100px from top of viewport
      if (ovalText.textContent === newText) {
        sessionStorage.setItem('textChanged', 'true');
        ovalText.textContent = originalText;
      }
    }
  });
});