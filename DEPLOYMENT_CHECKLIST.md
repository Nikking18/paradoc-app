# ✅ **ParaDoc.app Deployment Checklist**

## 🚀 **Quick Deployment Steps**

### **Phase 1: Vercel Deployment**
- [ ] Go to [vercel.com](https://vercel.com) and sign in
- [ ] Click "New Project" 
- [ ] Import repository: `https://github.com/Nikking18/paradoc-app`
- [ ] Set root directory to: `./paradoc.app`
- [ ] Click "Deploy"
- [ ] Note your Vercel domain (e.g., `paradoc-app-xxx.vercel.app`)

### **Phase 2: Custom Domain**
- [ ] In Vercel → Settings → Domains
- [ ] Add domain: `paradoc.app`
- [ ] Configure DNS records in your domain provider:
  ```
  Type: A, Name: @, Value: 76.76.19.34
  Type: CNAME, Name: www, Value: cname.vercel-dns.com
  ```
- [ ] Wait for DNS propagation (up to 24 hours)

### **Phase 3: Supabase Setup**
- [ ] Go to [supabase.com](https://supabase.com) and create account
- [ ] Create new project: "paradoc-app"
- [ ] Copy Project URL, anon key, and service_role key
- [ ] Go to SQL Editor and run `database-schema.sql`
- [ ] Verify tables: users, documents, verification_tokens, user_subscriptions

### **Phase 4: Google OAuth**
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project or select existing
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add redirect URI: `https://paradoc.app/api/auth/callback/google`
- [ ] Copy Client ID and Client Secret

### **Phase 5: Environment Variables**
- [ ] In Vercel Dashboard → Settings → Environment Variables
- [ ] Add all variables from `env.production.template`
- [ ] Generate NextAuth secret: `openssl rand -base64 32`
- [ ] Redeploy application

### **Phase 6: Stripe Setup**
- [ ] Go to [stripe.com](https://stripe.com) and create account
- [ ] Get API keys from Dashboard → Developers → API keys
- [ ] Create webhook endpoint: `https://paradoc.app/api/stripe/webhook`
- [ ] Select events: checkout.session.completed, invoice.payment_succeeded
- [ ] Copy webhook secret

### **Phase 7: AI Services**
- [ ] Go to [openrouter.ai](https://openrouter.ai) and create account
- [ ] Add credits and get API key
- [ ] Go to [huggingface.co](https://huggingface.co) and create account
- [ ] Generate access token

### **Phase 8: Email Service**
- [ ] Go to [resend.com](https://resend.com) and create account
- [ ] Create API key
- [ ] Verify domain (optional)

### **Phase 9: Testing**
- [ ] Visit `https://paradoc.app`
- [ ] Test user registration
- [ ] Test document generation
- [ ] Test payment flow
- [ ] Check all integrations working

---

## 🎯 **Final Result**

After completing all steps:
✅ **Live at**: `https://paradoc.app`
✅ **Auto-deploying** on git push
✅ **All integrations** working
✅ **Production-ready** platform

---

## 📞 **Need Help?**

- **Vercel Issues**: Check deployment logs
- **Domain Issues**: Verify DNS configuration
- **Database Issues**: Check Supabase connection
- **Auth Issues**: Verify OAuth configuration
- **Payment Issues**: Check Stripe webhook logs

---

**🚀 Start with Phase 1 - Vercel Deployment!**
