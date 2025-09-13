/**
 * Security utilities for input sanitization and validation
 */

const SecurityUtils = {
  /**
   * Sanitize input to prevent XSS attacks
   * @param {string} input - Raw input string
   * @returns {string} - Sanitized string
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Generate CSRF token
   * @returns {string} - CSRF token
   */
  generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Validate CSRF token
   * @param {string} token - Token to validate
   * @param {string} sessionToken - Session token
   * @returns {boolean} - Whether token is valid
   */
  validateCSRFToken(token, sessionToken) {
    return token === sessionToken && token.length === 64;
  },

  /**
   * Sanitize HTML content
   * @param {string} html - HTML content to sanitize
   * @returns {string} - Sanitized HTML
   */
  sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.SecurityUtils = SecurityUtils;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecurityUtils;
}