/**
 * Utility functions for input sanitization and error handling
 */

// Input sanitization utility
const SecurityUtils = {
  /**
   * Sanitize HTML input to prevent XSS attacks
   * @param {string} input - The input string to sanitize
   * @returns {string} - The sanitized string
   */
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>\"'&]/g, (match) => {
      const map = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return map[match];
    });
  },

  /**
   * Validate CSS selector to prevent injection
   * @param {string} selector - The CSS selector to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  isValidSelector: (selector) => {
    return /^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(selector);
  },

  /**
   * Validate email format
   * @param {string} email - The email to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Sanitize URL to prevent malicious redirects
   * @param {string} url - The URL to sanitize
   * @returns {string} - The sanitized URL or empty string if invalid
   */
  sanitizeUrl: (url) => {
    try {
      const urlObj = new URL(url);
      // Only allow http and https protocols
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        return urlObj.toString();
      }
      return '';
    } catch (error) {
      return '';
    }
  }
};

// Error handling utilities
const ErrorHandler = {
  /**
   * Log error with context information
   * @param {string} context - Context where error occurred
   * @param {Error} error - The error object
   * @param {Object} additionalInfo - Additional information about the error
   */
  logError: (context, error, additionalInfo = {}) => {
    const errorInfo = {
      context,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...additionalInfo
    };
    
    console.error('Application Error:', errorInfo);
    
    // In production, you might want to send this to an error tracking service
    // Example: sendToErrorTrackingService(errorInfo);
  },

  /**
   * Safe function execution with error handling
   * @param {Function} fn - Function to execute
   * @param {string} context - Context description
   * @param {*} fallback - Fallback value if function fails
   * @returns {*} - Function result or fallback
   */
  safeExecute: (fn, context, fallback = null) => {
    try {
      return fn();
    } catch (error) {
      ErrorHandler.logError(context, error);
      return fallback;
    }
  },

  /**
   * Safe DOM operation with error handling
   * @param {Function} operation - DOM operation to perform
   * @param {string} context - Context description
   * @param {HTMLElement} element - Target element (optional)
   */
  safeDOMOperation: (operation, context, element = null) => {
    try {
      if (element && !document.contains(element)) {
        throw new Error('Element not found in DOM');
      }
      return operation();
    } catch (error) {
      ErrorHandler.logError(context, error, { element: element?.tagName });
      return null;
    }
  }
};

// Form validation utilities
const FormValidator = {
  /**
   * Validate and sanitize form data
   * @param {HTMLFormElement} form - The form to validate
   * @returns {Object} - Validation result with sanitized data
   */
  validateForm: (form) => {
    const result = {
      isValid: true,
      errors: [],
      sanitizedData: {}
    };

    try {
      const formData = new FormData(form);
      
      for (const [key, value] of formData.entries()) {
        const sanitizedValue = SecurityUtils.sanitizeInput(value.toString());
        result.sanitizedData[key] = sanitizedValue;

        // Specific validation rules
        if (key === 'email' && !SecurityUtils.isValidEmail(sanitizedValue)) {
          result.isValid = false;
          result.errors.push('Invalid email format');
        }

        if (key === 'name' && sanitizedValue.length < 2) {
          result.isValid = false;
          result.errors.push('Name must be at least 2 characters');
        }

        if (key === 'message' && sanitizedValue.length < 10) {
          result.isValid = false;
          result.errors.push('Message must be at least 10 characters');
        }
      }
    } catch (error) {
      ErrorHandler.logError('Form validation', error);
      result.isValid = false;
      result.errors.push('Form validation failed');
    }

    return result;
  }
};

// Performance monitoring utilities
const PerformanceMonitor = {
  /**
   * Measure function execution time
   * @param {Function} fn - Function to measure
   * @param {string} label - Label for the measurement
   * @returns {*} - Function result
   */
  measure: (fn, label) => {
    const start = performance.now();
    try {
      const result = fn();
      const end = performance.now();
      console.log(`${label} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${label} failed after ${end - start} milliseconds:`, error);
      throw error;
    }
  }
};

// Export utilities for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SecurityUtils,
    ErrorHandler,
    FormValidator,
    PerformanceMonitor
  };
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
  window.SecurityUtils = SecurityUtils;
  window.ErrorHandler = ErrorHandler;
  window.FormValidator = FormValidator;
  window.PerformanceMonitor = PerformanceMonitor;
}