document.addEventListener('DOMContentLoaded', function() {
  // Create a container div for the footer
  const footerContainer = document.createElement('div');
  footerContainer.id = 'footer-container';
  
  // Add it to the end of the body immediately
  document.body.appendChild(footerContainer);
  
  // Set the body to flex layout (in case it's not in CSS yet)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.minHeight = '100vh';
  
  // Make sure main content expands
  const main = document.querySelector('main');
  if (main) {
    main.style.flex = '1';
  }

  // Now load the footer content
  fetch('../footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Footer not found');
      return response.text();
    })
    .then(data => {
      footerContainer.innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      // Fallback footer
      footerContainer.innerHTML = `
        <footer>
          <div class="footer-content">
            &copy; Bahle's Biblioteca 2025. All rights reserved.
            <div class="social-links">
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        </footer>
      `;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});