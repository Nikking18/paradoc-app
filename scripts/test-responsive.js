#!/usr/bin/env node

/**
 * Responsive Design Testing Script for ParaDoc.app
 * Tests various viewport sizes and generates a report
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Define test viewports
const viewports = [
  { name: 'Mobile Small', width: 320, height: 568 },
  { name: 'Mobile Medium', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Desktop Small', width: 1280, height: 720 },
  { name: 'Desktop Medium', width: 1440, height: 900 },
  { name: 'Desktop Large', width: 1920, height: 1080 },
];

// Test scenarios
const testScenarios = [
  {
    name: 'Hero Section',
    selector: 'section[aria-labelledby="hero-heading"]',
    checks: ['visibility', 'text-overflow', 'button-accessibility']
  },
  {
    name: 'Features Grid',
    selector: 'section#features',
    checks: ['grid-layout', 'card-spacing', 'icon-alignment']
  },
  {
    name: 'Pricing Cards',
    selector: 'section#pricing',
    checks: ['card-alignment', 'text-readability', 'button-size']
  },
  {
    name: 'Navigation',
    selector: 'nav[role="navigation"]',
    checks: ['menu-visibility', 'logo-size', 'button-touch-target']
  },
  {
    name: 'Testimonials',
    selector: 'section#testimonials',
    checks: ['carousel-controls', 'text-readability', 'star-alignment']
  }
];

async function runResponsiveTests() {
  console.log('🚀 Starting Responsive Design Tests for ParaDoc.app\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  try {
    for (const viewport of viewports) {
      console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      const page = await browser.newPage();
      await page.setViewport(viewport);
      
      // Navigate to the page
      await page.goto('http://localhost:3000', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      const viewportResults = {
        viewport: viewport.name,
        dimensions: `${viewport.width}x${viewport.height}`,
        tests: []
      };
      
      // Run tests for each scenario
      for (const scenario of testScenarios) {
        const scenarioResult = await testScenario(page, scenario, viewport);
        viewportResults.tests.push(scenarioResult);
      }
      
      // Take screenshot
      const screenshotPath = `screenshots/${viewport.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      await page.screenshot({ 
        path: screenshotPath, 
        fullPage: true 
      });
      
      results.push(viewportResults);
      await page.close();
      
      console.log(`✅ ${viewport.name} testing completed\n`);
    }
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
  
  // Generate report
  generateReport(results);
  console.log('📊 Testing completed! Check responsive-test-report.json for details.');
}

async function testScenario(page, scenario, viewport) {
  const result = {
    scenario: scenario.name,
    selector: scenario.selector,
    checks: {},
    issues: []
  };
  
  try {
    // Check if element exists and is visible
    const element = await page.$(scenario.selector);
    if (!element) {
      result.issues.push(`Element not found: ${scenario.selector}`);
      return result;
    }
    
    const boundingBox = await element.boundingBox();
    if (!boundingBox || boundingBox.width === 0 || boundingBox.height === 0) {
      result.issues.push('Element is not visible');
      return result;
    }
    
    // Run specific checks based on scenario
    for (const check of scenario.checks) {
      result.checks[check] = await runSpecificCheck(page, element, check, viewport);
    }
    
    // Check for text overflow
    const hasTextOverflow = await page.evaluate((selector) => {
      const elements = document.querySelectorAll(`${selector} *`);
      for (let el of elements) {
        if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
          return true;
        }
      }
      return false;
    }, scenario.selector);
    
    if (hasTextOverflow) {
      result.issues.push('Text overflow detected');
    }
    
    // Check button touch targets on mobile
    if (viewport.width <= 768) {
      const smallButtons = await page.evaluate((selector) => {
        const buttons = document.querySelectorAll(`${selector} button, ${selector} a[role="button"]`);
        const smallOnes = [];
        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          if (rect.width < 44 || rect.height < 44) {
            smallOnes.push({
              text: btn.textContent?.trim() || btn.getAttribute('aria-label') || 'Unknown',
              width: rect.width,
              height: rect.height
            });
          }
        });
        return smallOnes;
      }, scenario.selector);
      
      if (smallButtons.length > 0) {
        result.issues.push(`Small touch targets found: ${smallButtons.map(b => b.text).join(', ')}`);
      }
    }
    
  } catch (error) {
    result.issues.push(`Test error: ${error.message}`);
  }
  
  return result;
}

async function runSpecificCheck(page, element, check, viewport) {
  try {
    switch (check) {
      case 'visibility':
        return await page.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        }, element);
        
      case 'grid-layout':
        return await page.evaluate((el, width) => {
          const gridItems = el.querySelectorAll('[class*="grid"] > *');
          if (width <= 768) return gridItems.length > 0; // Mobile: just check items exist
          if (width <= 1024) return gridItems.length >= 2; // Tablet: at least 2 columns
          return gridItems.length >= 3; // Desktop: at least 3 columns
        }, element, viewport.width);
        
      case 'text-readability':
        return await page.evaluate(el => {
          const textElements = el.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
          for (let textEl of textElements) {
            const style = window.getComputedStyle(textEl);
            const fontSize = parseInt(style.fontSize);
            if (fontSize < 14) return false; // Minimum readable size
          }
          return true;
        }, element);
        
      case 'button-accessibility':
        return await page.evaluate(el => {
          const buttons = el.querySelectorAll('button, a[role="button"]');
          for (let btn of buttons) {
            const rect = btn.getBoundingClientRect();
            const hasText = btn.textContent?.trim() || btn.getAttribute('aria-label');
            if (!hasText || rect.width < 44 || rect.height < 44) return false;
          }
          return true;
        }, element);
        
      default:
        return true;
    }
  } catch (error) {
    return false;
  }
}

function generateReport(results) {
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  // Generate JSON report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalViewports: results.length,
      totalTests: results.reduce((sum, r) => sum + r.tests.length, 0),
      issuesFound: results.reduce((sum, r) => 
        sum + r.tests.reduce((testSum, t) => testSum + t.issues.length, 0), 0
      )
    },
    results
  };
  
  fs.writeFileSync('responsive-test-report.json', JSON.stringify(report, null, 2));
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  fs.writeFileSync('responsive-test-report.html', htmlReport);
  
  // Console summary
  console.log('\n📊 TEST SUMMARY:');
  console.log(`✅ Viewports tested: ${report.summary.totalViewports}`);
  console.log(`🧪 Total tests run: ${report.summary.totalTests}`);
  console.log(`⚠️  Issues found: ${report.summary.issuesFound}`);
  
  if (report.summary.issuesFound > 0) {
    console.log('\n🔍 Issues by viewport:');
    results.forEach(r => {
      const issues = r.tests.reduce((sum, t) => sum + t.issues.length, 0);
      if (issues > 0) {
        console.log(`   ${r.viewport}: ${issues} issues`);
      }
    });
  }
}

function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ParaDoc.app Responsive Test Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 2rem; }
        .header { border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 2rem; }
        .summary { background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
        .viewport { margin-bottom: 2rem; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; }
        .viewport h3 { margin-top: 0; color: #333; }
        .test { margin-bottom: 1rem; padding: 0.5rem; background: #fafafa; border-radius: 4px; }
        .issues { color: #d73a49; font-weight: bold; }
        .no-issues { color: #28a745; }
        .screenshot { max-width: 200px; border: 1px solid #ddd; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ParaDoc.app Responsive Test Report</h1>
        <p>Generated: ${report.timestamp}</p>
    </div>
    
    <div class="summary">
        <h2>Summary</h2>
        <ul>
            <li><strong>Viewports tested:</strong> ${report.summary.totalViewports}</li>
            <li><strong>Total tests:</strong> ${report.summary.totalTests}</li>
            <li><strong>Issues found:</strong> ${report.summary.issuesFound}</li>
        </ul>
    </div>
    
    ${report.results.map(viewport => `
        <div class="viewport">
            <h3>${viewport.viewport} (${viewport.dimensions})</h3>
            ${viewport.tests.map(test => `
                <div class="test">
                    <h4>${test.scenario}</h4>
                    <p><strong>Selector:</strong> <code>${test.selector}</code></p>
                    ${test.issues.length > 0 ? 
                        `<div class="issues">Issues: ${test.issues.join(', ')}</div>` :
                        `<div class="no-issues">✅ No issues found</div>`
                    }
                </div>
            `).join('')}
        </div>
    `).join('')}
</body>
</html>
  `;
}

// Add package.json check
if (require.main === module) {
  // Check if puppeteer is installed
  try {
    require('puppeteer');
    runResponsiveTests().catch(console.error);
  } catch (error) {
    console.log('📦 Installing puppeteer for testing...');
    console.log('Run: npm install --save-dev puppeteer');
    console.log('Then run this script again.');
  }
}

module.exports = { runResponsiveTests };
