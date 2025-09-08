#!/usr/bin/env node

/**
 * ParaDoc.app Deployment Status Checker
 * Checks if all required environment variables are configured
 */

const https = require('https');

console.log('🔍 ParaDoc.app Deployment Status Checker');
console.log('========================================\n');

// Check if the app is deployed
function checkDeployment() {
  console.log('🌐 Checking deployment status...');
  
  const options = {
    hostname: 'paradoc-app-flame.vercel.app',
    port: 443,
    path: '/',
    method: 'GET',
    timeout: 5000
  };

  const req = https.request(options, (res) => {
    console.log(`✅ App is deployed and accessible!`);
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   URL: https://paradoc-app-flame.vercel.app`);
    console.log('');
    
    if (res.statusCode === 200) {
      console.log('🎉 Your app is live and working!');
      console.log('📋 Next steps:');
      console.log('   1. Configure custom domain: paradoc.app');
      console.log('   2. Add environment variables to Vercel');
      console.log('   3. Set up Supabase, Google OAuth, Stripe, etc.');
      console.log('   4. Follow SETUP_INSTRUCTIONS.md for complete setup');
    }
  });

  req.on('error', (err) => {
    console.log('❌ App not yet deployed or not accessible');
    console.log('📋 Next steps:');
    console.log('   1. Go to Vercel Dashboard');
    console.log('   2. Import your GitHub repository');
    console.log('   3. Deploy the application');
    console.log('   4. Follow SETUP_INSTRUCTIONS.md for complete setup');
  });

  req.on('timeout', () => {
    console.log('⏰ Request timeout - checking deployment...');
    req.destroy();
  });

  req.end();
}

// Check environment variables
function checkEnvVars() {
  console.log('🔧 Checking environment variables...');
  
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'RESEND_API_KEY',
    'OPENROUTER_API_KEY',
    'HUGGINGFACE_API_KEY'
  ];

  console.log('📋 Required environment variables:');
  requiredVars.forEach((varName, index) => {
    console.log(`   ${index + 1}. ${varName}`);
  });
  
  console.log('\n💡 Add these to Vercel Dashboard → Settings → Environment Variables');
  console.log('📖 Use .env.vercel file as reference');
}

// Main execution
console.log('🚀 Starting deployment check...\n');

checkDeployment();
setTimeout(() => {
  console.log('');
  checkEnvVars();
  
  console.log('\n📚 Available Resources:');
  console.log('   • SETUP_INSTRUCTIONS.md - Complete setup guide');
  console.log('   • .env.vercel - Environment variables template');
  console.log('   • database-schema.sql - Database migration script');
  console.log('   • DEPLOYMENT_STEP_BY_STEP.md - Detailed deployment guide');
  
  console.log('\n🎯 Your GitHub repo: https://github.com/Nikking18/paradoc-app.git');
  console.log('🌐 Target domain: https://paradoc.app');
  console.log('\n🚀 Happy deploying!');
}, 2000);
