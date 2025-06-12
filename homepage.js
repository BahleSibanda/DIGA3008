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

document.addEventListener('DOMContentLoaded', function() {
    const initParticles = function() {
        const container = document.getElementById('particles-container');
        const aboutSection = document.getElementById('about-section');
        
        if (!container || !aboutSection) return;

        // Clear existing particles
        container.innerHTML = '';

        // Use viewport dimensions
        const width = window.innerWidth;
        const height = aboutSection.offsetHeight;
        const particleCount = Math.min(100, Math.floor(width * height / 2000));

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 8 + 4;
            const posX = Math.random() * width;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            const redShade = Math.floor(Math.random() * 100 + 155);
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}px;
                top: ${height}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                background-color: rgb(${redShade}, ${Math.floor(redShade*0.3)}, ${Math.floor(redShade*0.3)});
            `;
            
            container.appendChild(particle);
        }
    };

    // Initialize on scroll
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initParticles();
        }
    }, { threshold: 0.1 });

    const aboutSection = document.getElementById('about-section');
    if (aboutSection) observer.observe(aboutSection);

    // Handle resize
    window.addEventListener('resize', function() {
        if (document.getElementById('particles-container').children.length > 0) {
            initParticles();
        }
    });
});