#!/bin/bash

echo "🚀 ParaDoc.app Setup Script"
echo "=========================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: ParaDoc.app setup"
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "Please create .env.local with your API keys"
    echo "See .env.example for required variables"
else
    echo "✅ .env.local found"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository"
echo "2. Add your remote: git remote add origin https://github.com/YOUR_USERNAME/paradoc-app.git"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy to Vercel: https://vercel.com"
echo "5. Add environment variables in Vercel dashboard"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Setup complete! Happy coding!"
