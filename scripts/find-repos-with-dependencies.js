#!/usr/bin/env node

/**
 * Script to find GitHub repositories that use specific dependencies together
 * Searches for repos with: next v16, react v19, and @fluentui/react-components v9
 * 
 * Note: This script demonstrates the search logic. To run with authentication,
 * use the GitHub API or the provided MCP tools.
 */

import https from 'https';

const TARGET_DEPENDENCIES = {
  next: '16',
  react: '19',
  '@fluentui/react-components': '9'
};

/**
 * Makes an HTTPS GET request
 */
function httpsGet(url, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      headers: {
        'User-Agent': 'Node.js GitHub Dependency Finder',
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers
      }
    };
    
    https.get(url, defaultOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Search GitHub Code API for package.json files
 */
async function searchGitHubCode(query, page = 1) {
  const encodedQuery = encodeURIComponent(query);
  const apiToken = process.env.GITHUB_TOKEN || '';
  const url = `https://api.github.com/search/code?q=${encodedQuery}&page=${page}&per_page=100`;
  
  console.error(`Searching GitHub: ${query} (page ${page})`);
  
  const options = apiToken ? {
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  } : {};
  
  try {
    return await httpsGet(url, options);
  } catch (error) {
    console.error(`Error searching GitHub: ${error.message}`);
    if (error.message.includes('403')) {
      console.error('API rate limit exceeded or authentication required.');
      console.error('Set GITHUB_TOKEN environment variable with a personal access token.');
    }
    return { items: [] };
  }
}

/**
 * Fetch raw content of a package.json file
 */
async function fetchPackageJson(rawUrl) {
  try {
    const content = await httpsGet(rawUrl);
    if (typeof content === 'string') {
      return JSON.parse(content);
    }
    return content;
  } catch (error) {
    console.error(`Error fetching ${rawUrl}: ${error.message}`);
    return null;
  }
}

/**
 * Check if version string matches major version
 */
function versionMatches(versionString, majorVersion) {
  if (!versionString) return false;
  
  // Handle various version formats: "^16.0.0", "~16.0.0", "16.0.0", ">=16.0.0", etc.
  const match = versionString.match(/(\d+)/);
  if (match) {
    return match[1] === majorVersion;
  }
  return false;
}

/**
 * Check if package.json has all required dependencies
 */
function hasAllDependencies(packageJson) {
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies
  };
  
  const results = {
    hasAll: true,
    found: {},
    missing: []
  };
  
  for (const [depName, requiredVersion] of Object.entries(TARGET_DEPENDENCIES)) {
    if (deps[depName] && versionMatches(deps[depName], requiredVersion)) {
      results.found[depName] = deps[depName];
    } else {
      results.hasAll = false;
      results.missing.push(depName);
    }
  }
  
  return results;
}

/**
 * Main search function
 */
async function findReposWithDependencies() {
  console.error('Searching for GitHub repositories with:');
  console.error(`  - next v${TARGET_DEPENDENCIES.next}`);
  console.error(`  - react v${TARGET_DEPENDENCIES.react}`);
  console.error(`  - @fluentui/react-components v${TARGET_DEPENDENCIES['@fluentui/react-components']}`);
  console.error('');
  
  // Search for package.json files that mention all three packages
  const query = 'next react @fluentui/react-components language:json filename:package.json';
  
  const searchResults = await searchGitHubCode(query);
  
  if (!searchResults.items || searchResults.items.length === 0) {
    console.log('No repositories found matching the search criteria.');
    return;
  }
  
  console.error(`Found ${searchResults.items.length} package.json files to check...\n`);
  
  const matchingRepos = new Map();
  
  for (const item of searchResults.items) {
    const repo = item.repository;
    const repoFullName = repo.full_name;
    
    // Skip if we've already checked this repo
    if (matchingRepos.has(repoFullName)) {
      continue;
    }
    
    console.error(`Checking ${repoFullName}...`);
    
    // Fetch the actual package.json content
    const rawUrl = item.html_url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    const packageJson = await fetchPackageJson(rawUrl);
    
    if (!packageJson) {
      continue;
    }
    
    const dependencyCheck = hasAllDependencies(packageJson);
    
    if (dependencyCheck.hasAll) {
      matchingRepos.set(repoFullName, {
        name: repoFullName,
        url: repo.html_url,
        description: repo.description || 'No description',
        stars: repo.stargazers_count || 0,
        packageJsonPath: item.path,
        packageJsonUrl: item.html_url,
        dependencies: dependencyCheck.found
      });
      
      console.error(`  ✓ MATCH! All dependencies found`);
    } else {
      console.error(`  ✗ Missing: ${dependencyCheck.missing.join(', ')}`);
    }
  }
  
  // Output results
  console.error(`\n${'='.repeat(80)}`);
  console.error(`Found ${matchingRepos.size} repositories with all required dependencies:`);
  console.error('='.repeat(80));
  console.error('');
  
  if (matchingRepos.size === 0) {
    console.log('No repositories found with all three dependencies in the same package.json.');
    return;
  }
  
  // Sort by stars descending
  const sortedRepos = Array.from(matchingRepos.values()).sort((a, b) => b.stars - a.stars);
  
  // Output to stdout as JSON
  console.log(JSON.stringify(sortedRepos, null, 2));
  
  // Also output a summary to stderr
  console.error('\nSummary:');
  sortedRepos.forEach((repo, index) => {
    console.error(`\n${index + 1}. ${repo.name} (⭐ ${repo.stars})`);
    console.error(`   URL: ${repo.url}`);
    console.error(`   Description: ${repo.description}`);
    console.error(`   package.json: ${repo.packageJsonUrl}`);
    console.error(`   Dependencies found:`);
    for (const [dep, version] of Object.entries(repo.dependencies)) {
      console.error(`     - ${dep}: ${version}`);
    }
  });
}

// Run the search
findReposWithDependencies().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
