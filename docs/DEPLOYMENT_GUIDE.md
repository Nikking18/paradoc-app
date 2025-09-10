# ParaDoc.app Backend Deployment Guide

## Overview

This guide covers deploying the ParaDoc.app backend with all integrations including NextAuth.js, Supabase, Stripe, and AI services.

## Prerequisites

Before deploying, ensure you have:

1. **Supabase Project**: Database and authentication
2. **Stripe Account**: Payment processing
3. **Google OAuth App**: Social authentication
4. **OpenRouter Account**: AI services
5. **Hugging Face Account**: Alternative AI services
6. **Email Service**: SMTP for email authentication

## Environment Variables

Create a `.env.local` file (or set environment variables in your deployment platform) with the following values:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-32-character-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI Services
OPENROUTER_API_KEY=your-openrouter-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key

# Database
DATABASE_URL=your-supabase-database-url

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-email-app-password
EMAIL_FROM=noreply@paradoc.app
```

## Database Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and API keys

### 2. Run Database Schema

Execute the SQL schema from `database/schema.sql` in your Supabase SQL editor:

```sql
-- Copy and paste the entire contents of database/schema.sql
```

### 3. Configure Row Level Security

The schema includes RLS policies. Ensure they're properly configured:

- Users can only access their own data
- Service role has full access for backend operations
- Audit logs are protected but readable by users

### 4. Set up Authentication

In Supabase Dashboard:
1. Go to Authentication → Settings
2. Enable Email authentication
3. Configure Google OAuth with your credentials
4. Set site URL and redirect URLs

## Stripe Setup

### 1. Create Stripe Account

1. Sign up at [Stripe](https://stripe.com)
2. Complete account verification
3. Get your API keys from the dashboard

### 2. Create Products and Prices

Create products for your subscription plans:

```bash
# Pro Plan
stripe products create --name "ParaDoc Pro" --description "Professional legal AI tools"
stripe prices create --product prod_XXX --unit-amount 5000 --currency usd --recurring interval=month

# Enterprise Plan (contact-based pricing)
stripe products create --name "ParaDoc Enterprise" --description "Enterprise legal AI solutions"
```

### 3. Configure Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
   - `checkout.session.completed`
4. Copy the webhook secret to your environment variables

## AI Services Setup

### 1. OpenRouter

1. Sign up at [OpenRouter](https://openrouter.ai)
2. Get your API key
3. Add credits to your account

### 2. Hugging Face

1. Sign up at [Hugging Face](https://huggingface.co)
2. Get your API token
3. Ensure you have access to the models used

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API

### 2. Create OAuth Credentials

1. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
2. Set application type to "Web application"
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Backend implementation complete"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Configure Domain**
   - Add your custom domain in Vercel
   - Update NEXTAUTH_URL environment variable

### Option 2: Railway

1. **Connect Repository**
   ```bash
   railway login
   railway init
   railway link [project-id]
   ```

2. **Set Environment Variables**
   ```bash
   railway variables:set NEXTAUTH_URL=https://your-app.railway.app
   # Set all other environment variables
   ```

3. **Deploy**
   ```bash
   railway up
   ```

### Option 3: Heroku

1. **Create Heroku App**
   ```bash
   heroku create paradoc-app
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NEXTAUTH_URL=https://paradoc-app.herokuapp.com
   # Set all other environment variables
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 4: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Deploy**
   ```bash
   docker build -t paradoc-app .
   docker run -p 3000:3000 --env-file .env.local paradoc-app
   ```

## Post-Deployment Steps

### 1. Test Authentication

- Test Google OAuth flow
- Test email authentication
- Verify session management

### 2. Test Stripe Integration

- Create test subscription
- Test webhook delivery
- Verify subscription status updates

### 3. Test AI Services

- Test document generation
- Test chatbot functionality
- Verify rate limiting

### 4. Monitor Performance

- Set up error tracking (Sentry recommended)
- Monitor API response times
- Track usage metrics

## Security Considerations

### 1. Environment Variables

- Never commit `.env.local` to version control
- Use secure environment variable storage in production
- Rotate API keys regularly

### 2. HTTPS

- Always use HTTPS in production
- Configure proper SSL certificates
- Set secure cookie flags

### 3. Rate Limiting

- Monitor for abuse patterns
- Adjust rate limits based on usage
- Implement IP-based blocking if needed

### 4. Monitoring

- Set up logging for all API endpoints
- Monitor failed authentication attempts
- Track unusual usage patterns

## Troubleshooting

### Common Issues

1. **NextAuth Session Issues**
   - Verify NEXTAUTH_URL is correct
   - Check NEXTAUTH_SECRET is set
   - Ensure cookies are working

2. **Stripe Webhook Failures**
   - Verify webhook secret
   - Check endpoint URL is accessible
   - Review webhook event logs

3. **AI Service Errors**
   - Check API key validity
   - Monitor rate limits
   - Verify model availability

4. **Database Connection Issues**
   - Check Supabase service status
   - Verify connection strings
   - Review RLS policies

### Logs and Monitoring

- Use `console.log` for development debugging
- Implement structured logging for production
- Set up alerts for critical errors
- Monitor database performance

## Maintenance

### Regular Tasks

1. **Update Dependencies**
   ```bash
   npm audit
   npm update
   ```

2. **Monitor Usage**
   - Track API usage patterns
   - Monitor subscription metrics
   - Review error rates

3. **Security Updates**
   - Rotate API keys quarterly
   - Update dependencies regularly
   - Review access logs

4. **Backup Strategy**
   - Supabase handles database backups
   - Export critical configuration
   - Document deployment procedures

## Support

For deployment support:
- Check the API documentation
- Review error logs and monitoring
- Contact the development team for critical issues
- Use the troubleshooting guide above

## Production Checklist

Before going live:

- [ ] All environment variables set correctly
- [ ] Database schema deployed and tested
- [ ] Stripe webhooks configured and tested
- [ ] Google OAuth working in production
- [ ] AI services tested and rate limits configured
- [ ] SSL certificate installed and HTTPS enforced
- [ ] Error monitoring and logging set up
- [ ] Performance monitoring configured
- [ ] Backup and recovery procedures documented
- [ ] Security review completed
- [ ] Load testing performed
- [ ] Documentation updated
