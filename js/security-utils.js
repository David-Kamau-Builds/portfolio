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
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for environments without crypto API
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  },

  /**
   * Validate CSRF token
   * @param {string} token - Token to validate
   * @param {string} sessionToken - Session token
   * @returns {boolean} - Whether token is valid
   */
  validateCSRFToken(token, sessionToken) {
    if (typeof token !== 'string' || typeof sessionToken !== 'string') {
      return false;
    }
    if (token.length !== 64 || sessionToken.length !== 64) {
      return false;
    }
    // Constant-time comparison to prevent timing attacks
    let result = 0;
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i);
    }
    return result === 0;
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