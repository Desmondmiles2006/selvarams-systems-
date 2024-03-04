document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul a');
    const scrollDuration = 800; // Duration of scroll animation in milliseconds
    const scrollOffset = 100; // Offset for scroll-to-top button visibility
  
    navLinks.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });
  
    function smoothScroll(e) {
      e.preventDefault();
  
      const targetId = e.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        const targetOffset = targetSection.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetOffset - startPosition;
        let startTime = null;
  
        function scrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const scrollProgress = Math.min(timeElapsed / scrollDuration, 1);
          const ease = easeInOutQuad(scrollProgress);
          window.scrollTo(0, startPosition + distance * ease);
  
          if (timeElapsed < scrollDuration) {
            requestAnimationFrame(scrollAnimation);
          }
        }
  
        requestAnimationFrame(scrollAnimation);
      }
    }
  
    // Easing function
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  
    // Highlight active navigation link based on scroll position
    window.addEventListener('scroll', highlightActiveLink);
  
    function highlightActiveLink() {
      const fromTop = window.scrollY;
  
      navLinks.forEach(link => {
        const section = document.getElementById(link.getAttribute('href').substring(1));
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    // Smooth scroll-to-top button
    const scrollToTopButton = document.getElementById('scrollToTop');
  
    scrollToTopButton.addEventListener('click', scrollToTop);
  
    function scrollToTop() {
      const startPosition = window.pageYOffset;
      const distance = -startPosition;
      let startTime = null;
  
      function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollProgress = Math.min(timeElapsed / scrollDuration, 1);
        const ease = easeInOutQuad(scrollProgress);
        window.scrollTo(0, startPosition + distance * ease);
  
        if (timeElapsed < scrollDuration) {
          requestAnimationFrame(scrollAnimation);
        }
      }
  
      requestAnimationFrame(scrollAnimation);
    }
  
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', toggleScrollToTopButton);
  
    function toggleScrollToTopButton() {
      if (window.scrollY > scrollOffset) {
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    }
});
  