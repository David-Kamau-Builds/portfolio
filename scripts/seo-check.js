const fs = require('fs');

function checkSEO() {
  const issues = [];
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  
  // Check for required meta tags
  const requiredMeta = [
    { tag: 'title', pattern: /<title[^>]*>([^<]+)<\/title>/ },
    { tag: 'meta description', pattern: /<meta[^>]*name="description"[^>]*content="([^"]+)"/ },
    { tag: 'meta keywords', pattern: /<meta[^>]*name="keywords"[^>]*content="([^"]+)"/ },
    { tag: 'canonical link', pattern: /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/ }
  ];
  
  requiredMeta.forEach(({ tag, pattern }) => {
    const match = htmlContent.match(pattern);
    if (!match) {
      issues.push(`Missing ${tag}`);
    } else if (match[1] && match[1].length < 10) {
      issues.push(`${tag} too short: "${match[1]}"`);
    }
  });
  
  // Check Open Graph tags
  const ogTags = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image'];
  ogTags.forEach(tag => {
    if (!htmlContent.includes(`property="${tag}"`)) {
      issues.push(`Missing Open Graph tag: ${tag}`);
    }
  });
  
  // Check Twitter Card tags
  const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description'];
  twitterTags.forEach(tag => {
    if (!htmlContent.includes(`name="${tag}"`)) {
      issues.push(`Missing Twitter Card tag: ${tag}`);
    }
  });
  
  // Check structured data
  if (!htmlContent.includes('application/ld+json')) {
    issues.push('Missing structured data (JSON-LD)');
  }
  
  // Check heading structure
  const headings = htmlContent.match(/<h[1-6][^>]*>/gi) || [];
  if (!headings.some(h => h.startsWith('<h1'))) {
    issues.push('Missing H1 tag');
  }
  
  // Check for multiple H1 tags
  const h1Count = (htmlContent.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count > 1) {
    issues.push(`Multiple H1 tags found (${h1Count})`);
  }
  
  // Check meta viewport
  if (!htmlContent.includes('name="viewport"')) {
    issues.push('Missing viewport meta tag');
  }
  
  // Check lang attribute
  if (!htmlContent.includes('lang=')) {
    issues.push('Missing lang attribute on html tag');
  }
  
  if (issues.length > 0) {
    console.error('SEO issues found:');
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exit(1);
  }
  
  console.log('✅ SEO validation passed');
}

checkSEO();