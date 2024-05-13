document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const typedTextSpan = document.querySelector('.typed-text');
  const sidebar = document.querySelector('.container');

  const showSidebar = () => {
    navList.style.display = 'block'; 
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.zIndex = '100';
    sidebar.classList.remove('sm:hidden'); 
  };
  
  const hideSidebar = () => {
    navList.style.display = 'none'; 
    sidebar.style.transform = 'translateX(-100%)';
    sidebar.classList.add('sm:hidden'); 
  };

// Event listener for hamburger menu
hamburger.addEventListener('click', () => {
  if (navList.style.display === 'none' || navList.style.display === '') {
    showSidebar(); 
  } else {
    hideSidebar(); 
  }
});
  // Smooth scroll to section
  const smoothScrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Make navigation link active
  const makeNavLinkActive = (targetId) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    const navLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
    if (navLink) {
      navLink.classList.add('active');
    }
  };

  // Handle click event for navigation links
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    smoothScrollToSection(targetId);
    makeNavLinkActive(targetId);
  };

  // Add click event listener to each navigation link
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', handleClick);
  });

  // Check if section is in viewport
  const isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    const halfViewportHeight = window.innerHeight / 2;
    return (
      bounding.top <= (window.innerHeight - halfViewportHeight) &&
      bounding.bottom >= halfViewportHeight 
    );
  };

  // Handle scroll event
  const handleScroll = () => {
    sections.forEach(section => {
      if (isInViewport(section)) {
        makeNavLinkActive(section.id);
      }
    });
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Typewriter effect
  const typeWriter = (textArray, typingDelay, erasingDelay, newTextDelay) => {
    let textArrayIndex = 0;
    let charIndex = 0;

    const type = () => {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
      }
    };

    // Start typing
    const start = () => {
      if (textArray.length) setTimeout(type, newTextDelay + 250);
    };

    return { start };
  };

  // Initialize typewriter instance
  const typeWriterInstance = typeWriter(
    ["Front-End Developer", "Web Designer", "UI / UX Designer", "Web Developer"],
    100,
    100,
    2000
  );
  typeWriterInstance.start();
});