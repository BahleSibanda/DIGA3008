document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle reference
    const menuToggle = document.getElementById('menu-toggle');
    
    // Navigation functionality for section switching
    const navLinks = document.querySelectorAll('.nav-link, .scroll-down-button');
    
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
                    
                    // Close mobile menu if open
                    if(menuToggle.checked) {
                        menuToggle.checked = false;
                    }
                    
                    // Smooth scroll to target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Show hero by default
    document.querySelector('.hero').classList.add('active');
    
    // Handle URL hash on page load (deep linking)
    if(window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            
            // Small delay to allow DOM to update
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'auto'
                });
            }, 100);
        }
    }
    
    // Close mobile menu when clicking any menu link
    const mobileLinks = document.querySelectorAll('.menu-slide a, .menulinks a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
    
    // Optional: Auto-hide mobile menu when scrolling
    let lastScrollPosition = window.pageYOffset;
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        if(Math.abs(currentScrollPosition - lastScrollPosition) > 50) {
            if(menuToggle.checked) {
                menuToggle.checked = false;
            }
            lastScrollPosition = currentScrollPosition;
        }
    });
});
