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
    // Validate and sanitize file path to prevent traversal attacks
    const normalizedPath = path.normalize(filePath);
    const resolvedPath = path.resolve(normalizedPath);
    const basePath = path.resolve('.');
    
    // Ensure the file is within the project directory
    if (!resolvedPath.startsWith(basePath)) {
      console.error(`Security: Path traversal attempt blocked: ${filePath}`);
      return;
    }
    
    // Check if file exists and is readable
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`File not found: ${resolvedPath}`);
      return;
    }
    
    try {
      const content = fs.readFileSync(resolvedPath, 'utf8');
      sensitivePatterns.forEach(pattern => {
        if (pattern.test(content)) {
          issues.push(`Potential sensitive data in ${path.relative(basePath, resolvedPath)}`);
        }
      });
    } catch (error) {
      console.error(`Error reading file ${resolvedPath}:`, error.message);
    }
  }
  
  // Scan all files with path validation
  const filesToScan = ['index.html', ...jsFiles];
  filesToScan.forEach(file => {
    checkFile(file);
  });
  
  if (issues.length > 0) {
    console.error('Security issues found:');
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exit(1);
  }
  
  console.log('✅ Security scan passed');
}

scanForSecurityIssues();