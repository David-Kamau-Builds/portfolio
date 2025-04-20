document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
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
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
  activateNavLink(); // Run once on page load

  // ===== BACK-TO-TOP BUTTON =====
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      backToTopButton.classList.toggle("show", window.scrollY > 300);
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Get the form element by its ID
  const form = document.getElementById("contactForm");

  // Clear the form when the page is about to unload (e.g., when the user navigates away or refreshes)
  window.addEventListener("beforeunload", function () {
    form.reset(); // This clears the form
  });

  // Portfolio Filtering
  document.addEventListener("DOMContentLoaded", function () {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll(".portfolio-filters .btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category").includes(filterValue)
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    // Portfolio modal image loading
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-bs-target");
        const portfolioItem = this.closest(".portfolio-item");

        if (portfolioItem) {
          const imgSrc = portfolioItem.querySelector("img").src;
          const title = portfolioItem.querySelector("h3").textContent;
          const modal = document.querySelector(modalId);

          if (modal) {
            const modalImg = modal.querySelector(".modal-body img");
            const modalTitle = modal.querySelector(".modal-title");

            if (modalImg) modalImg.src = imgSrc;
            if (modalTitle) modalTitle.textContent = title;
          }
        }
      });
    });
  });

  // Certificate modal image loading
  document.querySelectorAll(".cert-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-bs-target");
      const imgSrc = this.closest(".cert-card").querySelector(".cert-img").src;
      const modalImg = document.querySelector(`${modalId} .modal-body img`);
      if (modalImg) {
        modalImg.src = imgSrc;
      }
    });
  });
});
