const puppeteer = require('puppeteer');
const AxePuppeteer = require('@axe-core/puppeteer').default;

async function runAccessibilityTests() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('file://' + process.cwd() + '/index.html');
    
    const results = await new AxePuppeteer(page).analyze();
    
    if (results.violations.length > 0) {
      console.error('Accessibility violations found:');
      results.violations.forEach(violation => {
        console.error(`- ${violation.id}: ${violation.description}`);
        violation.nodes.forEach(node => {
          console.error(`  Target: ${node.target}`);
        });
      });
      process.exit(1);
    }
    
    console.log('✅ All accessibility tests passed');
  } catch (error) {
    console.error('Accessibility test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runAccessibilityTests();