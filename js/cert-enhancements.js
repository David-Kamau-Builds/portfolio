// Certificate Enhancement JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Certificate Card Hover Effects
    const certCards = document.querySelectorAll('.enhanced-cert');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Verify Button Click Tracking
    const verifyButtons = document.querySelectorAll('.verify-btn:not(.disabled)');
    
    verifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Certificate Card Accessibility Enhancements
    certCards.forEach(card => {
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const viewBtn = this.querySelector('.cert-btn');
                if (viewBtn) {
                    viewBtn.click();
                }
            }
        });
        
        // Add focus styles
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});