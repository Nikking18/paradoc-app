
🎯 COMPLETE SETUP INSTRUCTIONS FOR PARADOC.APP
==============================================

Your GitHub repo is already connected to Vercel: https://github.com/Nikking18/paradoc-app.git

📋 STEP-BY-STEP SETUP:

1. 🌐 SUPABASE SETUP
   =================
   a) Go to: https://supabase.com
   b) Create new project: "paradoc-app"
   c) Choose region closest to your users
   d) Set strong database password
   e) Wait for project to be ready
   
   f) Get API keys:
      - Go to Settings → API
      - Copy Project URL (SUPABASE_URL)
      - Copy anon public key (SUPABASE_ANON_KEY)
      - Copy service_role key (SUPABASE_SERVICE_ROLE_KEY)
   
   g) Run database migration:
      - Go to SQL Editor
      - Copy contents of database-schema.sql
      - Paste and run the SQL script
      - Verify tables: users, documents, verification_tokens, user_subscriptions

2. 🔐 GOOGLE OAUTH SETUP
   =====================
   a) Go to: https://console.cloud.google.com/
   b) Create new project or select existing
   c) Enable Google+ API:
      - Go to APIs & Services → Library
      - Search "Google+ API" → Enable
   
   d) Create OAuth credentials:
      - Go to APIs & Services → Credentials
      - Create Credentials → OAuth 2.0 Client IDs
      - Application type: Web application
      - Name: ParaDoc.app
      - Authorized redirect URIs:
        * https://paradoc.app/api/auth/callback/google
        * http://localhost:3000/api/auth/callback/google
   
   e) Copy Client ID and Client Secret

3. 💳 STRIPE SETUP
   ===============
   a) Go to: https://stripe.com
   b) Create account and complete setup
   c) Get API keys:
      - Go to Developers → API keys
      - Copy Publishable key and Secret key
   
   d) Create webhook:
      - Go to Developers → Webhooks
      - Add endpoint: https://paradoc.app/api/stripe/webhook
      - Select events:
        * checkout.session.completed
        * invoice.payment_succeeded
        * customer.subscription.created
        * customer.subscription.updated
        * customer.subscription.deleted
      - Copy webhook secret

4. 🤖 AI SERVICES SETUP
   ====================
   a) OpenRouter:
      - Go to: https://openrouter.ai
      - Create account and add credits
      - Go to API Keys → Create new key
   
   b) HuggingFace:
      - Go to: https://huggingface.co
      - Create account
      - Go to Settings → Access Tokens → Create new token

5. 📧 EMAIL SERVICE SETUP
   ======================
   a) Go to: https://resend.com
   b) Create account
   c) Go to API Keys → Create new key

6. ⚙️ VERCEL ENVIRONMENT VARIABLES
   ===============================
   a) Go to your Vercel project dashboard
   b) Go to Settings → Environment Variables
   c) Add all variables from .env.vercel file
   d) Replace placeholder values with actual API keys
   e) Redeploy your application

7. 🌐 CUSTOM DOMAIN SETUP
   ======================
   a) In Vercel Dashboard → Settings → Domains
   b) Add custom domain: paradoc.app
   c) Configure DNS records in your domain provider:
      Type: A, Name: @, Value: 76.76.19.34
      Type: CNAME, Name: www, Value: cname.vercel-dns.com
   d) Wait for DNS propagation (up to 24 hours)

8. ✅ TESTING
   ==========
   a) Visit https://paradoc.app
   b) Test user registration
   c) Test document generation
   d) Test payment flow
   e) Check all integrations working

🎉 FINAL RESULT:
Your app will be live at: https://paradoc.app
All features working: Authentication, AI generation, Payments, Email

📞 NEED HELP?
- Check Vercel deployment logs
- Verify environment variables are set
- Test each integration individually
- Check browser console for errors

🚀 Your ParaDoc.app is ready to go live!
