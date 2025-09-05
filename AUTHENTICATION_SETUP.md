# Authentication System Setup Guide

This guide will help you set up the complete authentication system for ParaDoc.app.

## 🚀 **What's Been Implemented**

### ✅ **Core Authentication Features**
1. **NextAuth Configuration** - Updated with credentials provider
2. **Supabase Integration** - User management and database operations
3. **Password Hashing** - Secure bcrypt implementation
4. **Email Verification** - Complete email verification flow
5. **Password Reset** - Forgot password functionality
6. **Form Validation** - Client-side and server-side validation

### ✅ **New Pages & Components**
- `/auth/verify-email` - Email verification page
- `/auth/forgot-password` - Password reset request page
- `/auth/reset-password` - Password reset form page
- Updated sign-in and sign-up forms with proper validation

### ✅ **API Routes**
- `/api/auth/register` - User registration
- `/api/auth/verify-email` - Email verification
- `/api/auth/forgot-password` - Password reset request
- `/api/auth/reset-password` - Password reset

## 📋 **Setup Requirements**

### 1. **Install Dependencies**
```bash
npm install bcryptjs @types/bcryptjs nodemailer @types/nodemailer crypto-js @types/crypto-js
```

### 2. **Environment Variables**
Create a `.env.local` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@paradoc.app

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# AI APIs
OPENROUTER_API_KEY=your-openrouter-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

### 3. **Supabase Database Setup**

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `database-schema.sql`
   - Execute the SQL to create all tables and policies

3. **Get your Supabase credentials**:
   - Go to Settings > API
   - Copy the Project URL and API keys

### 4. **Email Service Setup**

#### Option A: Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"
3. Use your Gmail address and the app password in the environment variables

#### Option B: Resend (Recommended for production)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update the email service to use Resend instead of nodemailer

### 5. **Google OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the Client ID and Client Secret

## 🔧 **Configuration Details**

### **Database Schema**
The system creates the following tables:
- `users` - User accounts and profiles
- `verification_tokens` - Email verification and password reset tokens
- `documents` - User documents (for future use)
- `user_subscriptions` - Subscription management (for future use)

### **Security Features**
- **Password Hashing**: bcrypt with 12 salt rounds
- **Token Expiration**: 24 hours for email verification, 1 hour for password reset
- **Row Level Security**: Supabase RLS policies protect user data
- **Input Validation**: Both client-side and server-side validation

### **Email Templates**
- **Verification Email**: Professional HTML template with verification link
- **Password Reset**: Secure reset link with expiration notice
- **Welcome Email**: Post-verification welcome message

## 🧪 **Testing the System**

### 1. **User Registration**
1. Go to `/auth/signup`
2. Fill out the registration form
3. Check your email for verification link
4. Click the verification link

### 2. **User Login**
1. Go to `/auth/signin`
2. Use your registered email and password
3. Should redirect to dashboard

### 3. **Password Reset**
1. Go to `/auth/signin`
2. Click "Forgot your password?"
3. Enter your email address
4. Check email for reset link
5. Follow the reset process

## 🚨 **Important Notes**

### **Production Considerations**
1. **Email Service**: Use a professional email service like Resend or SendGrid
2. **Domain**: Update `NEXTAUTH_URL` to your production domain
3. **Security**: Use strong, unique secrets for all environment variables
4. **Database**: Ensure Supabase is properly configured for production

### **Error Handling**
- All API routes include proper error handling
- User-friendly error messages
- Security-conscious error responses (don't reveal sensitive info)

### **Performance**
- Database indexes on frequently queried columns
- Efficient token cleanup (expired tokens are automatically removed)
- Optimized queries with proper joins

## 🔄 **Next Steps**

1. **Test the complete flow** - Registration → Verification → Login → Password Reset
2. **Set up production email service** - Replace Gmail SMTP with professional service
3. **Configure production Supabase** - Set up proper RLS policies and indexes
4. **Add user onboarding** - Complete the user profile setup flow
5. **Implement document management** - Connect to the documents table

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Email not sending**: Check SMTP credentials and firewall settings
2. **Database errors**: Verify Supabase connection and table creation
3. **OAuth issues**: Check Google OAuth configuration and redirect URIs
4. **Token expiration**: Verify system time and token expiration logic

### **Debug Mode**
Enable debug logging by setting `NEXTAUTH_DEBUG=true` in your environment variables.

---

**The authentication system is now fully implemented and ready for testing!** 🎉
