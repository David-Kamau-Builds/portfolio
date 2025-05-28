document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        themeStylesheet.removeAttribute('disabled');
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        themeStylesheet.setAttribute('disabled', true);
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            // Switch to light mode
            themeStylesheet.setAttribute('disabled', true);
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            themeStylesheet.removeAttribute('disabled');
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});