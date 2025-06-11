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
    // Particle effect script
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('particles-container');
        const aboutSection = document.getElementById('about-section');
        
        // Create particles
        function createParticles() {
            const particleCount = 30;
            const sectionHeight = aboutSection.offsetHeight;
            const sectionWidth = aboutSection.offsetWidth;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties for each particle
                const size = Math.random() * 10 + 5;
                const posX = Math.random() * sectionWidth;
                const posY = Math.random() * sectionHeight;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                const redShade = Math.floor(Math.random() * 100 + 155);
                const opacity = Math.random() * 0.5 + 0.3;
                
                // Apply styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.backgroundColor = `rgb(${redShade}, ${Math.floor(redShade*0.3)}, ${Math.floor(redShade*0.3)})`;
                particle.style.opacity = opacity;
                
                container.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles();
        
        // Recreate particles on resize
        window.addEventListener('resize', function() {
            container.innerHTML = '';
            createParticles();
        });
    });