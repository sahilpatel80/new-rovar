/**
 * ROVAR - Main JavaScript Controller
 * Handles sticky headers, mobile menu drawer, accessibility dropdowns,
 * scroll-reveal animations, contact forms, and dynamic size rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header scroll behavior
  const body = document.body;
  const scrollThreshold = 30;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      body.classList.add("header-scrolled");
    } else {
      body.classList.remove("header-scrolled");
    }
  });

  // 2. Mobile Drawer Navigation
  const hamburger = document.getElementById("hamburger");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const drawerOverlay = document.getElementById("drawer-overlay");

  if (hamburger && mobileNavDrawer && drawerOverlay) {
    const toggleMobileMenu = () => {
      hamburger.classList.toggle("active");
      mobileNavDrawer.classList.toggle("open");
      drawerOverlay.classList.toggle("active");
      
      // Prevent body scrolling when menu is open
      if (mobileNavDrawer.classList.contains("open")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    };

    hamburger.addEventListener("click", toggleMobileMenu);
    drawerOverlay.addEventListener("click", toggleMobileMenu);

    // Close mobile menu on clicking links that are not submenu toggles
    const mobileLinks = mobileNavDrawer.querySelectorAll(".mobile-menu > li > a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("mobile-submenu-toggle")) {
          toggleMobileMenu();
        }
      });
    });
  }

  // 3. Mobile Submenu Toggle
  const submenuToggles = document.querySelectorAll(".mobile-submenu-toggle");
  submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggle.classList.toggle("active");
      const submenu = toggle.nextElementSibling;
      if (submenu && submenu.classList.contains("mobile-submenu")) {
        if (submenu.style.display === "flex") {
          submenu.style.display = "none";
        } else {
          submenu.style.display = "flex";
        }
      }
    });
  });

  // 4. Keyboard Accessible Dropdowns for Desktop
  const navDropdowns = document.querySelectorAll(".has-dropdown");
  navDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(".nav-link");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (trigger && menu) {
      // Toggle visibility on focusing and hitting Enter or Space
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const isVisible = menu.style.opacity === "1";
          menu.style.opacity = isVisible ? "0" : "1";
          menu.style.visibility = isVisible ? "hidden" : "visible";
          menu.style.transform = isVisible ? "translateX(-50%) translateY(15px)" : "translateX(-50%) translateY(0)";
        }
      });

      // Close dropdown if focus moves outside
      dropdown.addEventListener("focusout", (e) => {
        if (!dropdown.contains(e.relatedTarget)) {
          menu.removeAttribute("style");
        }
      });
    }
  });

  // 5. Back-to-Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. Dynamic Sizing Injection
  // We locate container elements matching "data-size-config" and pull lists from window.ROVAR_CONFIG
  const sizeInjectors = document.querySelectorAll("[data-size-config]");
  if (sizeInjectors.length > 0 && window.ROVAR_CONFIG) {
    sizeInjectors.forEach(container => {
      const configKey = container.getAttribute("data-size-config");
      const configData = window.ROVAR_CONFIG.sizes[configKey];

      if (configData) {
        let sizeHtml = `
          <h3>${configData.title}</h3>
          <ul class="size-list">
        `;
        
        configData.list.forEach(size => {
          sizeHtml += `<li>${size}</li>`;
        });

        sizeHtml += `
          </ul>
          <p class="size-note">${configData.note}</p>
        `;

        container.innerHTML = sizeHtml;
      }
    });
  }

  // 7. Dynamic Fragrance List Injection (for Bath & Body Care page)
  const fragranceContainer = document.getElementById("dynamic-fragrance-tags");
  if (fragranceContainer && window.ROVAR_CONFIG && window.ROVAR_CONFIG.fragrances) {
    let tagsHtml = "";
    window.ROVAR_CONFIG.fragrances.forEach(fragrance => {
      tagsHtml += `<span class="fragrance-tag">${fragrance}</span>`;
    });
    fragranceContainer.innerHTML = tagsHtml;
  }

  // 8. Bath & Body Page Tabs Switcher
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (tabButtons.length > 0 && tabPanels.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");

        // Deactivate all buttons & panels
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        // Activate matching button & panel
        button.classList.add("active");
        const activePanel = document.getElementById(targetTab);
        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  }

  // 9. B2B Enquiry Form Submission & Validation
  const enquiryForm = document.getElementById("enquiry-form");
  const formAlert = document.getElementById("form-alert");

  if (enquiryForm && formAlert) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById("full-name").value.trim();
      const hotelName = document.getElementById("hotel-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !hotelName || !email || !phone || !message) {
        formAlert.className = "form-msg error";
        formAlert.innerText = "Please fill in all required fields marked with *.";
        formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Simulate B2B enquiry submission
      formAlert.className = "form-msg success";
      formAlert.innerText = "Thank you for your enquiry. Our corporate team will contact you within 24 business hours to discuss your hotel amenities requirements.";
      enquiryForm.reset();
      formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // 10. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Triggers slightly before element enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add("revealed"));
  }
});
