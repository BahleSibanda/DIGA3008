document.addEventListener("DOMContentLoaded", function() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    project.addEventListener('click', function() {
      // Toggle the flipped class to initiate flip effect
      this.classList.toggle('flipped');
    });
  });
});
