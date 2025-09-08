# 🚀 **ParaDoc.app - Complete Deployment Guide**

## 🌐 **Target Domain: paradoc.app**

This guide will walk you through deploying ParaDoc.app to Vercel with your custom domain.

---

## **Phase 1: Vercel Deployment**

### **Step 1: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import Repository**: `https://github.com/Nikking18/paradoc-app`
5. **Configure Project**:
   - **Project Name**: `paradoc-app`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./paradoc.app`
6. **Click "Deploy"**

### **Step 2: Get Your Vercel Domain**

After deployment, you'll get a domain like: `https://paradoc-app-xxx.vercel.app`

**Keep this URL handy** - you'll need it for the next steps.

---

## **Phase 2: Custom Domain Setup**

### **Step 3: Configure Custom Domain**

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `paradoc.app`
   - Click **"Add"**

2. **DNS Configuration** (in your domain provider):
   ```
   Type: A
   Name: @
   Value: 76.76.19.34
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (up to 24 hours)

---

## **Phase 3: Environment Variables Setup**

### **Step 4: Add Environment Variables to Vercel**

**In Vercel Dashboard** → **Settings** → **Environment Variables**

Add these variables (we'll get the values in the next phases):

```env
# Supabase (Phase 4)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth (Phase 5)
NEXTAUTH_URL=https://paradoc.app
NEXTAUTH_SECRET=your_generated_secret

# Google OAuth (Phase 5)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe (Phase 6)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Resend (Phase 7)
RESEND_API_KEY=your_resend_api_key

# AI APIs (Phase 8)
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

---

## **Phase 4: Supabase Setup**

### **Step 5: Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your account
3. **Click "New Project"**
4. **Configure Project**:
   - **Name**: `paradoc-app`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. **Click "Create new project"**

### **Step 6: Get Supabase Credentials**

1. **In Supabase Dashboard** → **Settings** → **API**
2. **Copy these values**:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (SUPABASE_ANON_KEY)
   - **service_role** key (SUPABASE_SERVICE_ROLE_KEY)

### **Step 7: Run Database Migration**

1. **In Supabase Dashboard** → **SQL Editor**
2. **Copy the contents** of `database-schema.sql`
3. **Paste and run** the SQL script
4. **Verify tables created**:
   - users
   - documents
   - verification_tokens
   - user_subscriptions

---

## **Phase 5: Google OAuth Setup**

### **Step 8: Create Google OAuth App**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create New Project** or select existing
3. **Enable Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click **"Enable"**

4. **Create OAuth Credentials**:
   - Go to **APIs & Services** → **Credentials**
   - Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
   - **Application type**: Web application
   - **Name**: ParaDoc.app
   - **Authorized redirect URIs**:
     ```
     https://paradoc.app/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google (for local testing)
     ```

5. **Copy Credentials**:
   - **Client ID** (GOOGLE_CLIENT_ID)
   - **Client Secret** (GOOGLE_CLIENT_SECRET)

### **Step 9: Generate NextAuth Secret**

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

---

## **Phase 6: Stripe Setup**

### **Step 10: Create Stripe Account**

1. **Go to [stripe.com](https://stripe.com)**
2. **Sign up** for an account
3. **Complete account setup**

### **Step 11: Get Stripe Keys**

1. **In Stripe Dashboard** → **Developers** → **API keys**
2. **Copy these values**:
   - **Publishable key** (STRIPE_PUBLISHABLE_KEY)
   - **Secret key** (STRIPE_SECRET_KEY)

### **Step 12: Set Up Webhook**

1. **In Stripe Dashboard** → **Developers** → **Webhooks**
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://paradoc.app/api/stripe/webhook`
4. **Events to send**:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Copy webhook secret** (STRIPE_WEBHOOK_SECRET)

---

## **Phase 7: Resend Email Setup**

### **Step 13: Create Resend Account**

1. **Go to [resend.com](https://resend.com)**
2. **Sign up** for an account
3. **Verify your domain** (optional but recommended)

### **Step 14: Get Resend API Key**

1. **In Resend Dashboard** → **API Keys**
2. **Create new API key**
3. **Copy the key** (RESEND_API_KEY)

---

## **Phase 8: AI Services Setup**

### **Step 15: OpenRouter Setup**

1. **Go to [openrouter.ai](https://openrouter.ai)**
2. **Sign up** for an account
3. **Add credits** to your account
4. **Go to API Keys** section
5. **Create new API key** (OPENROUTER_API_KEY)

### **Step 16: HuggingFace Setup**

1. **Go to [huggingface.co](https://huggingface.co)**
2. **Sign up** for an account
3. **Go to Settings** → **Access Tokens**
4. **Create new token** (HUGGINGFACE_API_KEY)

---

## **Phase 9: Final Configuration**

### **Step 17: Update Environment Variables**

1. **Go back to Vercel Dashboard**
2. **Add all the API keys** you collected
3. **Redeploy** your application

### **Step 18: Test Your Deployment**

1. **Visit** `https://paradoc.app`
2. **Test signup/signin**
3. **Test document generation**
4. **Test payment flow**

---

## **🎯 Final Result**

After completing all phases:

✅ **Your app will be live at**: `https://paradoc.app`
✅ **Auto-deploying** on every git push
✅ **Fully functional** with all integrations
✅ **Production-ready** AI-powered legal platform

---

## **📞 Need Help?**

If you encounter any issues:

1. **Check Vercel deployment logs**
2. **Verify environment variables** are set correctly
3. **Test each integration** individually
4. **Check browser console** for errors

---

**🚀 Ready to deploy? Start with Phase 1!**
