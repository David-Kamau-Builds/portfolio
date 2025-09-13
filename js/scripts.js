document.addEventListener("DOMContentLoaded", function () {
  // Load security utilities
  const securityScript = document.createElement('script');
  securityScript.src = 'js/security-utils.js';
  document.head.appendChild(securityScript);
  
  const contentSecurityScript = document.createElement('script');
  contentSecurityScript.src = 'js/content-security.js';
  document.head.appendChild(contentSecurityScript);

  // Initialize Bootstrap components with error handling
  try {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      try {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      } catch (error) {
        console.error('Error initializing tooltip:', error);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('Error initializing Bootstrap tooltips:', error);
  }
  
  // Backend project animation with error handling
  const animateBackendProjects = () => {
    try {
      const backendProjects = document.querySelectorAll('.backend-project');
      
      if (backendProjects.length === 0) return;
      
      // Add hover effects for backend projects
      backendProjects.forEach(project => {
        try {
          const diagramItems = project.querySelectorAll('.diagram-item');
          
          project.addEventListener('mouseenter', () => {
            try {
              diagramItems.forEach((item, index) => {
                setTimeout(() => {
                  try {
                    item.style.transform = 'scale(1.2)';
                  } catch (error) {
                    console.error('Error animating diagram item:', error);
                  }
                }, index * 150);
              });
            } catch (error) {
              console.error('Error in mouseenter handler:', error);
            }
          });
          
          project.addEventListener('mouseleave', () => {
            try {
              diagramItems.forEach(item => {
                item.style.transform = 'scale(1)';
              });
            } catch (error) {
              console.error('Error in mouseleave handler:', error);
            }
          });
        } catch (error) {
          console.error('Error setting up project animations:', error);
        }
      });
    } catch (error) {
      console.error('Error in animateBackendProjects:', error);
    }
  };
  
  // Initialize backend project animations
  animateBackendProjects();

  // Navbar scroll effect with error handling
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      try {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      } catch (error) {
        console.error('Error in navbar scroll effect:', error);
      }
    });
  }

  // Use utility functions from utils.js
  const sanitizeInput = window.SecurityUtils?.sanitizeInput || ((input) => input);
  const isValidSelector = window.SecurityUtils?.isValidSelector || (() => true);

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      try {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#" || !isValidSelector(targetId)) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbar = document.querySelector(".navbar");
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false,
            });
            bsCollapse.hide();
          }
        }
      } catch (error) {
        console.error('Error in smooth scrolling:', error);
      }
    });
  });

  // Active nav link highlighting with error handling
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateNavLink() {
    try {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
          current = sanitizeInput(section.getAttribute("id") || '');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = sanitizeInput(link.getAttribute("href") || '');
        if (href === `#${current}`) {
          link.classList.add("active");
        }
      });
    } catch (error) {
      console.error('Error in nav link activation:', error);
    }
  }

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); // Run once on page load
  }



  // Modern Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    const progressCircle = backToTopButton.querySelector('.progress-circle');
    const circumference = 2 * Math.PI * 26; // radius = 26
    
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const offset = circumference - (scrollPercent * circumference);
      
      if (progressCircle) {
        progressCircle.style.strokeDashoffset = offset;
      }
      
      // Show/hide button
      if (scrollTop > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    backToTopButton.addEventListener('click', () => {
      // Add click animation
      backToTopButton.classList.add('clicked');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        backToTopButton.classList.remove('clicked');
      }, 600);
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile menu management
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  if (navbarCollapse && navbarToggler && mobileMenuOverlay) {
    // Handle menu toggle
    navbarToggler.addEventListener('click', function() {
      try {
        const isMenuOpen = navbarCollapse.classList.contains('show');
        if (!isMenuOpen) {
          // Menu is about to open
          setTimeout(() => {
            mobileMenuOverlay.classList.add('show');
            document.body.classList.add('menu-open');
          }, 50);
        }
      } catch (error) {
        console.error('Error in menu toggle handler:', error);
      }
    });
    
    // Handle Bootstrap collapse events
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
      try {
        mobileMenuOverlay.classList.remove('show');
        document.body.classList.remove('menu-open');
      } catch (error) {
        console.error('Error in collapse hidden handler:', error);
      }
    });
    
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
      try {
        mobileMenuOverlay.classList.add('show');
        document.body.classList.add('menu-open');
      } catch (error) {
        console.error('Error in collapse shown handler:', error);
      }
    });
    
    // Click outside to close - overlay click
    mobileMenuOverlay.addEventListener('click', function() {
      try {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      } catch (error) {
        console.error('Error in overlay click handler:', error);
      }
    });
    
    // Additional click outside handler for any missed clicks
    document.addEventListener('click', function(e) {
      try {
        if (navbarCollapse.classList.contains('show')) {
          // Check if click is outside the menu and not on the toggler
          if (!navbarCollapse.contains(e.target) && 
              !navbarToggler.contains(e.target) &&
              !e.target.closest('.navbar')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false
            });
            bsCollapse.hide();
          }
        }
      } catch (error) {
        console.error('Error in document click handler:', error);
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      try {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      } catch (error) {
        console.error('Error in escape key handler:', error);
      }
    });
  }

  // Set current year in footer with error handling
  try {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Error setting year:', error);
  }

  // Form handling with error handling and input sanitization
  const form = document.getElementById("contactForm");
  if (form) {
    // Add input sanitization to form fields
    const formInputs = form.querySelectorAll('input[type="text"], textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        try {
          this.value = sanitizeInput(this.value);
        } catch (error) {
          console.error('Error sanitizing input:', error);
        }
      });
    });

    // Form submission handling
    form.addEventListener('submit', function(e) {
      try {
        // Additional validation before submission
        const nameField = form.querySelector('input[name="name"]');
        const emailField = form.querySelector('input[name="email"]');
        const messageField = form.querySelector('textarea[name="message"]');
        
        if (nameField) nameField.value = sanitizeInput(nameField.value);
        if (messageField) messageField.value = sanitizeInput(messageField.value);
        
        // Basic email validation
        if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          e.preventDefault();
          alert('Please enter a valid email address.');
          return;
        }
      } catch (error) {
        console.error('Error in form submission:', error);
        e.preventDefault();
        alert('An error occurred. Please try again.');
      }
    });

    // Clear the form when the page is about to unload
    window.addEventListener("beforeunload", function () {
      try {
        if (form) form.reset();
      } catch (error) {
        console.error('Error clearing form:', error);
      }
    });
  }

  // Portfolio Filtering
  document.addEventListener("DOMContentLoaded", function () {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll(".portfolio-filters .btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        try {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => {
            try {
              btn.classList.remove("active");
            } catch (error) {
              console.error('Error removing active class:', error);
            }
          });

          // Add active class to clicked button
          this.classList.add("active");

          const filterValue = sanitizeInput(this.getAttribute("data-filter") || '');

          portfolioItems.forEach((item) => {
            try {
              const category = sanitizeInput(item.getAttribute("data-category") || '');
              if (
                filterValue === "all" ||
                category.includes(filterValue)
              ) {
                item.style.display = "block";
              } else {
                item.style.display = "none";
              }
            } catch (error) {
              console.error('Error filtering portfolio item:', error);
            }
          });
        } catch (error) {
          console.error('Error in button click handler:', error);
        }
      });
    });

    // Portfolio modal image loading with error handling
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
      button.addEventListener("click", function () {
        try {
          const modalId = this.getAttribute("data-bs-target");
          if (!modalId || !isValidSelector(modalId)) return;
          
          const portfolioItem = this.closest(".portfolio-item");

          if (portfolioItem) {
            const imgElement = portfolioItem.querySelector("img");
            const titleElement = portfolioItem.querySelector("h3");
            
            if (imgElement && titleElement) {
              const imgSrc = imgElement.src;
              const title = sanitizeInput(titleElement.textContent || '');
              const modal = document.querySelector(modalId);

              if (modal && imgSrc) {
                const modalImg = modal.querySelector(".modal-body img");
                const modalTitle = modal.querySelector(".modal-title");

                if (modalImg) modalImg.src = imgSrc;
                if (modalTitle) modalTitle.textContent = title;
              }
            }
          }
        } catch (error) {
          console.error('Error loading portfolio modal:', error);
        }
      });
    });
  });

  // Certificate modal image loading with lazy loading and error handling
  document.querySelectorAll(".cert-btn").forEach((button) => {
    button.addEventListener("click", function () {
      try {
        const modalId = this.getAttribute("data-bs-target");
        if (!modalId || !isValidSelector(modalId)) return;
        
        const certCard = this.closest(".cert-card");
        if (!certCard) return;
        
        const imgElement = certCard.querySelector(".cert-img");
        if (!imgElement) return;
        
        const imgSrc = imgElement.src;
        const modalImg = document.querySelector(`${modalId} .modal-body .cert-modal-img`);
        
        if (modalImg && imgSrc) {
          modalImg.src = imgSrc;
          modalImg.onload = () => {
            try {
              const skeletonId = modalId.replace('#', '') + 'Skeleton';
              const skeleton = document.getElementById(skeletonId);
              if (skeleton) skeleton.style.display = 'none';
              modalImg.style.display = 'block';
            } catch (error) {
              console.error('Error handling modal image load:', error);
            }
          };
          modalImg.onerror = () => {
            console.error('Failed to load certificate image');
          };
        }
      } catch (error) {
        console.error('Error loading certificate modal:', error);
      }
    });
  });

  // Lazy loading for images with error handling
  if ('IntersectionObserver' in window) {
    try {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          try {
            if (entry.isIntersecting) {
              const img = entry.target;
              const newSrc = img.dataset.src || img.src;
              if (newSrc && newSrc !== img.src) {
                img.src = newSrc;
              }
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          } catch (error) {
            console.error('Error in image intersection observer:', error);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        try {
          imageObserver.observe(img);
        } catch (error) {
          console.error('Error observing image:', error);
        }
      });
    } catch (error) {
      console.error('Error setting up intersection observer:', error);
    }
  }
});
