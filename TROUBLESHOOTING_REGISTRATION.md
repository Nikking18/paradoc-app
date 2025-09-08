# 🔧 **ParaDoc.app - Registration Issue Troubleshooting**

## 🚨 **Issue: User Registration Error**

If you're getting errors when trying to register a new user, this is likely due to missing or incorrect environment variables in your Vercel deployment.

---

## 🔍 **Root Cause Analysis**

The registration system requires several environment variables to be properly configured:

1. **Supabase Configuration** - Database connection
2. **Email Service** - SMTP configuration for verification emails
3. **NextAuth Configuration** - Authentication secrets
4. **Google OAuth** - For Google sign-in

---

## ✅ **Step-by-Step Fix**

### **Step 1: Check Vercel Environment Variables**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `paradoc-app` project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set:

#### **Required Environment Variables:**

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=https://paradoc.app
NEXTAUTH_SECRET=your_generated_secret

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Service (Optional - for email verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@paradoc.app

# AI Services
OPENROUTER_API_KEY=your_openrouter_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend (Optional - alternative email service)
RESEND_API_KEY=your_resend_api_key
```

### **Step 2: Generate NextAuth Secret**

If you don't have a NextAuth secret, generate one:

```bash
# Run this command in your terminal
openssl rand -base64 32
```

Copy the generated string and add it as `NEXTAUTH_SECRET` in Vercel.

### **Step 3: Set Up Supabase (If Not Done)**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy the Project URL and API keys
5. Add them to Vercel environment variables

### **Step 4: Redeploy**

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deployment

---

## 🧪 **Testing Registration**

### **Test 1: Basic Registration**
1. Go to [https://paradoc.app](https://paradoc.app)
2. Click **Sign Up**
3. Fill in the registration form
4. Submit and check for errors

### **Test 2: Google OAuth**
1. Click **Sign in with Google**
2. Complete Google authentication
3. Check if user is created in Supabase

### **Test 3: Email Verification**
1. Check if verification email is sent
2. Click the verification link
3. Verify account is activated

---

## 🔧 **Common Issues & Solutions**

### **Issue 1: "Failed to create user account"**
**Solution:** Check Supabase environment variables and database connection

### **Issue 2: "Email verification failed"**
**Solution:** Configure SMTP settings or use Resend API

### **Issue 3: "Google OAuth not working"**
**Solution:** Verify Google OAuth credentials and redirect URLs

### **Issue 4: "Database connection error"**
**Solution:** Check Supabase URL and service role key

---

## 📋 **Quick Fix Checklist**

- [ ] Supabase URL and keys configured
- [ ] NextAuth secret generated and set
- [ ] Google OAuth credentials (if using Google sign-in)
- [ ] Email service configured (SMTP or Resend)
- [ ] Vercel deployment redeployed
- [ ] Test registration flow

---

## 🚀 **Alternative: Use Google OAuth Only**

If you want to simplify the setup, you can temporarily disable email/password registration and only use Google OAuth:

1. Go to your signup page
2. Remove the email/password form
3. Keep only the Google OAuth button
4. This eliminates the need for email service configuration

---

## 📞 **Need Help?**

If you're still having issues:

1. Check the Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the Supabase connection separately
4. Check the browser console for client-side errors

---

## 🎯 **Expected Result**

After fixing the environment variables:

✅ Users can register with email/password  
✅ Users can sign in with Google  
✅ Email verification works (if configured)  
✅ Users are created in Supabase database  
✅ Users can access the dashboard  

---

*This guide should resolve your registration issues. The most common cause is missing Supabase configuration.*
