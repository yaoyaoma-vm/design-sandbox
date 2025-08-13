# Design Sandbox - Setup Outline

## Required Tools & Dependencies

### Core Development Tools
- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **Cursor** (with AI capabilities)

### Cursor Extensions/MCPs Needed
- **ShadCN MCP Server** - For ShadCN component generation (requires GitHub token)
- **GitHub MCP** - For repository management
- **File System MCP** - For project file operations

### Project Dependencies (to be installed)
- **Next.js** (v14+ with App Router)
- **React** (v18+)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI** (components + CLI)
- **TweakCN** (for enhanced components)
- **Unicorn.Studio** (for advanced UI patterns)
- **GSAP** (for animations)
- **Lucide React** (for icons)
- **clsx** (for conditional classes)
- **class-variance-authority** (for component variants)

### Development Tools
- **ESLint** (code linting)
- **Prettier** (code formatting)
- **TypeScript** (type checking)
- **@types/node** (Node.js types)
- **@types/react** (React types)

## Setup Process Outline

### Phase 1: Environment Preparation (10-15 minutes)
1. **Verify Prerequisites**
   - Check Node.js version (`node --version`)
   - Check npm version (`npm --version`)
   - Verify Git installation (`git --version`)
   - Confirm Cursor with AI capabilities

2. **Setup ShadCN MCP Server**
   - Go to Cursor Settings → Tools & Integrations
   - Add new MCP server with ShadCN configuration
   - Generate GitHub personal access token
   - Configure token in MCP server settings
   - Verify MCP server appears in tools list

### Phase 2: Project Foundation (15-20 minutes)
1. **Initialize Next.js Project**
   ```bash
   npx create-next-app@latest design-sandbox --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
   - Use TypeScript: Yes
   - Use ESLint: No (we'll add later)
   - Use Tailwind CSS: Yes
   - Use `src/` directory: Yes
   - Use App Router: Yes
   - Import alias: Yes

2. **Navigate and Setup**
   ```bash
   cd design-sandbox
   npm install
   npm run dev
   ```

3. **Initialize ShadCN UI**
   ```bash
   npx shadcn@latest init
   ```
   - Style: Default (neutral)
   - Base color: Neutral
   - CSS variables: Yes
   - React Server Components: Yes
   - Components directory: @/components
   - Utilities directory: @/lib/utils
   - Include example components: No

### Phase 3: Component Library Setup (20-25 minutes)
1. **Install GSAP**
   ```bash
   npm install gsap
   ```

2. **Setup TweakCN Integration**
   - Visit tweakcn.com
   - Choose a template (e.g., "Violet Bloom")
   - Customize colors and typography
   - Copy generated CSS
   - Replace theme variables in globals.css

3. **Setup Unicorn.Studio Integration**
   - Visit unicorn.studio
   - Create account/login
   - Choose or create interactive background
   - Export embed code
   - Integrate into hero section

4. **Create Animation Utilities**
   - Setup GSAP with React
   - Create stagger animations
   - Setup scroll-triggered animations

### Phase 4: Project Structure (10-15 minutes)
1. **Create Project Architecture**
   ```
   src/
   ├── app/
   │   ├── page.tsx (landing page)
   │   ├── layout.tsx
   │   └── globals.css
   ├── components/
   │   ├── ui/ (ShadCN components)
   │   ├── projects/ (project cards)
   │   └── layout/ (layout components)
   ├── lib/
   │   ├── utils.ts
   │   └── animations.ts
   └── projects/ (dynamic project folders)
   ```

2. **Setup Dynamic Routing**
   - Configure Next.js for dynamic project routes
   - Create project template structure

### Phase 5: Landing Page Development (25-35 minutes)
1. **Create Landing Page with ShadCN MCP**
   - Use detailed prompt for SaaS landing page
   - Include navbar with logo, navigation, CTA buttons
   - Hero section with 100vh height
   - Feature sections, pricing, testimonials, footer

2. **Implement Project Portal Features**
   - Convert landing page to project dashboard
   - Add project cards grid
   - Implement click-to-navigate functionality
   - Add project metadata display

3. **Add Advanced Animations**
   - GSAP stagger animations for headlines
   - Scroll-triggered animations for cards
   - Unicorn.Studio background integration
   - Infinite marquee animations

### Phase 6: Cursor AI Integration (10-15 minutes)
1. **Create Project Templates**
   - Standard project structure
   - Component templates
   - Animation patterns

2. **Setup Cursor Workflows**
   - Project creation prompts
   - File generation patterns
   - Naming conventions

### Phase 7: Testing & Polish (10-15 minutes)
1. **Test Project Creation**
   - Create sample project via Cursor
   - Verify routing works
   - Test landing page updates

2. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Bundle analysis

## Interactive Session Flow

### Introduction (5 minutes)
- Project overview and goals
- Technology stack explanation
- Expected outcomes

### Live Setup (60-90 minutes)
- Follow setup outline step-by-step
- Explain each tool and its purpose
- Demonstrate Cursor AI capabilities
- Show real-time project creation

### Q&A and Customization (15-30 minutes)
- Address designer questions
- Customize based on team needs
- Plan next steps

## Success Criteria
- [ ] Landing page loads successfully
- [ ] Project creation via Cursor works
- [ ] Dynamic routing functions properly
- [ ] GSAP animations are smooth
- [ ] All components render correctly
- [ ] Team can create their first project

## Notes for Presenters
- Have backup plans for any tool installation issues
- Prepare sample project descriptions for Cursor
- Keep explanations designer-friendly
- Focus on the "magic" of instant project creation
- Emphasize the portal/dashboard concept
- **Key Video Insights:**
  - ShadCN MCP requires GitHub token setup
  - TweakCN provides instant theme customization
  - Unicorn.Studio adds interactive backgrounds
  - GSAP enables advanced animations
  - Detailed prompts are crucial for good results
