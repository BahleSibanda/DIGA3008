  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    // Get the oval text element
    const ovalText = document.getElementById('main-heading');
    
    // Original and new text
    const originalText = "Bahle's Biblioteca";
    const newText = "glad you're here";
    
    // Change text on click
    ovalText.addEventListener('click', function() {
      if (this.textContent === originalText) {
        this.textContent = newText;
      } else {
        this.textContent = originalText;
      }
    });
    
    // Change text on click with animation
ovalText.addEventListener('click', function() {
  this.classList.add('changing');
  
  setTimeout(() => {
    if (this.textContent === originalText) {
      this.textContent = newText;
    } else {
      this.textContent = originalText;
    }
    this.classList.remove('changing');
  }, 150); // Matches half the animation duration
});
  });