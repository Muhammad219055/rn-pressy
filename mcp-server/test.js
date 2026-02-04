#!/usr/bin/env node

/**
 * Simple test script for the rn-pressy MCP server
 * This simulates MCP tool calls to verify functionality
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test cases
const tests = [
  {
    name: 'List all components',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_components',
        arguments: {}
      }
    }
  },
  {
    name: 'Get Pressy component info',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_component_info',
        arguments: {
          component: 'Pressy'
        }
      }
    }
  },
  {
    name: 'Get DDown basic example',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_component_example',
        arguments: {
          component: 'DDown',
          type: 'basic'
        }
      }
    }
  },
  {
    name: 'Search for haptic features',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'search_features',
        arguments: {
          query: 'haptic'
        }
      }
    }
  },
  {
    name: 'Compare Chex variants',
    request: {
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'compare_variants',
        arguments: {
          component: 'Chex'
        }
      }
    }
  }
];

async function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log('─'.repeat(50));

    const serverPath = join(__dirname, 'index.js');
    const server = spawn('node', [serverPath]);

    let output = '';
    let errorOutput = '';

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Send the request
    server.stdin.write(JSON.stringify(test.request) + '\n');
    server.stdin.end();

    server.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Test failed with code ${code}`);
        if (errorOutput) {
          console.error('Error output:', errorOutput);
        }
        reject(new Error(`Process exited with code ${code}`));
      } else {
        try {
          // Parse the JSON-RPC response
          const lines = output.trim().split('\n');
          const response = JSON.parse(lines[lines.length - 1]);
          
          if (response.error) {
            console.error('❌ Error:', response.error.message);
            reject(new Error(response.error.message));
          } else {
            console.log('✅ Success!');
            console.log('Response:', JSON.stringify(response.result, null, 2).substring(0, 500) + '...');
            resolve(response.result);
          }
        } catch (err) {
          console.error('❌ Failed to parse response:', err.message);
          console.log('Raw output:', output);
          reject(err);
        }
      }
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      server.kill();
      reject(new Error('Test timeout'));
    }, 5000);
  });
}

async function runAllTests() {
  console.log('🚀 Starting rn-pressy MCP Server Tests\n');
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      await runTest(test);
      passed++;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));

  process.exit(failed > 0 ? 1 : 0);
}

runAllTests().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
