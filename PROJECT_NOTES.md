# Design Sandbox - Project Notes & Requirements

## Project Vision
A designer-friendly sandbox environment where designers use Cursor AI to create new projects. The main landing page serves as a portal/dashboard showing all created projects, with each project having its own URL-addressable prototype. Cursor handles project generation, while the sandbox provides the infrastructure and project management interface.

## Core Technology Stack
- **Frontend Framework**: Next.js
- **UI Components**: ShadCN + TweakCN + Unicorn.Studio
- **Animations**: GSAP
- **Package Manager**: npm
- **Optional Backend**: Firebase (when designers choose to add complexity)

## Architecture Goals
Based on Instant Insights and RFP project patterns:
- **Error Prevention**: Comprehensive validation and error checking
- **Automation**: Automated tooling, linting, and quality checks
- **Developer Experience**: Minimal setup friction for designers
- **Flexibility**: Easy to extend and customize
- **Production-Ready**: Same patterns as company applications

## Key Requirements

### 1. Cursor AI Integration
- **Project Creation**: "Hey Cursor, create a new project in the sandbox"
- **Project Naming**: Cursor prompts for project name and creates folder structure
- **Template Generation**: Cursor generates complete project with index page
- **URL Routing**: Automatic URL generation (e.g., `design-sandbox/sign-up-flow`)

### 2. Project Portal Dashboard
- **Landing Page**: Main page showing all created projects
- **Project Cards**: Visual representation of each project with clickable access
- **URL Navigation**: Direct links to each project's prototype
- **Project Discovery**: Easy browsing and access to all prototypes

### 3. Designer-First Experience
- **Zero Technical Friction**: Designers should be able to create without debugging
- **Intuitive Workflow**: Clear, simple processes for common tasks
- **Visual Feedback**: Immediate feedback on actions and errors
- **Template System**: Pre-built starting points for common patterns

### 4. Automation & Quality Assurance
- **Automated Linting**: ESLint, Prettier, and style consistency
- **Type Checking**: TypeScript for error prevention
- **Build Validation**: Automated checks before deployment
- **Code Quality**: Automated formatting and best practices enforcement
- **Error Boundaries**: Graceful error handling throughout the app

### 5. Development Workflow
- **Hot Reloading**: Instant feedback during development
- **Component Library**: Pre-built, tested components
- **Animation System**: GSAP integration with common patterns
- **State Management**: Simple, predictable state handling
- **Routing**: Intuitive navigation patterns

### 6. Deployment & Sharing
- **Easy Deployment**: One-click or automated deployment
- **Preview URLs**: Instant sharing of prototypes
- **Version Control**: Git integration with designer-friendly workflows
- **Asset Management**: Optimized image and media handling

## Success Metrics
- **Time to First Prototype**: < 5 minutes from clone to running
- **Zero Configuration**: Works out of the box
- **Designer Satisfaction**: No technical blockers to creativity
- **Maintenance Overhead**: Minimal ongoing technical debt

## Reference Projects
- **Instant Insights**: Automation patterns, error handling, quality assurance
- **RFP Projects**: Next.js architecture, npm workflows
- **Company UI**: ShadCN foundation, design system consistency

## Implementation Phases
1. **Foundation Setup**: Next.js + ShadCN + basic automation
2. **Project Portal**: Landing page dashboard for all projects
3. **URL Routing**: Dynamic routing for individual project access
4. **Component Integration**: TweakCN + Unicorn.Studio + GSAP
5. **Cursor Integration**: Templates and workflows for Cursor AI
6. **Advanced Features**: Firebase integration, advanced animations
7. **Polish & Optimization**: Performance, accessibility, final touches

## Notes
- Focus on preventing errors rather than fixing them
- Design for designers, not developers
- Maintain consistency with company design system
- Build for scale but start simple
- Document everything for non-technical users
- Cursor AI handles project generation, sandbox provides infrastructure
- Each project gets its own URL-addressable prototype
- Landing page serves as project discovery portal
- MVP: Landing page that showcases all created projects
