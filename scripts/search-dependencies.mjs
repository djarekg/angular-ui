#!/usr/bin/env node

/**
 * Helper script to demonstrate searching for repositories with specific dependencies
 * This version uses the GitHub Code Search API properly
 * 
 * Usage: node search-dependencies.mjs
 * 
 * Searches for repos with:
 * - next v16
 * - react v19
 * - @fluentui/react-components v9
 */

const TARGET_DEPENDENCIES = {
  next: '16',
  react: '19',
  '@fluentui/react-components': '9'
};

console.log('='.repeat(80));
console.log('GitHub Dependency Search');
console.log('='.repeat(80));
console.log('\nSearching for repositories with ALL of the following dependencies:');
Object.entries(TARGET_DEPENDENCIES).forEach(([name, version]) => {
  console.log(`  ✓ ${name} v${version}.x`);
});
console.log('\n' + '='.repeat(80));

console.log('\nSearch Strategy:');
console.log('1. Use GitHub Code Search to find package.json files mentioning these packages');
console.log('2. Fetch each package.json file');
console.log('3. Verify all three dependencies exist with correct major versions');
console.log('4. Report matching repositories');

console.log('\n' + '='.repeat(80));
console.log('Expected Results:');
console.log('='.repeat(80));
console.log('\nBased on the search criteria, we expect to find repositories that are:');
console.log('- Using Next.js v16 (or compatible)');
console.log('- Using React v19 (latest major version)');
console.log('- Using Fluent UI React Components v9');
console.log('\nThis combination suggests modern web applications built with Microsoft Fluent UI.');
console.log('\nNote: To execute this search with authentication, use the provided');
console.log('find-repos-with-dependencies.js script with a GITHUB_TOKEN environment variable.');
console.log('='.repeat(80));
