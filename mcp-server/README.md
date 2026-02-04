# rn-pressy MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with comprehensive information about the rn-pressy React Native UI library.

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that enables AI assistants to securely access context from various sources. This MCP server makes the rn-pressy library documentation, component APIs, and code examples available to AI assistants like Claude.

## Features

This MCP server provides:

- **Component Information**: Detailed specs for all rn-pressy components (Pressy, DDown, Toggy, Chex, Inpy)
- **Code Examples**: Ready-to-use code snippets for common use cases
- **Props Reference**: Categorized prop lists (essential, common, advanced)
- **Feature Search**: Find components by capability
- **Variant Comparison**: Compare different visual styles
- **Documentation Resources**: Getting started guides, theming docs, and more

## Installation

### For Development

```bash
cd mcp-server
npm install
```

### For Use with AI Assistants

Add to your MCP configuration file (e.g., `~/.kiro/settings/mcp.json` or Claude Desktop config):

```json
{
  "mcpServers": {
    "rn-pressy": {
      "command": "node",
      "args": ["/path/to/rn-pressy/mcp-server/index.js"]
    }
  }
}
```

Or if published to npm:

```json
{
  "mcpServers": {
    "rn-pressy": {
      "command": "npx",
      "args": ["-y", "rn-pressy-mcp-server"]
    }
  }
}
```

## Available Tools

### 1. `get_component_info`

Get detailed information about a specific component.

**Parameters:**

- `component` (required): Component name (Pressy, DDown, Toggy, Chex, or Inpy)

**Example:**

```json
{
  "component": "Pressy"
}
```

### 2. `get_component_example`

Get code examples for a component.

**Parameters:**

- `component` (required): Component name
- `type` (optional): Example type (basic, advanced, withState, etc.)

**Example:**

```json
{
  "component": "DDown",
  "type": "multiSelect"
}
```

### 3. `list_components`

List all available components, optionally filtered by category.

**Parameters:**

- `category` (optional): Filter by "Button" or "Input"

### 4. `search_features`

Search for components by feature or capability.

**Parameters:**

- `query` (required): Feature to search for (e.g., "haptic", "animation", "multi-select")

**Example:**

```json
{
  "query": "haptic"
}
```

### 5. `get_props_reference`

Get a categorized list of props for a component.

**Parameters:**

- `component` (required): Component name
- `category` (optional): "essential", "common", "advanced", or "all"

**Example:**

```json
{
  "component": "Pressy",
  "category": "essential"
}
```

### 6. `compare_variants`

Compare different variants of a component.

**Parameters:**

- `component` (required): Component name

**Example:**

```json
{
  "component": "Chex"
}
```

## Available Resources

### 1. `rn-pressy://docs/getting-started`

Installation and basic usage guide.

### 2. `rn-pressy://docs/theming`

Guide on using PressyProvider and customizing themes.

### 3. `rn-pressy://docs/components`

Overview of all available components with features and variants.

## Usage Examples

Once configured, AI assistants can use this server to answer questions like:

- "Show me how to create a swipeable button with rn-pressy"
- "What are the different variants of the Chex component?"
- "How do I implement multi-select in DDown?"
- "Which components support haptic feedback?"
- "Show me the essential props for the Pressy component"

## Development

To test the server locally:

```bash
npm start
```

The server communicates via stdio, so you'll need to integrate it with an MCP-compatible client to test functionality.

## Components Covered

- **Pressy**: Advanced button with animations, haptics, swipe-to-confirm, and more
- **DDown**: Feature-rich dropdown with search, multi-select, and grouping
- **Toggy**: Animated toggle switches with multiple visual styles
- **Chex**: Creative checkbox variants with animations
- **Inpy**: Styled text inputs with floating labels and validation

## License

MIT

## Links

- [rn-pressy GitHub](https://github.com/Muhammad219055/rn-pressy)
- [Model Context Protocol](https://modelcontextprotocol.io/)
