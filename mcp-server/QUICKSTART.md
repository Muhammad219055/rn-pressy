# MCP Server Quick Start

Get the rn-pressy MCP server running in 2 minutes.

## Step 1: Install Dependencies

```bash
cd mcp-server
npm install
```

## Step 2: Test It Works

```bash
npm test
```

You should see all tests passing ✅

## Step 3: Configure Your AI Assistant

### For Kiro IDE

1. Open or create `~/.kiro/settings/mcp.json`
2. Add this configuration:

```json
{
  "mcpServers": {
    "rn-pressy": {
      "command": "node",
      "args": ["/absolute/path/to/rn-pressy/mcp-server/index.js"],
      "disabled": false,
      "autoApprove": [
        "get_component_info",
        "get_component_example",
        "list_components",
        "search_features",
        "get_props_reference",
        "compare_variants"
      ]
    }
  }
}
```

3. Replace `/absolute/path/to/rn-pressy` with your actual path
4. Restart Kiro or reload the MCP servers

### For Claude Desktop

1. Open Claude Desktop settings
2. Navigate to Developer → Edit Config
3. Add the same JSON configuration
4. Restart Claude Desktop

## Step 4: Try It Out

Ask your AI assistant:

- "What components are available in rn-pressy?"
- "Show me how to create a button with haptic feedback"
- "Which components support dark mode?"
- "How do I create a multi-select dropdown?"

## Troubleshooting

### "Command not found" error

Make sure you're using the absolute path to `index.js`:

```bash
pwd  # Get current directory
# Use: /full/path/to/rn-pressy/mcp-server/index.js
```

### "Module not found" error

Install dependencies:

```bash
cd mcp-server
npm install
```

### Server not responding

Check if Node.js version is 18+:

```bash
node --version
```

### Still having issues?

1. Check the MCP server logs in your AI assistant
2. Run the test suite: `npm test`
3. Verify the path in your config is correct
4. Make sure `index.js` has execute permissions

## What's Next?

- Read [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) for real-world scenarios
- Check [README.md](./README.md) for detailed documentation
- Explore the available tools and resources

## Quick Reference

### Available Tools

1. `get_component_info` - Component details
2. `get_component_example` - Code examples
3. `list_components` - All components
4. `search_features` - Find by feature
5. `get_props_reference` - Prop lists
6. `compare_variants` - Variant comparison

### Available Resources

1. `rn-pressy://docs/getting-started` - Installation guide
2. `rn-pressy://docs/theming` - Theme setup
3. `rn-pressy://docs/components` - Component overview

## Example Questions to Ask

**Discovery:**

- "What UI components does rn-pressy have?"
- "Show me all input components"

**Implementation:**

- "How do I create a swipeable button?"
- "Show me a multi-select dropdown example"

**Customization:**

- "How do I change button colors?"
- "Can I customize the toggle switch appearance?"

**Features:**

- "Which components have haptic feedback?"
- "What animation effects are available?"

**Comparison:**

- "What are the different button variants?"
- "Compare the checkbox styles"

That's it! You're ready to use AI-powered assistance for rn-pressy development. 🚀
