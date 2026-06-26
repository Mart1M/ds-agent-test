#!/usr/bin/env node
/**
 * Generates DTCG token source files from Figma Color modes export.
 * Source: src/tokens/figma-export/color-modes.tsv
 * Primitives: src/tokens/figma-export/primitives.tsv
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXPORT_DIR = join(ROOT, 'src/tokens/figma-export');
const SOURCE_DIR = join(ROOT, 'src/tokens/source');

/** WCAG AA overrides applied on top of Figma export (Strategy A + a11y fix). */
const A11Y_OVERRIDES = {
  'color.fg.quaternary': {
    light: '{primitives.neutral.500}',
    dark: '{primitives.neutral.100}',
  },
  'color.fg.quaternary-hover': {
    light: '{primitives.neutral.600}',
    dark: '{primitives.white}',
  },
};

/** Normalize focus-ring token path for backward-compatible CSS vars. */
const PATH_ALIASES = {
  'color.focus-focus-ring': 'color.focus-ring',
  'color.focus-focus-ring-error': 'color.focus-ring-error',
};

function parseTsv(content) {
  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [path, light, dark] = line.split('\t');
      return { path, light, dark };
    });
}

function setNested(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[parts[parts.length - 1]] = value;
}

function makeColorToken(light, dark, description) {
  const token = {
    $type: 'color',
    $value: light,
    $description: description,
  };
  if (light !== dark) {
    token.$extensions = { mode: { light, dark } };
  }
  return token;
}

function applyOverrides(entry) {
  let { path, light, dark } = entry;
  path = PATH_ALIASES[path] ?? path;

  if (A11Y_OVERRIDES[path]) {
    light = A11Y_OVERRIDES[path].light;
    dark = A11Y_OVERRIDES[path].dark;
  }

  return { path, light, dark };
}

function groupByTopLevel(entries) {
  const groups = {};
  for (const entry of entries) {
    const { path, light, dark } = applyOverrides(entry);
    const top = path.split('.')[0];
    if (!groups[top]) groups[top] = {};
    const subPath = path.slice(top.length + 1);
    setNested(
      groups[top],
      subPath,
      makeColorToken(light, dark, `From Figma 1. Color modes — ${path}`)
    );
  }
  return groups;
}

function buildPrimitives(tsv) {
  const primitives = {};
  for (const line of tsv.trim().split('\n').filter(Boolean)) {
    const [figmaName, hex] = line.split('|');
    const parts = figmaName.replace(/^Colors\//, '').split('/');
    if (parts[0] === 'Base') {
      const key = parts[1].toLowerCase();
      primitives[key] = {
        $value: hex,
        $type: 'color',
        $description: `Figma _Primitives — ${figmaName}`,
      };
      continue;
    }
    const group = parts[0]
      .toLowerCase()
      .replace(/ \(alpha\)/i, '-alpha')
      .replace(/ /g, '-');
    const shade = parts[1]?.toLowerCase();
    if (!shade) continue;
    if (!primitives[group]) primitives[group] = {};
    primitives[group][shade] = {
      $value: hex,
      $type: 'color',
      $description: `Figma _Primitives — ${figmaName}`,
    };
  }
  return { primitives };
}

function main() {
  const colorModesTsv = readFileSync(join(EXPORT_DIR, 'color-modes.tsv'), 'utf-8');
  const primitivesTsv = readFileSync(join(EXPORT_DIR, 'primitives.tsv'), 'utf-8');

  const entries = parseTsv(colorModesTsv);
  console.log(`Parsed ${entries.length} color mode tokens`);

  const groups = groupByTopLevel(entries);

  mkdirSync(SOURCE_DIR, { recursive: true });

  writeFileSync(
    join(SOURCE_DIR, 'primitives.tokens.json'),
    JSON.stringify(buildPrimitives(primitivesTsv), null, 2) + '\n'
  );
  console.log('Wrote primitives.tokens.json');

  const fileMap = {
    color: 'color-modes.tokens.json',
    component: 'component-colors.tokens.json',
  };

  for (const [top, tokens] of Object.entries(groups)) {
    const filename = fileMap[top] ?? `${top}.tokens.json`;
    const output = { [top]: tokens };
    writeFileSync(join(SOURCE_DIR, filename), JSON.stringify(output, null, 2) + '\n');
    console.log(`Wrote ${filename}`);
  }

  // Preserve non-Figma tokens (opacity, etc.)
  writeFileSync(
    join(SOURCE_DIR, 'semantic-extra.tokens.json'),
    JSON.stringify(
      {
        opacity: {
          disabled: {
            $type: 'number',
            $value: 0.4,
            $description: 'Disabled state opacity',
            $extensions: {
              mode: { light: 0.4, dark: 0.3 },
            },
          },
        },
      },
      null,
      2
    ) + '\n'
  );
  console.log('Wrote semantic-extra.tokens.json');
}

main();
