# 🚀 **ParaDoc.app Deployment Checklist**

## 🌐 **Your Domain: paradoc.app**

### **Final URLs:**
- **Main App:** `https://paradoc.app`
- **Stripe Webhook:** `https://paradoc.app/api/stripe/webhook`
- **GitHub Repo:** `https://github.com/Nikking18/paradoc-app`

---

## 📋 **Deployment Steps**

### **Phase 1: Vercel Deployment**
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import GitHub repo: `https://github.com/Nikking18/paradoc-app`
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy to get Vercel domain (e.g., `paradoc-app.vercel.app`)

### **Phase 2: Custom Domain Setup**
- [ ] In Vercel → Settings → Domains
- [ ] Add custom domain: `paradoc.app`
- [ ] Configure DNS records in your domain provider:
  ```
  Type: A
  Name: @
  Value: 76.76.19.34
  
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```
- [ ] Wait for DNS propagation (up to 24 hours)

### **Phase 3: Stripe Webhook Setup**
- [ ] Get Stripe API keys from dashboard
- [ ] Create webhook endpoint: `https://paradoc.app/api/stripe/webhook`
- [ ] Select events: `checkout.session.completed`, `invoice.payment_succeeded`
- [ ] Copy webhook secret
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
- [ ] Test webhook with test event

---

## 🔑 **Required Environment Variables**

### **Vercel Dashboard → Settings → Environment Variables**

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=https://paradoc.app
NEXTAUTH_SECRET=your_generated_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Resend
RESEND_API_KEY=your_resend_api_key

# AI APIs
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

---

## 🎯 **Final Result**

After completion, your app will be:
- ✅ **Live at:** `https://paradoc.app`
- ✅ **Auto-deploying** on every git push
- ✅ **Stripe webhook** receiving payment events
- ✅ **Fully functional** AI-powered legal platform

---

## 📚 **Guides Available**

- `STRIPE_WEBHOOK_SETUP_PARADOC.md` - Complete webhook setup
- `DEPLOYMENT.md` - General deployment guide
- `DEPLOYMENT_READY.md` - Quick summary

---

**🚀 Ready to deploy! Start with Phase 1 (Vercel deployment).**
