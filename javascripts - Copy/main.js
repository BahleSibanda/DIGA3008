document.addEventListener('DOMContentLoaded', function() {
  // Footer code
  const footerContainer = document.createElement('div');
  footerContainer.id = 'footer-container';
  document.body.appendChild(footerContainer);
  
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.minHeight = '100vh';
  
  const main = document.querySelector('main');
  if (main) {
    main.style.flex = '1';
  }

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

  // Back to top button code
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