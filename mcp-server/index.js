#!/usr/bin/env node

/**
 * MCP Server for rn-pressy
 * Provides context about the library components, features, and usage.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Library Data
const COMPONENTS = {
  Pressy: {
    description: "Advanced button with animations, haptics, swipe-to-confirm, and more.",
    features: ["pulse", "glare", "glow", "shake", "swipeable", "reveal-to-press", "haptics", "liquid-glass"],
    variants: ["default", "outline", "ghost", "glass", "neo"],
    props: {
        essential: ["title", "onPress", "variant", "size"],
        swipe: ["swipeable", "onSwipeComplete", "swipeSuccessText", "swipeVariant", "swipeResetDelay"],
        liquidGlass: ["liquidGlass", "liquidGlassInteractive", "liquidGlassEffect"],
        reveal: ["revealToPress", "revealContent", "onReveal"]
    }
  },
  DDown: {
    description: "Feature-rich dropdown with search, multi-select, and grouping.",
    features: ["search", "multi-select", "grouping", "custom-rendering", "liquid-glass"],
    variants: ["default", "outline", "glass"],
    props: {
        essential: ["options", "value", "onChange"],
        features: ["searchable", "multiple", "liquidGlass"]
    }
  },
  Toggy: {
    description: "Animated toggle switches with multiple visual styles.",
    features: ["animations", "icons", "liquid-glass"],
    variants: ["classic", "material", "ios", "liquid"],
    props: {
        essential: ["value", "onValueChange"],
        appearance: ["variant", "size", "liquidGlass"]
    }
  },
  Chex: {
    description: "Creative checkbox variants with animations.",
    features: ["animations", "custom-icons"],
    variants: ["bounce", "fill", "stroke"],
    props: {
        essential: ["checked", "onPress", "label"]
    }
  },
  Inpy: {
    description: "Styled text inputs with floating labels and validation.",
    features: ["floating-label", "validation", "icons"],
    variants: ["standard", "outlined", "filled"],
    props: {
        essential: ["value", "onChangeText", "label"]
    }
  }
};

const EXAMPLES = {
  Pressy: {
    basic: `
<Pressy 
  title="Press Me" 
  onPress={() => console.log('Pressed')} 
/>`,
    swipeReveal: `
<Pressy
  title="Slide to Unlock"
  swipeable
  swipeVariant="reveal" 
  swipeSuccessText="Unlocked! 🔓"
  onSwipeComplete={() => console.log('Unlocked')}
/>`,
    liquidGlass: `
<Pressy
  title="Premium Button"
  liquidGlass
  liquidGlassEffect="regular"
  onPress={() => {}}
/>`
  },
  DDown: {
    basic: `
<DDown
  options={[{ label: 'Option 1', value: '1' }]}
  value={selected}
  onChange={setSelected}
/>`,
    multiSelect: `
<DDown
  options={options}
  value={selectedItems}
  onChange={setSelectedItems}
  multiple
  searchable
  placeholder="Select items..."
/>`
  }
};

// Server Implementation
const server = new Server(
  {
    name: "rn-pressy-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool Definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_components",
        description: "List all available rn-pressy components, optionally filtered by category.",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", description: "Filter by category (e.g. 'Button', 'Input')" }
          }
        }
      },
      {
        name: "get_component_info",
        description: "Get detailed information about a specific component.",
        inputSchema: {
          type: "object",
          properties: {
            component: { type: "string", description: "Component name (Pressy, DDown, etc.)" }
          },
          required: ["component"]
        }
      },
      {
        name: "get_component_example",
        description: "Get code examples for a component.",
        inputSchema: {
          type: "object",
          properties: {
            component: { type: "string" },
            type: { type: "string", description: "Example type (basic, swipeReveal, liquidGlass, etc.)" }
          },
          required: ["component"]
        }
      },
      {
        name: "search_features",
        description: "Search for components by feature or capability.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Feature to search for (e.g., 'liquid', 'swipe')" }
          },
          required: ["query"]
        }
      },
      {
        name: "compare_variants",
        description: "Compare different variants of a component.",
        inputSchema: {
          type: "object",
          properties: {
            component: { type: "string" }
          },
          required: ["component"]
        }
      },
       {
        name: "get_props_reference",
        description: "Get prop definitions for a component.",
        inputSchema: {
            type: "object",
            properties: {
                component: { type: "string" },
                category: { type: "string" }
            },
            required: ["component"]
        }
      }
    ]
  };
});

// Tool Execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_components": {
        const componentList = Object.keys(COMPONENTS).map(name => ({
            name,
            description: COMPONENTS[name].description
        }));
        return {
          content: [{ type: "text", text: JSON.stringify(componentList, null, 2) }]
        };
      }

      case "get_component_info": {
        const { component } = args;
        const info = COMPONENTS[component];
        if (!info) throw new Error(`Component '${component}' not found`);
        return {
          content: [{ type: "text", text: JSON.stringify(info, null, 2) }]
        };
      }

      case "get_component_example": {
        const { component, type = 'basic' } = args;
        const componentExamples = EXAMPLES[component];
        if (!componentExamples) return { content: [{ type: "text", text: `No examples for ${component}` }] };
        
        const code = componentExamples[type];
        if (!code) return { content: [{ type: "text", text: `No '${type}' example for ${component}. Available: ${Object.keys(componentExamples).join(', ')}` }] };

        return {
          content: [{ type: "text", text: code.trim() }]
        };
      }

      case "search_features": {
        const { query } = args;
        const lowerQuery = query.toLowerCase();
        const results = Object.entries(COMPONENTS)
            .filter(([_, info]) => info.features.some(f => f.includes(lowerQuery)) || info.description.toLowerCase().includes(lowerQuery))
            .map(([name, info]) => ({ name, matchedFeatures: info.features.filter(f => f.includes(lowerQuery)) }));
            
        return {
            content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
        };
      }

      case "compare_variants": {
        const { component } = args;
         const info = COMPONENTS[component];
        if (!info) throw new Error(`Component '${component}' not found`);
        
        return {
            content: [{ type: "text", text: `Variants for ${component}: ${info.variants.join(', ')}` }]
        };
      }
      
      case "get_props_reference": {
          const { component, category } = args;
          const info = COMPONENTS[component];
          if (!info) throw new Error(`Component '${component}' not found`);

          let result = info.props;
          if (category && category !== 'all') {
              result = info.props[category] || {};
          }
          return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
          };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${error.message}` }]
    };
  }
});

// Start Server
const transport = new StdioServerTransport();
await server.connect(transport);
