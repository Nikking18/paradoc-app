# 💳 Stripe Webhook Setup Guide for paradoc.app

## 🌐 **Your Custom Domain: paradoc.app**

### **Final Webhook URL:**
```
https://paradoc.app/api/stripe/webhook
```

---

## 🚀 **Step-by-Step Setup**

### 1. **Get Your Stripe Keys**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
4. Add them to your `.env.local`:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 2. **Deploy Your App to Vercel**

Before setting up webhooks, you need your app deployed on Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository: `https://github.com/Nikking18/paradoc-app`
3. Add your environment variables in Vercel dashboard
4. Deploy to get your Vercel domain (e.g., `https://paradoc-app.vercel.app`)

### 3. **Configure Custom Domain: paradoc.app**

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Add custom domain: `paradoc.app`
   - Follow DNS configuration instructions

2. **DNS Configuration (in your domain provider):**
   ```
   Type: A
   Name: @
   Value: 76.76.19.34
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (can take up to 24 hours)

### 4. **Set Up Stripe Webhook**

1. **Go to Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://paradoc.app/api/stripe/webhook`
4. **Events to send**:
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_succeeded`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
5. Click **"Add endpoint"**

### 5. **Get Webhook Secret**

1. After creating the webhook, click on it
2. Go to **"Signing secret"** section
3. Click **"Reveal"** to see the webhook secret
4. Copy the secret (starts with `whsec_`)

### 6. **Add Webhook Secret to Vercel**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_your_webhook_secret_here`
4. Click **"Save"**

### 7. **Test the Webhook**

1. In Stripe Dashboard → Webhooks → Your webhook
2. Click **"Send test webhook"**
3. Select event: `checkout.session.completed`
4. Click **"Send test webhook"**
5. Check Vercel logs to see if it's working

---

## 🔧 **Webhook Events Explained**

### `checkout.session.completed`
- Triggered when a customer completes a payment
- Use this to:
  - Grant access to premium features
  - Send confirmation emails
  - Update user subscription status

### `invoice.payment_succeeded`
- Triggered when a subscription payment is successful
- Use this to:
  - Extend subscription period
  - Send renewal confirmation
  - Update billing records

### `customer.subscription.created`
- Triggered when a new subscription is created
- Use this to:
  - Welcome new subscribers
  - Set up user permissions
  - Initialize subscription data

---

## 🛠️ **Current Webhook Handler**

Your webhook handler is already set up in `src/app/api/stripe/webhook/route.ts`:

```typescript
// Handles these events:
// - checkout.session.completed
// - invoice.payment_succeeded
```

---

## 🔍 **Troubleshooting**

### Webhook Not Receiving Events?
1. ✅ Check your endpoint URL is correct: `https://paradoc.app/api/stripe/webhook`
2. ✅ Verify webhook secret in Vercel environment variables
3. ✅ Check Vercel deployment logs
4. ✅ Ensure your app is deployed and accessible at paradoc.app

### 404 Errors?
1. ✅ Make sure your app is deployed to Vercel
2. ✅ Check the webhook URL path: `/api/stripe/webhook`
3. ✅ Verify the route file exists
4. ✅ Ensure custom domain is properly configured

### 400 Errors?
1. ✅ Check webhook secret matches
2. ✅ Verify Stripe signature
3. ✅ Check request body format

---

## 📊 **Monitoring Webhooks**

### Stripe Dashboard
- Go to **Webhooks** → Your webhook
- View **"Recent deliveries"**
- Check **"Response"** and **"Status"**

### Vercel Logs
1. Go to your Vercel project
2. Click on latest deployment
3. Go to **"Functions"** tab
4. Check `/api/stripe/webhook` logs

---

## 🚀 **Next Steps After Webhook Setup**

1. **Test with real payments** (use Stripe test cards)
2. **Implement subscription logic** in your app
3. **Add user management** based on subscription status
4. **Set up email notifications** for payment events

---

## 💡 **Pro Tips**

- **Always test with Stripe's test mode first**
- **Use Stripe CLI for local webhook testing**
- **Monitor webhook failures and retry logic**
- **Keep webhook handlers idempotent** (safe to run multiple times)

---

## 📋 **Quick Checklist**

- [ ] Get Stripe API keys
- [ ] Deploy app to Vercel
- [ ] Configure custom domain: paradoc.app
- [ ] Create webhook in Stripe Dashboard
- [ ] Copy webhook secret
- [ ] Add secret to Vercel environment variables
- [ ] Test webhook with test event
- [ ] Monitor logs for success

---

**🎯 Your webhook will be live at:** `https://paradoc.app/api/stripe/webhook`

**🔗 Your GitHub repo:** `https://github.com/Nikking18/paradoc-app`

**🌐 Your custom domain:** `paradoc.app`

---

**Need help?** Check Vercel logs and Stripe webhook delivery status. Your webhook handler is already built and ready! 🚀
