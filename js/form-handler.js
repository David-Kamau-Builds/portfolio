/**
 * Enhanced form handler with security and error handling
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnSpinner = submitBtn?.querySelector('.btn-spinner');
  const formStatus = document.querySelector('.form-status');

  // Rate limiting and CSRF protection
  let lastSubmission = 0;
  const RATE_LIMIT_MS = 30000; // 30 seconds between submissions
  let csrfToken = SecurityUtils.generateCSRFToken();
  
  // Add CSRF token to form
  const csrfInput = document.createElement('input');
  csrfInput.type = 'hidden';
  csrfInput.name = '_csrf';
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  /**
   * Show form status message
   * @param {string} message - Message to display
   * @param {string} type - Message type (success, error, warning)
   */
  function showStatus(message, type = 'info') {
    if (!formStatus) return;
    
    formStatus.className = `form-status mt-3 alert alert-${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    
    // Auto-hide after 5 seconds for non-error messages
    if (type !== 'danger') {
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
  }

  /**
   * Show success popup
   */
  function showSuccessPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. I'll get back to you soon.</p>
        <button class="btn btn-primary" onclick="this.closest('.popup-overlay').remove()">Close</button>
      </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 5000);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  }

  /**
   * Toggle submit button loading state
   * @param {boolean} loading - Whether to show loading state
   */
  function toggleLoading(loading) {
    if (!submitBtn || !btnText || !btnSpinner) return;
    
    submitBtn.disabled = loading;
    if (loading) {
      btnText.textContent = 'Sending...';
      btnSpinner.classList.remove('d-none');
    } else {
      btnText.textContent = 'Send Message';
      btnSpinner.classList.add('d-none');
    }
  }

  /**
   * Validate individual field
   * @param {HTMLElement} field - Form field to validate
   * @returns {boolean} - Whether field is valid
   */
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');

    switch (field.name) {
      case 'name':
        if (value.length < 2 || value.length > 100) {
          isValid = false;
          message = 'Name must be between 2 and 100 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          isValid = false;
          message = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        break;

      case 'email':
        if (!SecurityUtils.isValidEmail(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        } else if (value.length > 254) {
          isValid = false;
          message = 'Email address is too long';
        }
        break;

      case 'message':
        if (value.length < 10 || value.length > 1000) {
          isValid = false;
          message = 'Message must be between 10 and 1000 characters';
        }
        break;
    }

    // Apply validation styling
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    // Update feedback message
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback && !isValid) {
      feedback.textContent = message;
    }

    return isValid;
  }

  /**
   * Validate entire form
   * @returns {boolean} - Whether form is valid
   */
  function validateForm() {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Check privacy checkbox
    const privacyCheck = document.getElementById('privacyCheck');
    if (privacyCheck && !privacyCheck.checked) {
      privacyCheck.classList.add('is-invalid');
      isValid = false;
    } else if (privacyCheck) {
      privacyCheck.classList.remove('is-invalid');
    }

    return isValid;
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Rate limiting check
      const now = Date.now();
      if (now - lastSubmission < RATE_LIMIT_MS) {
        const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
        showStatus(`Please wait ${remainingTime} seconds before submitting again.`, 'warning');
        return;
      }

      // Validate form
      if (!validateForm()) {
        showStatus('Please correct the errors above.', 'danger');
        return;
      }

      toggleLoading(true);
      showStatus('Sending your message...', 'info');

      // Prepare sanitized form data
      const formData = new FormData();
      const nameField = form.querySelector('input[name="name"]');
      const emailField = form.querySelector('input[name="email"]');
      const messageField = form.querySelector('textarea[name="message"]');

      if (nameField) {
        formData.append('name', SecurityUtils.sanitizeInput(nameField.value.trim()));
      }
      if (emailField) {
        formData.append('email', emailField.value.trim().toLowerCase());
      }
      if (messageField) {
        formData.append('message', SecurityUtils.sanitizeInput(messageField.value.trim()));
      }

      // Add timestamp, CSRF token, and basic bot protection
      formData.append('_timestamp', new Date().toISOString());
      formData.append('_subject', 'Portfolio Contact Form Submission');
      formData.append('_csrf', csrfToken);

      // Get form endpoint from environment or form action
      const formEndpoint = process.env.FORM_ENDPOINT || form.action;
      
      // Submit form
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success popup
        showSuccessPopup();
        form.reset();
        
        // Remove validation classes
        form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
        
        lastSubmission = now;
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

    } catch (error) {
      ErrorHandler.logError('Form submission', error);
      showStatus('Sorry, there was an error sending your message. Please try again later.', 'danger');
    } finally {
      toggleLoading(false);
    }
  }

  // Add event listeners
  form.addEventListener('submit', handleSubmit);

  // Real-time validation
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      // Remove invalid class on input to provide immediate feedback
      if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
      }
    });
  });

  // Privacy checkbox validation
  const privacyCheck = document.getElementById('privacyCheck');
  if (privacyCheck) {
    privacyCheck.addEventListener('change', function() {
      this.classList.remove('is-invalid');
    });
  }

  // Prevent form submission on Enter key in input fields (except textarea)
  form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
      e.preventDefault();
    }
  });

  // Auto-save form data to localStorage (optional)
  const STORAGE_KEY = 'portfolio_contact_form';
  
  function saveFormData() {
    try {
      const data = {
        name: form.querySelector('input[name="name"]')?.value || '',
        email: form.querySelector('input[name="email"]')?.value || '',
        message: form.querySelector('textarea[name="message"]')?.value || ''
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // Ignore localStorage errors
    }
  }

  function loadFormData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        const nameField = form.querySelector('input[name="name"]');
        const emailField = form.querySelector('input[name="email"]');
        const messageField = form.querySelector('textarea[name="message"]');
        
        if (nameField && data.name) nameField.value = data.name;
        if (emailField && data.email) emailField.value = data.email;
        if (messageField && data.message) messageField.value = data.message;
      }
    } catch (error) {
      // Ignore localStorage errors
    }
  }

  // Load saved data on page load
  loadFormData();

  // Save data on input
  fields.forEach(field => {
    field.addEventListener('input', saveFormData);
  });

  // Clear saved data on successful submission
  form.addEventListener('submit', function() {
    setTimeout(() => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        // Ignore localStorage errors
      }
    }, 1000);
  });
});