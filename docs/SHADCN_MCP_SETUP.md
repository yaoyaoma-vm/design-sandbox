# ShadCN MCP Server Setup Guide

## Overview
The ShadCN MCP (Model Context Protocol) server enables Cursor AI to generate ShadCN UI components automatically. This guide will walk you through the setup process.

## Prerequisites
- Cursor with AI capabilities installed
- GitHub account
- Access to the design-sandbox project

## Step 1: Generate GitHub Personal Access Token

### 1.1 Go to GitHub Settings
1. Open GitHub in your browser
2. Click your profile picture → **Settings**
3. In the left sidebar, click **Developer settings**
4. Click **Personal access tokens**
5. Click **Tokens (classic)**

### 1.2 Create New Token
1. Click **Generate new token (classic)**
2. Set **Token name**: `shadcn-mcp-cursor`
3. Set **Expiration**: Choose appropriate duration (30 days recommended)
4. Select **Scopes**:
   - ✅ `public_repo` (for public repositories)
   - ✅ `repo` (for private repositories, if needed)
5. Click **Generate token**

### 1.3 Copy Token
- **Important**: Copy the token immediately - you won't see it again!
- Store it securely (password manager recommended)

## Step 2: Configure ShadCN MCP Server in Cursor

### 2.1 Open Cursor Settings
1. Open Cursor
2. Press `Cmd + L` (Mac) or `Ctrl + L` (Windows/Linux) to open chat
3. Click **Chat Settings** (gear icon)
4. Go to **Tools & Integrations** tab

### 2.2 Add New MCP Server
1. Look for **MCP Servers** section
2. Click **Add new MCP server** or **+** button
3. You'll see a configuration area

### 2.3 Configure ShadCN MCP
1. **Name**: `ShadCN MCP`
2. **Command**: `npx`
3. **Arguments**: `@shadcn/ui@latest mcp`
4. **Environment Variables**:
   - Add new environment variable
   - **Name**: `GITHUB_TOKEN`
   - **Value**: Paste your GitHub token from Step 1

### 2.4 Alternative Configuration (if above doesn't work)
If the above configuration doesn't work, try this format:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@shadcn/ui@latest", "mcp"],
      "env": {
        "GITHUB_TOKEN": "your-github-token-here"
      }
    }
  }
}
```

## Step 3: Verify Installation

### 3.1 Check MCP Server Status
1. In Cursor chat settings, verify the ShadCN MCP server appears
2. Status should show as "Connected" or similar
3. You should see tools/prompts enabled

### 3.2 Test Component Generation
1. Open the design-sandbox project in Cursor
2. In the chat, type: "Use the ShadCN MCP server to create a button component"
3. Cursor should generate ShadCN button component code

## Step 4: Using ShadCN MCP for Project Creation

### 4.1 Generate Components
Example prompts:
- "Create a card component with ShadCN"
- "Generate a form with input fields using ShadCN"
- "Make a navigation bar with ShadCN components"

### 4.2 Create New Projects
Example workflow:
1. "Create a new project in the sandbox called 'user-profile'"
2. "Use ShadCN MCP to generate a user profile form"
3. "Add validation and styling to the form"

## Troubleshooting

### Common Issues

#### Issue: MCP Server Not Connecting
**Solution:**
- Verify GitHub token is correct
- Check token permissions (needs `public_repo` scope)
- Restart Cursor
- Try regenerating the token

#### Issue: Components Not Generating
**Solution:**
- Ensure you're in the design-sandbox project directory
- Check that ShadCN is properly initialized (`npx shadcn@latest init`)
- Verify MCP server is connected in settings

#### Issue: Permission Denied
**Solution:**
- Check GitHub token has correct scopes
- Ensure token hasn't expired
- Try creating a new token with broader permissions

### Error Messages

#### "GitHub token not found"
- Add `GITHUB_TOKEN` environment variable
- Restart Cursor after adding token

#### "MCP server failed to start"
- Check command and arguments are correct
- Verify `npx` is available in your PATH
- Try running `npx @shadcn/ui@latest mcp` manually in terminal

## Security Notes

### Token Security
- Never commit your GitHub token to version control
- Use environment variables, not hardcoded values
- Rotate tokens regularly (30-90 days)
- Use minimal required permissions

### Best Practices
- Store tokens in password managers
- Use different tokens for different purposes
- Monitor token usage in GitHub settings
- Revoke tokens when no longer needed

## Next Steps

Once ShadCN MCP is configured:

1. **Practice Component Generation**: Try creating various UI components
2. **Explore Project Templates**: Generate complete project structures
3. **Integrate with Sandbox**: Use MCP to create new projects in the design-sandbox
4. **Share with Team**: Help other team members set up their MCP servers

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review the [ShadCN MCP documentation](https://ui.shadcn.com/docs/mcp)
3. Ask the team for assistance
4. Check Cursor's MCP documentation

---

**Note**: This setup enables powerful AI-assisted development. The ShadCN MCP server will significantly speed up component creation and project development in the design sandbox.
