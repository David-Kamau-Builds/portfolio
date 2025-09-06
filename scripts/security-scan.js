const fs = require('fs');
const path = require('path');

function scanForSecurityIssues() {
  const issues = [];
  
  // Check HTML for security issues
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  
  // Check for inline scripts
  if (htmlContent.includes('<script>') && !htmlContent.includes('application/ld+json')) {
    issues.push('Inline scripts detected (security risk)');
  }
  
  // Check for external links without rel="noopener"
  const externalLinks = htmlContent.match(/href="https?:\/\/[^"]*"/g) || [];
  externalLinks.forEach(link => {
    const linkTag = htmlContent.substring(
      htmlContent.indexOf(link) - 100,
      htmlContent.indexOf(link) + 200
    );
    if (!linkTag.includes('rel="noopener"') && !linkTag.includes("rel='noopener'")) {
      issues.push(`External link without rel="noopener": ${link}`);
    }
  });
  
  // Check JavaScript files for console.log
  const jsFiles = ['js/scripts.js', 'js/theme-toggle.js', 'js/enhancements.js', 'js/cert-enhancements.js'];
  jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('console.log')) {
        issues.push(`Console.log found in ${file} (should be removed for production)`);
      }
    }
  });
  
  // Check for sensitive data patterns
  const sensitivePatterns = [
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /token/i
  ];
  
  function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        issues.push(`Potential sensitive data in ${filePath}`);
      }
    });
  }
  
  // Scan all files
  ['index.html', ...jsFiles].forEach(file => {
    if (fs.existsSync(file)) checkFile(file);
  });
  
  if (issues.length > 0) {
    console.error('Security issues found:');
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exit(1);
  }
  
  console.log('✅ Security scan passed');
}

scanForSecurityIssues();