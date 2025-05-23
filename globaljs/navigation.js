document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Hide all content sections except hero
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetSection = document.getElementById(targetId);
                if(targetSection) {
                    targetSection.classList.add('active');
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Show hero by default
    document.querySelector('.hero').classList.add('active');
    
    // Handle URL hash on page load
    if(window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.scrollIntoView();
            }, 100);
        }
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.menu-slide a');
    const menuToggle = document.getElementById('menu-toggle');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
});