# Deployment Guide - Design Sandbox

## Overview
The design sandbox is deployed using Firebase Hosting. This guide explains how to deploy updates and manage the live environment.

## Live Environment
- **URL**: https://design-sandbox-vm.web.app
- **Firebase Project**: design-sandbox-vm
- **Console**: https://console.firebase.google.com/project/design-sandbox-vm/overview

## Deployment Process

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged into Firebase: `firebase login`
- Access to the design-sandbox project

### Quick Deploy
```bash
# Build and deploy in one command
npm run deploy
```

### Step-by-Step Deploy
```bash
# 1. Build the project
npm run build

# 2. Deploy to Firebase
firebase deploy
```

## Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Access at http://localhost:3000
```

### Testing Before Deploy
```bash
# Build locally to test
npm run build

# Preview the build
npx serve out
```

### Deploy Updates
```bash
# After making changes, deploy
npm run deploy
```

## Project Structure for Deployment

### Key Files
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Firebase project configuration
- `next.config.ts` - Next.js static export configuration
- `out/` - Generated static files (created during build)

### Build Output
The build process creates static files in the `out/` directory:
- HTML files for each route
- Optimized JavaScript and CSS
- Static assets

## Firebase Configuration

### Hosting Settings
- **Public Directory**: `out` (Next.js build output)
- **Single Page App**: No (handled by Next.js routing)
- **Cache Headers**: Optimized for static assets

### Project Settings
- **Project ID**: design-sandbox-vm
- **Region**: Default (us-central1)
- **Plan**: Spark (free tier)

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check for TypeScript errors
npm run lint

# Clear Next.js cache
rm -rf .next out
npm run build
```

#### Deploy Fails
```bash
# Check Firebase login
firebase login

# Verify project configuration
firebase projects:list

# Check hosting configuration
firebase hosting:channel:list
```

#### Static Export Issues
- Ensure all components are client-side compatible
- Check for server-side only features
- Verify image optimization settings

### Error Messages

#### "Firebase project not found"
- Verify project ID in `.firebaserc`
- Check Firebase login status
- Ensure project exists in Firebase console

#### "Build failed"
- Check for TypeScript errors
- Verify all dependencies are installed
- Clear build cache and retry

## Team Collaboration

### Deployment Permissions
- All team members can deploy using the same Firebase project
- Changes are immediately live after deployment
- No approval process required (for now)

### Best Practices
1. **Test Locally First**: Always test changes locally before deploying
2. **Small Increments**: Deploy frequently with small changes
3. **Check Console**: Monitor Firebase console for any issues
4. **Backup**: Keep local backups of important configurations

### Rollback
If needed, you can rollback to a previous deployment:
```bash
# List recent deployments
firebase hosting:releases:list

# Rollback to specific version
firebase hosting:releases:rollback VERSION_ID
```

## Monitoring

### Firebase Console
- **Analytics**: Track usage and performance
- **Hosting**: Monitor deployment status
- **Performance**: Check loading times and errors

### Performance Metrics
- **First Load JS**: ~150KB (shared)
- **Page Size**: 1-3KB per page
- **Build Time**: ~3 seconds
- **Deploy Time**: ~30 seconds

## Future Enhancements

### Potential Improvements
- **CDN**: Firebase Hosting already provides global CDN
- **Custom Domain**: Add custom domain for branding
- **Environment Variables**: Add staging/production environments
- **CI/CD**: Automate deployment with GitHub Actions

### Scaling Considerations
- **Traffic**: Free tier supports 10GB/month
- **Storage**: Free tier supports 1GB
- **Upgrade**: Blaze plan for higher limits

---

## Quick Reference

### Commands
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run deploy       # Build and deploy
firebase deploy      # Deploy only
firebase serve       # Serve locally
```

### URLs
- **Development**: http://localhost:3000
- **Production**: https://design-sandbox-vm.web.app
- **Firebase Console**: https://console.firebase.google.com/project/design-sandbox-vm/overview

### Files
- `firebase.json` - Hosting configuration
- `.firebaserc` - Project settings
- `next.config.ts` - Build settings
- `out/` - Static build output
