# Setup Best Practices & Git Guidelines

## 🚨 Critical: What NEVER to Commit

### Build Artifacts & Generated Files
These folders and files should **NEVER** be committed to Git:

```
.next/          # Next.js build cache and compiled files
out/            # Static export output (when using output: 'export')
dist/           # Distribution/build output
build/          # Build output
.firebase/      # Firebase deployment cache
```

### Cache & Temporary Files
```
.cache/         # Build cache
.parcel-cache/  # Parcel cache
.npm/           # NPM cache
.eslintcache/   # ESLint cache
*.tsbuildinfo   # TypeScript build info
```

### Log Files
```
*.log           # All log files
pglite-debug.log
firebase-debug.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Environment & Configuration
```
.env            # Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### IDE & Editor Files
```
.vscode/        # VS Code settings
.idea/          # IntelliJ/WebStorm settings
*.swp           # Vim swap files
*.swo           # Vim swap files
*~              # Backup files
```

### OS Generated Files
```
.DS_Store       # macOS
.DS_Store?
._*
.Spotlight-V100
.Trashes
Thumbs.db       # Windows
ehthumbs.db
```

## ✅ Proper .gitignore Setup

### For Next.js + Firebase Projects
Create a comprehensive `.gitignore` from the start:

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

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js cache
.next/cache/

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.storybook-out

# Temporary folders
tmp/
temp/
```

## 🔧 Project Setup Checklist

### 1. Initialize Repository
```bash
# Create new project
npx create-next-app@latest my-project --typescript --tailwind --eslint

# Initialize Git
git init
git add .
git commit -m "Initial commit"
```

### 2. Add .gitignore BEFORE First Commit
```bash
# Create .gitignore first
touch .gitignore
# Add the comprehensive .gitignore content above
git add .gitignore
git commit -m "Add comprehensive .gitignore"
```

### 3. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Configure firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

### 4. Next.js Configuration
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // For static hosting
  trailingSlash: true,     // For Firebase hosting
  images: {
    unoptimized: true      // For static export
  }
};

export default nextConfig;
```

## 🚫 Common Mistakes to Avoid

### 1. Committing Build Artifacts
❌ **Wrong:**
```bash
git add .next/
git add out/
git add .firebase/
```

✅ **Correct:**
```bash
# These should be in .gitignore and never committed
# Only commit source code and configuration
git add src/
git add package.json
git add next.config.ts
```

### 2. Committing Environment Variables
❌ **Wrong:**
```bash
git add .env
git add .env.local
```

✅ **Correct:**
```bash
# Create .env.example with placeholder values
cp .env .env.example
# Edit .env.example to remove sensitive data
git add .env.example
```

### 3. Committing Large Binary Files
❌ **Wrong:**
```bash
git add *.zip
git add *.pdf
git add node_modules/
```

✅ **Correct:**
```bash
# Use .gitignore to exclude these
# For large files, consider Git LFS
```

## 🔍 Repository Health Checks

### Regular Maintenance
```bash
# Check repository size
du -sh .git

# Clean up unnecessary files
git gc --aggressive
git prune

# Check for large files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort --numeric-sort --key=2 | tail -10
```

### Monitor Repository Growth
```bash
# Check commit history size
git log --oneline --stat

# Check for large commits
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```

## 🚨 Warning Signs of Corruption

### Symptoms to Watch For
- **Large repository size** (>100MB for typical web projects)
- **Slow Git operations** (clone, push, pull)
- **"missing blob" errors**
- **"broken link" errors**
- **"invalid reflog entry" errors**

### If Corruption is Detected
```bash
# Check corruption
git fsck --full

# If severe corruption, clone fresh
cd ..
git clone <repository-url> project-fresh
cd project-fresh
# Re-apply any legitimate changes
```

## 📋 Pre-commit Checklist

Before every commit, verify:

1. **No build artifacts** in staging area
2. **No environment files** with secrets
3. **No log files** or cache files
4. **No IDE-specific files**
5. **No OS-generated files**

```bash
# Check what's staged
git diff --cached --name-only

# Check for ignored files that might be tracked
git ls-files --ignored --exclude-standard
```

## 🎯 Best Practices Summary

### Do's ✅
- Set up comprehensive `.gitignore` from day one
- Commit only source code and configuration
- Use environment variables for secrets
- Regular repository maintenance
- Monitor repository size

### Don'ts ❌
- Commit build artifacts (`.next/`, `out/`, `dist/`)
- Commit cache files (`.firebase/`, `.cache/`)
- Commit log files (`*.log`)
- Commit environment files with secrets
- Commit IDE or OS-specific files
- Force push without understanding consequences

## 🔄 Recovery Procedures

### If Build Artifacts Were Committed
```bash
# Remove from Git tracking (but keep locally)
git rm --cached -r .next/
git rm --cached -r out/
git rm --cached -r .firebase/

# Add to .gitignore
echo ".next/" >> .gitignore
echo "out/" >> .gitignore
echo ".firebase/" >> .gitignore

# Commit the cleanup
git add .gitignore
git commit -m "Remove build artifacts from tracking"
```

### If Repository is Corrupted
```bash
# Clone fresh repository
git clone <repository-url> project-fresh

# Copy any uncommitted changes
cp -r old-project/src/* project-fresh/src/
cp old-project/package.json project-fresh/

# Re-apply changes in fresh repository
```

---

**Remember**: Prevention is always better than recovery. Set up proper `.gitignore` and follow these guidelines from the start to avoid repository corruption issues.
