# ParaDoc.app - Deployment Guide

## 🚀 **Deployment Steps**

### 1. **GitHub Repository Setup**

1. Create a new repository on GitHub
2. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit: ParaDoc.app setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/paradoc-app.git
git push -u origin main
```

### 2. **Vercel Deployment**

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard

### 3. **Environment Variables for Production**

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Supabase
SUPABASE_URL=your_actual_supabase_url
SUPABASE_ANON_KEY=your_actual_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe (can be added later)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Resend
RESEND_API_KEY=your_resend_api_key

# AI APIs
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### 4. **Auto-Deployment Setup**

Vercel automatically deploys when you push to the `main` branch. For other branches:
- Create feature branches: `git checkout -b feature/new-feature`
- Push: `git push origin feature/new-feature`
- Create Pull Request on GitHub
- Vercel creates preview deployments for PRs

### 5. **Stripe Webhook Setup (Later)**

When ready to set up Stripe webhooks:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `invoice.payment_succeeded`
4. Copy webhook secret to Vercel environment variables

## 🔒 **Security Checklist**

✅ `.env.local` is in `.gitignore`  
✅ `.env.example` shows required variables without secrets  
✅ All API keys use environment variables  
✅ No hardcoded secrets in code  
✅ Vercel environment variables are set  

## 📝 **Next Development Steps**

1. **Set up your accounts:**
   - Supabase (database)
   - Google OAuth (authentication)
   - OpenRouter (AI)
   - HuggingFace (legal models)
   - Resend (email)

2. **Update environment variables** with real API keys

3. **Deploy to Vercel** and get your domain

4. **Start building features:**
   - User authentication flow
   - Document generation interface
   - Legal analysis tools
   - Payment integration

## 🛠️ **Development Workflow**

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys to production
# Or create feature branch for testing
git checkout -b feature/new-feature
git push origin feature/new-feature
# Create PR for review
```

## 📊 **Monitoring**

- Vercel provides built-in analytics
- Check deployment logs in Vercel dashboard
- Monitor API usage in respective dashboards
- Set up error tracking (Sentry, etc.)

---

**Your app will be live at:** `https://your-project-name.vercel.app`
