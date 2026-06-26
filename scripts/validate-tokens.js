#!/usr/bin/env node
/**
 * DTCG Token Validation Script
 * Validates token schema and references before build
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const TOKEN_SOURCE_DIR = 'src/tokens/source';
const errors = [];
const warnings = [];

/**
 * Validate DTCG token format
 */
function validateTokenFile(filePath, fileName) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const tokens = JSON.parse(content);

    // Check for DTCG required properties
    validateTokenStructure(tokens, fileName, []);

    console.log(`✓ ${fileName} - Valid DTCG format`);
  } catch (error) {
    errors.push(`✗ ${fileName} - ${error.message}`);
  }
}

/**
 * Recursively validate token structure
 */
function validateTokenStructure(obj, fileName, path) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (value && typeof value === 'object') {
      // Check if this is a token (has $value)
      if ('$value' in value) {
        // Validate required DTCG properties
        if (!('$type' in value)) {
          warnings.push(
            `⚠ ${fileName} - Token at ${currentPath.join('.')} missing $type property`
          );
        }

        // Validate token references
        if (typeof value.$value === 'string' && value.$value.startsWith('{')) {
          const reference = value.$value.slice(1, -1);
          // Basic reference format validation
          if (!reference.includes('.')) {
            errors.push(
              `✗ ${fileName} - Invalid token reference at ${currentPath.join('.')}: ${value.$value}`
            );
          }
        }
      } else {
        // Recurse into nested objects
        validateTokenStructure(value, fileName, currentPath);
      }
    }
  }
}

/**
 * Main validation function
 */
function validateTokens() {
  console.log('🔍 Validating DTCG token files...\n');

  try {
    const files = readdirSync(TOKEN_SOURCE_DIR);
    const tokenFiles = files.filter(f => f.endsWith('.tokens.json'));

    if (tokenFiles.length === 0) {
      errors.push('✗ No token files found in ' + TOKEN_SOURCE_DIR);
    }

    tokenFiles.forEach(file => {
      const filePath = join(TOKEN_SOURCE_DIR, file);
      validateTokenFile(filePath, file);
    });
  } catch (error) {
    errors.push(`✗ Failed to read token directory: ${error.message}`);
  }

  // Report results
  console.log('\n📊 Validation Results:\n');

  if (warnings.length > 0) {
    warnings.forEach(w => console.warn(w));
    console.log('');
  }

  if (errors.length > 0) {
    errors.forEach(e => console.error(e));
    console.log('');
    console.error(`❌ Validation failed with ${errors.length} error(s)\n`);
    process.exit(1);
  }

  console.log('✅ All token files are valid!\n');
  process.exit(0);
}

// Run validation
validateTokens();
