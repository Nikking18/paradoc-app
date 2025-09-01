@echo off
echo 🚀 ParaDoc.app Setup Script
echo ==========================

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: ParaDoc.app setup"
    git branch -M main
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  Warning: .env.local not found
    echo Please create .env.local with your API keys
    echo See .env.example for required variables
) else (
    echo ✅ .env.local found
)

echo.
echo 📋 Next Steps:
echo 1. Create a GitHub repository
echo 2. Add your remote: git remote add origin https://github.com/YOUR_USERNAME/paradoc-app.git
echo 3. Push to GitHub: git push -u origin main
echo 4. Deploy to Vercel: https://vercel.com
echo 5. Add environment variables in Vercel dashboard
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md
echo.
echo 🎉 Setup complete! Happy coding!
pause
