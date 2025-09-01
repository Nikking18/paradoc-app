# ParaDoc.app

AI-Powered Legal Document Generation & Analysis Platform

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe
- **Email**: Resend
- **AI**: OpenRouter (GPT/Claude), HuggingFace (Legal Models)

## Features

- 🤖 AI-powered legal document generation
- 📄 Contract analysis and risk assessment
- 🔐 Secure authentication with Google OAuth
- 💳 Stripe payment integration
- 📧 Email notifications with Resend
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account
- Resend account
- OpenRouter API key
- HuggingFace API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd paradoc.app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Copy `.env.local.example` to `.env.local` and fill in your API keys:

```env
# Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Resend
RESEND_API_KEY=your_resend_api_key_here

# AI APIs
OPENROUTER_API_KEY=your_openrouter_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/generate` - AI document generation
- `/api/analyze` - Legal document analysis
- `/api/stripe/webhook` - Stripe webhook handler

## Deployment

### Quick Deploy with Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables for Production

Make sure to update `NEXTAUTH_URL` to your production domain.

## Development Workflow

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys to production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
