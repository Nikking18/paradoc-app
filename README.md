# ParaDoc.app

AI-Powered Legal Document Generation & Analysis Platform

## 🌐 Live Demo
**https://paradoc.app**

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe
- **Email**: Resend
- **AI**: OpenRouter (GPT/Claude), HuggingFace (Legal Models)
- **Hosting**: Vercel

## ✨ Features

- 🤖 AI-powered legal document generation
- 📄 Contract analysis and risk assessment
- 🔐 Secure authentication with Google OAuth
- 💳 Stripe payment integration
- 📧 Email notifications with Resend
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nikking18/paradoc-app.git
cd paradoc-app/paradoc.app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.production.template .env.local
# Edit .env.local with your API keys
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_STEP_BY_STEP.md) - Complete deployment instructions
- [Environment Variables](./env.production.template) - Required API keys and configuration
- [Database Schema](./database-schema.sql) - Database structure and migrations

## 🚀 Deployment

This app is automatically deployed to Vercel when you push to the main branch.

**Production URL**: https://paradoc.app

## 📄 License

MIT License
