/**
 * Content Security Policy and additional security headers
 */

// Set up Content Security Policy
const CSP_POLICY = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
  'style-src': ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
  'img-src': ["'self'", "data:", "https:"],
  'connect-src': ["'self'", "https://formspree.io"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", "https://formspree.io"]
};

/**
 * Apply security headers if running in a server environment
 */
function applySecurityHeaders() {
  // This would be implemented server-side
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Content-Security-Policy': Object.entries(CSP_POLICY)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ')
  };
  
  return headers;
}

/**
 * Client-side security enhancements
 */
function enhanceClientSecurity() {
  // Disable right-click context menu in production
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.addEventListener('contextmenu', (e) => {
      if (e.isTrusted) {
        e.preventDefault();
      }
    });
  }
  
  // Prevent iframe embedding
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
  
  // Clear sensitive data on page unload
  window.addEventListener('beforeunload', () => {
    // Clear any sensitive form data
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[type="password"], input[type="email"]');
      inputs.forEach(input => {
        input.value = '';
      });
    });
  });
}

// Initialize client-side security
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', enhanceClientSecurity);
}

// Export for server-side use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { applySecurityHeaders, CSP_POLICY };
}