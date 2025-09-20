// element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active");
  
  // Update ARIA attributes for accessibility
  if (elem.hasAttribute('aria-expanded')) {
    const isExpanded = elem.getAttribute('aria-expanded') === 'true';
    elem.setAttribute('aria-expanded', !isExpanded);
  }
};



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar);
  elementToggleFunc(this);
});

// Keyboard navigation for sidebar
sidebarBtn.addEventListener("keydown", function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function(){

    let selectedValue = this.innerText.toLowerCase();
    
    // Fix the category name mapping
    if (selectedValue === "techical skills") {
      selectedValue = "technical skills";
    }
    
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// Keyboard navigation for select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("keydown", function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    // Fix category matching
    const itemCategory = filterItems[i].dataset.category;
    const normalizedCategory = itemCategory === "techical skills" ? "technical skills" : itemCategory;
    
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === normalizedCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    
    // Fix the category name mapping
    if (selectedValue === "techical skills") {
      selectedValue = "technical skills";
    }
    
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Keyboard navigation for filter buttons
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("keydown", function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (i + direction + filterBtn.length) % filterBtn.length;
      filterBtn[nextIndex].focus();
    }
  });
}

// Set initial ARIA states
filterBtn[0].setAttribute('aria-selected', 'true');


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Form validation messages
const validationMessages = {
  valueMissing: 'This field is required.',
  typeMismatch: 'Please enter a valid email address.',
  tooShort: 'Please enter at least 2 characters.'
};

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
      formBtn.setAttribute("aria-describedby", "");
    } else {
      formBtn.setAttribute("disabled", "");
      formBtn.setAttribute("aria-describedby", "form-validation-error");
    }

  });
  
  // Add blur event for individual field validation
  formInputs[i].addEventListener("blur", function() {
    validateField(this);
  });
}

// Individual field validation function
function validateField(field) {
  const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
  
  if (field.validity.valid) {
    field.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
  } else {
    field.classList.add('error');
    if (errorElement) {
      errorElement.textContent = getValidationMessage(field);
    }
  }
}

// Get appropriate validation message
function getValidationMessage(field) {
  for (const key in validationMessages) {
    if (field.validity[key]) {
      return validationMessages[key];
    }
  }
  return 'Please check this field.';
}

// Form submission handling
form.addEventListener('submit', function(e) {
  // Let the form submit naturally to Formspree
  // Add loading state
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  formBtn.disabled = true;
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Update ARIA states for navigation
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].setAttribute('aria-selected', 'false');
    }
    this.setAttribute('aria-selected', 'true');
    
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        pages[i].setAttribute('aria-hidden', 'false');
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // Focus management for accessibility
        const firstHeading = pages[i].querySelector('h2');
        if (firstHeading) {
          firstHeading.focus();
        }
      } else {
        pages[i].classList.remove("active");
        pages[i].setAttribute('aria-hidden', 'true');
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Keyboard navigation for nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("keydown", function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (i + direction + navigationLinks.length) % navigationLinks.length;
      navigationLinks[nextIndex].focus();
    }
  });
}

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  if (!modal) return; // Exit if modal doesn't exist
  
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close');
  const certificationItems = document.querySelectorAll('.clients-item button');

  // Open modal when certification is clicked
  certificationItems.forEach(item => {
      item.addEventListener('click', function() {
          const img = this.querySelector('img');
          modal.style.display = 'flex';
          modal.setAttribute('aria-hidden', 'false');
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          
          // Focus management
          closeBtn.focus();
          
          // Trap focus in modal
          trapFocus(modal);
      });
      
      // Keyboard support for certification buttons
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
  });

  // Close modal when close button is clicked
  closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
      }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.style.display === 'flex') {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
      }
  });
});

// Focus trap utility function
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// Lazy loading for images (if Intersection Observer is supported)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
  // Set initial ARIA states
  const pages = document.querySelectorAll('[data-page]');
  pages.forEach((page, index) => {
    if (index === 0) {
      page.setAttribute('aria-hidden', 'false');
    } else {
      page.setAttribute('aria-hidden', 'true');
    }
  });
  
  // Set navigation ARIA states
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach((link, index) => {
    if (index === 0) {
      link.setAttribute('aria-selected', 'true');
    } else {
      link.setAttribute('aria-selected', 'false');
    }
  });
  
  // Add loading states for better UX
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
  });
});