const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..', '_site');

function checkImages() {
  const issues = [];
  const htmlContent = fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8');

  // Extract all image sources
  const imgSources = htmlContent.match(/src="[^"]*\.(jpg|jpeg|png|webp|svg)"/gi) || [];

  imgSources.forEach(src => {
    const imagePath = src.match(/src="([^"]*)"/)[1];

    // Skip external URLs
    if (imagePath.startsWith('http')) return;

    // Check if file exists
    const absImagePath = path.join(SITE_DIR, imagePath);
    if (!fs.existsSync(absImagePath)) {
      issues.push(`Missing image: ${imagePath}`);
      return;
    }

    // Check file size (warn if > 500KB)
    const stats = fs.statSync(absImagePath);
    if (stats.size > 500000) {
      issues.push(`Large image file (${Math.round(stats.size / 1024)}KB): ${imagePath}`);
    }

    // Recommend WebP format for non-SVG images
    if (!imagePath.endsWith('.webp') && !imagePath.endsWith('.svg')) {
      issues.push(`Consider WebP format for: ${imagePath}`);
    }
  });

  // Check for alt attributes
  const imgTags = htmlContent.match(/<img[^>]*>/gi) || [];
  imgTags.forEach(tag => {
    if (!tag.includes('alt=')) {
      issues.push(`Missing alt attribute: ${tag.substring(0, 50)}...`);
    }
  });

  // Check favicon files
  const faviconFiles = ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'];
  faviconFiles.forEach(file => {
    if (!fs.existsSync(path.join(SITE_DIR, file))) {
      issues.push(`Missing favicon: ${file}`);
    }
  });

  if (issues.length > 0) {
    console.error('Image optimization issues:');
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log('✅ Image optimization check passed');
}

checkImages();