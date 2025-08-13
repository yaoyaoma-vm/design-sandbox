# Design Sandbox - Complete Setup Guide

## 🎯 Project Overview
A designer-friendly sandbox environment built with Next.js, Firebase, and GitHub Actions for automated deployment. This guide documents the complete setup process completed.

## 🏗️ Technology Stack
- **Frontend**: Next.js 15.4.6 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + GSAP
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions
- **Package Manager**: npm

## 📋 Prerequisites Completed
- ✅ Node.js v24.5.0 installed
- ✅ npm package manager
- ✅ Git configured
- ✅ GitHub account with repository access
- ✅ Firebase account with project created

## 🚀 Complete Setup Steps

### 1. Project Initialization
```bash
# Clone or create project directory
mkdir design-sandbox
cd design-sandbox

# Initialize Next.js project (already completed)
npm init -y
npm install next@latest react@latest react-dom@latest
```

### 2. Dependencies Installation
```bash
# Core dependencies
npm install framer-motion gsap lucide-react

# Development dependencies
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next tailwindcss
```

### 3. Firebase Setup
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# List available projects
firebase projects:list

# Set active project
firebase use design-sandbox-d8242

# Initialize Firebase (if not already done)
firebase init hosting
```

### 4. Firebase Configuration Files

#### `.firebaserc`
```json
{
  "projects": {
    "default": "design-sandbox-d8242",
    "staging": "design-sandbox-d8242"
  },
  "targets": {},
  "etags": {}
}
```

#### `firebase.json`
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 5. Next.js Configuration

#### `next.config.ts`
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

#### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build",
    "deploy": "npm run build && firebase deploy"
  }
}
```

### 6. GitHub Repository Setup
```bash
# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/yaoyaoma-vm/design-sandbox.git

# Create and switch to main branch
git checkout -b main

# Initial commit
git add .
git commit -m "Initial commit: Design Sandbox with AI Prototype project and Firebase integration"
git push -u origin main
```

### 7. GitHub Actions Workflow

#### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Install Firebase CLI
      run: npm install -g firebase-tools@latest
      
    - name: Deploy to Firebase
      if: github.ref == 'refs/heads/main'
      run: firebase use design-sandbox-d8242 && firebase deploy --only hosting --token "${{ secrets.FIREBASE_TOKEN }}"
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
        
    - name: Deploy Preview
      if: github.event_name == 'pull_request'
      run: firebase use design-sandbox-d8242 && firebase hosting:channel:deploy preview-${{ github.event.number }} --token "${{ secrets.FIREBASE_TOKEN }}"
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### 8. Firebase Token Setup
```bash
# Generate CI token (deprecated but still works)
firebase login:ci --no-localhost

# Copy the generated token
# Example: [YOUR_GENERATED_TOKEN_HERE]
# Note: Replace with your actual token when setting up
```

### 9. GitHub Secrets Configuration
1. Go to: https://github.com/yaoyaoma-vm/design-sandbox/settings/secrets/actions
2. Click "New repository secret"
3. **Name**: `FIREBASE_TOKEN`
4. **Value**: [Your generated Firebase token]

### 10. Enhanced .gitignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js build output
.next/
out/
dist/

# Firebase
.firebase/
firebase-debug.log
firebase-debug.*.log
.firebaserc

# Production builds
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log
pglite-debug.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache
.eslintrc.local
.eslintrc.*.local

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity
.yarn/
yarn.lock

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js cache
.next/cache/
.next/

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.storybook-out

# Additional development tools
*.tsbuildinfo
*.tsbuildinfo.local

# Local development
.local/
local/

# Database files (if using local databases)
*.db
*.sqlite
*.sqlite3

# Backup files
*.bak
*.backup
*.old

# Temporary folders
tmp/
temp/
*.tmp
*.temp

# Additional build artifacts
*.tgz
*.tar.gz
*.zip

# Local development files
.env.example
.env.*.local
```

## 🎨 Project Structure
```
design-sandbox/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   └── ai-prototype/
│   │   │       ├── page.tsx
│   │   │       └── project.json
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── projects/
│   │       ├── ProjectCard.tsx
│   │       └── ProjectsSection.tsx
│   └── lib/
│       ├── animations.ts
│       ├── projects.ts
│       └── utils.ts
├── .firebaserc
├── .gitignore
├── firebase.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Deployment Commands

### Local Development
```bash
npm run dev
# Access at http://localhost:3000
```

### Manual Build & Deploy
```bash
# Build project
npm run build

# Deploy to Firebase
firebase deploy

# Or use the combined script
npm run deploy
```

### Automated Deployment
```bash
# Push to GitHub (triggers automatic deployment)
git add .
git commit -m "Your commit message"
git push
```

## 🔍 Verification Steps

### 1. Local Development
- [ ] `npm run dev` starts successfully
- [ ] App accessible at http://localhost:3000
- [ ] AI Prototype project loads correctly

### 2. Build Process
- [ ] `npm run build` completes without errors
- [ ] Static files generated in `out/` directory
- [ ] No TypeScript or ESLint errors

### 3. Firebase Connection
- [ ] `firebase projects:list` shows correct project
- [ ] `firebase use design-sandbox-d8242` works
- [ ] `firebase deploy` deploys successfully

### 4. GitHub Actions
- [ ] Workflow file exists at `.github/workflows/deploy.yml`
- [ ] Push to main branch triggers workflow
- [ ] Build and deployment complete successfully
- [ ] Live site updated at https://design-sandbox-d8242.web.app

## 🌐 Live URLs
- **Main App**: https://design-sandbox-d8242.web.app
- **AI Prototype**: https://design-sandbox-d8242.web.app/projects/ai-prototype
- **Firebase Console**: https://console.firebase.google.com/project/design-sandbox-d8242/overview
- **GitHub Repository**: https://github.com/yaoyaoma-vm/design-sandbox

## 🛠️ Troubleshooting

### Common Issues
1. **Build Fails**: Check TypeScript errors and ESLint warnings
2. **Firebase Deploy Fails**: Verify project ID and authentication
3. **GitHub Actions Fail**: Check FIREBASE_TOKEN secret and workflow syntax
4. **Local Dev Issues**: Clear `.next` cache and reinstall dependencies

### Useful Commands
```bash
# Clear Next.js cache
rm -rf .next out

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Firebase status
firebase projects:list
firebase use --add

# Verify git remote
git remote -v
```

## 🎯 Next Steps
1. **Add More Projects**: Create new prototype projects in `src/app/projects/`
2. **Enhance Components**: Add more interactive elements and animations
3. **Customize Styling**: Modify Tailwind classes and add custom CSS
4. **Add Features**: Implement user authentication, database, or API integrations

## 📚 Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Setup completed on**: December 19, 2024  
**Last updated**: December 19, 2024  
**Status**: ✅ Fully functional with automated deployment
