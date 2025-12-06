/* eslint-env node */
/* eslint-disable no-undef */
const { spawn } = require('child_process');

async function runTest(command, description) {
  return new Promise((resolve) => {
    console.log(`\n🔍 ${description}...`);
    
    const [cmd, ...args] = command.split(' ');
    const process = spawn(cmd, args, { stdio: 'pipe' });
    
    let output = '';
    let error = '';
    
    process.stdout.on('data', (data) => {
      if (data) {
        output += data.toString();
      }
    });
    
    process.stderr.on('data', (data) => {
      if (data) {
        error += data.toString();
      }
    });
    
    process.on('close', (code) => {
      if (typeof code === 'number' && code === 0) {
        console.log(`✅ ${description} passed`);
        resolve({ success: true, output });
      } else {
        console.error(`❌ ${description} failed`);
        console.error(error || output);
        resolve({ success: false, error: error || output });
      }
    });
  });
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive portfolio validation...\n');
  
  const tests = [
    { cmd: 'node scripts/seo-check.js', desc: 'SEO Validation' },
    { cmd: 'node scripts/security-scan.js', desc: 'Security Scan' },
    { cmd: 'node scripts/image-check.js', desc: 'Image Optimization' },
    { cmd: 'node scripts/accessibility-test.js', desc: 'Accessibility Testing' }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await runTest(test.cmd, test.desc);
    results.push({ ...test, ...result });
  }
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log('================');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.desc}`);
  });
  
  console.log(`\nTotal: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed. Please fix the issues before deployment.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! Portfolio is ready for deployment.');
  }
}

runAllTests().catch(console.error);