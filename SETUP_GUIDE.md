# 🚀 ParaDoc.app - Complete Setup Guide

## ✅ **Phase 1: Core Functionality - COMPLETED**

All core features have been implemented and are ready for deployment:

### **🔐 Authentication System**
- ✅ NextAuth.js with Google OAuth
- ✅ Sign In/Sign Up pages
- ✅ Session management
- ✅ Protected routes

### **👤 User Onboarding**
- ✅ 4-step onboarding flow
- ✅ Profile data collection
- ✅ Progress tracking
- ✅ Data persistence

### **📊 User Dashboard**
- ✅ Comprehensive dashboard
- ✅ Document management
- ✅ User statistics
- ✅ Quick actions

### **📄 Document Generation**
- ✅ AI-powered generation (OpenRouter/Claude)
- ✅ 6 document templates
- ✅ 3-step creation process
- ✅ Jurisdiction-specific compliance

### **💳 Payment Integration**
- ✅ Stripe checkout
- ✅ Subscription management
- ✅ Webhook handling
- ✅ Trial system

---

## 🛠️ **Setup Instructions**

### **1. Environment Variables**

Create `.env.local` file with these variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# AI API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Email Configuration
RESEND_API_KEY=your_resend_api_key
```

### **2. Database Setup**

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get URL and keys

2. **Run Database Schema**
   - Copy contents of `database-schema.sql`
   - Run in Supabase SQL editor
   - This creates all required tables and policies

### **3. Google OAuth Setup**

1. **Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google+ API

2. **Create OAuth Credentials**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

### **4. Stripe Setup**

1. **Stripe Dashboard**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Get API keys from Developers > API keys

2. **Create Products & Prices**
   - Create Pro plan product
   - Set monthly price: $20
   - Set yearly price: $510
   - Get price IDs for environment variables

3. **Webhook Setup**
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

### **5. AI API Setup**

1. **OpenRouter**
   - Go to [openrouter.ai](https://openrouter.ai)
   - Create account and get API key
   - Add credits for Claude 3.5 Sonnet

2. **Hugging Face** (Optional)
   - Go to [huggingface.co](https://huggingface.co)
   - Create account and get API key
   - For future legal model integrations

### **6. Email Setup**

1. **Resend**
   - Go to [resend.com](https://resend.com)
   - Create account and get API key
   - Verify domain for production

---

## 🚀 **Deployment**

### **Vercel Deployment**

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Connect to `paradoc-app` repo

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Set `NEXTAUTH_URL` to your Vercel domain

3. **Deploy**
   - Vercel will auto-deploy on push
   - Check deployment logs for any issues

### **Custom Domain**

1. **Domain Configuration**
   - Add custom domain in Vercel
   - Update DNS records
   - Update `NEXTAUTH_URL` to custom domain

---

## 🧪 **Testing**

### **User Flow Testing**

1. **Sign Up Flow**
   - Visit `/auth/signup`
   - Sign up with Google
   - Complete onboarding
   - Verify dashboard access

2. **Document Generation**
   - Go to `/dashboard/create`
   - Select template
   - Fill details
   - Generate document
   - Verify AI generation

3. **Payment Flow**
   - Visit `/pricing`
   - Select plan
   - Complete Stripe checkout
   - Verify subscription status

### **API Testing**

Test all API endpoints:
- `GET /api/user/profile` - User profile
- `POST /api/user/profile` - Update profile
- `GET /api/documents` - User documents
- `POST /api/documents/generate` - Generate document
- `POST /api/stripe/create-checkout-session` - Create checkout

---

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Authentication Not Working**
   - Check Google OAuth credentials
   - Verify redirect URIs
   - Check NEXTAUTH_SECRET

2. **Database Errors**
   - Verify Supabase connection
   - Check RLS policies
   - Ensure tables exist

3. **AI Generation Failing**
   - Check OpenRouter API key
   - Verify API credits
   - Check model availability

4. **Payment Issues**
   - Verify Stripe keys
   - Check webhook configuration
   - Test with Stripe test mode

### **Logs & Debugging**

- Check Vercel function logs
- Monitor Supabase logs
- Check browser console for errors
- Verify environment variables

---

## 📈 **Next Steps**

### **Phase 2: Enhanced Features**
- [ ] AI chatbot for legal questions
- [ ] Document editor and preview
- [ ] File upload and analysis
- [ ] Advanced search and filters
- [ ] Team collaboration features

### **Phase 3: Scale & Optimize**
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API for third-party integrations
- [ ] White-label solutions

---

## 🎯 **Success Metrics**

Track these key metrics:
- User sign-ups and onboarding completion
- Document generation success rate
- Payment conversion rate
- User engagement and retention
- AI generation quality and speed

---

**🎉 Your ParaDoc.app is now ready for launch!**

All core functionality is implemented with proper error handling, security, and user experience. The application follows best practices for authentication, database management, and payment processing.
