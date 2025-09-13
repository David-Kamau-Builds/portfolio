/**
 * Error Boundary for handling JavaScript errors gracefully
 */

class ErrorBoundary {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 10;
    this.errorLog = [];
    this.init();
  }

  init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        type: 'javascript'
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        message: event.reason?.message || 'Unhandled promise rejection',
        error: event.reason,
        type: 'promise'
      });
      event.preventDefault();
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleResourceError(event);
      }
    }, true);
  }

  handleError(errorInfo) {
    this.errorCount++;
    this.errorLog.push({
      ...errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Log to console
    console.error('Error Boundary caught error:', errorInfo);

    // Show user-friendly message for critical errors
    // Temporarily disabled for debugging
    // if (this.errorCount <= 3) {
    //   this.showErrorMessage(errorInfo);
    // }

    // Prevent error spam
    if (this.errorCount >= this.maxErrors) {
      console.warn('Maximum error count reached. Suppressing further error messages.');
      return;
    }

    // In production, send to error tracking service
    this.reportError(errorInfo);
  }

  handleResourceError(event) {
    const target = event.target;
    const resourceType = target.tagName.toLowerCase();
    
    console.warn(`Failed to load ${resourceType}:`, target.src || target.href);

    // Handle specific resource failures
    switch (resourceType) {
      case 'img':
        this.handleImageError(target);
        break;
      case 'script':
        this.handleScriptError(target);
        break;
      case 'link':
        this.handleStylesheetError(target);
        break;
    }
  }

  handleImageError(img) {
    // Replace with placeholder or hide
    if (!img.dataset.errorHandled) {
      img.dataset.errorHandled = 'true';
      img.style.display = 'none';
      
      // Add error indicator
      const errorDiv = document.createElement('div');
      errorDiv.className = 'image-error';
      errorDiv.textContent = 'Image not available';
      const icon = document.createElement('i');
      icon.className = 'fas fa-image';
      errorDiv.insertBefore(icon, errorDiv.firstChild);
      errorDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        color: #6c757d;
        border: 1px dashed #dee2e6;
        min-height: 100px;
        font-size: 0.9rem;
      `;
      
      img.parentNode.insertBefore(errorDiv, img.nextSibling);
    }
  }

  handleScriptError(script) {
    console.error('Failed to load script:', script.src);
    
    // Try to load fallback or show degraded functionality message
    if (script.dataset.fallback) {
      const fallbackScript = document.createElement('script');
      fallbackScript.src = script.dataset.fallback;
      document.head.appendChild(fallbackScript);
    }
  }

  handleStylesheetError(link) {
    console.error('Failed to load stylesheet:', link.href);
    
    // Load fallback CSS if available
    if (link.dataset.fallback) {
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      fallbackLink.href = link.dataset.fallback;
      document.head.appendChild(fallbackLink);
    }
  }

  showErrorMessage(errorInfo) {
    // Only show user-friendly messages for certain types of errors
    if (errorInfo.type === 'javascript' && this.errorCount <= 2) {
      const message = this.createErrorMessage();
      document.body.appendChild(message);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 10000);
    }
  }

  createErrorMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-boundary-message';
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-warning alert-dismissible fade show';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; max-width: 400px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
    
    const strong = document.createElement('strong');
    strong.textContent = 'Notice:';
    strong.style.color = '#664d03';
    alertDiv.appendChild(strong);
    
    const text = document.createTextNode(' Some features may not work as expected. Please refresh the page if you encounter issues.');
    alertDiv.appendChild(text);
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-close';
    button.setAttribute('data-bs-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');
    alertDiv.appendChild(button);
    
    messageDiv.appendChild(alertDiv);
    
    return messageDiv;
  }

  reportError(errorInfo) {
    // In production, send to error tracking service
    // Example: Sentry, LogRocket, etc.
    
    try {
      // Simple error reporting (replace with your service)
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: errorInfo.message,
          fatal: false
        });
      }
    } catch {
      // Ignore reporting errors
    }
  }

  getErrorReport() {
    return {
      errorCount: this.errorCount,
      errors: this.errorLog.slice(-5), // Last 5 errors
      timestamp: new Date().toISOString()
    };
  }

  clearErrors() {
    this.errorCount = 0;
    this.errorLog = [];
  }
}

// Initialize error boundary
document.addEventListener('DOMContentLoaded', () => {
  window.errorBoundary = new ErrorBoundary();
});

// Expose for debugging
if (typeof window !== 'undefined') {
  window.ErrorBoundary = ErrorBoundary;
}