#!/usr/bin/env node

/**
 * GitHub Repository Dependency Finder
 * 
 * This script searches GitHub for repositories that contain ALL of these dependencies
 * in the same package.json file:
 * - next v16
 * - react v19
 * - @fluentui/react-components v9
 * 
 * The script will:
 * 1. Search GitHub code for package.json files mentioning all three packages
 * 2. Fetch and parse each package.json file
 * 3. Verify the major versions match
 * 4. Output matching repositories with details
 */

import https from 'https';

const TARGET_DEPENDENCIES = {
  next: '16',
  react: '19',
  '@fluentui/react-components': '9'
};

/**
 * Make an authenticated HTTPS request to GitHub API
 */
function githubApiRequest(path) {
  return new Promise((resolve, reject) => {
    const token = process.env.GITHUB_TOKEN;
    
    const options = {
      hostname: 'api.github.com',
      path: path,
      headers: {
        'User-Agent': 'GitHub-Dependency-Finder',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    https.get(options, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        } else if (res.statusCode === 403) {
          reject(new Error('Rate limit exceeded or authentication required. Set GITHUB_TOKEN environment variable.'));
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch raw file content from GitHub
 */
function fetchRawContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'GitHub-Dependency-Finder'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch file: ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Check if a version string matches the required major version
 */
function matchesMajorVersion(versionStr, requiredMajor) {
  if (!versionStr) return false;
  
  // Remove common prefixes: ^, ~, >=, >, etc.
  const cleanVersion = versionStr.replace(/^[\^~>=<]+/, '');
  const majorVersion = cleanVersion.split('.')[0];
  
  return majorVersion === requiredMajor;
}

/**
 * Check if package.json contains all required dependencies with correct versions
 */
function validateDependencies(packageJson) {
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies
  };
  
  const found = {};
  const missing = [];
  
  for (const [depName, requiredVersion] of Object.entries(TARGET_DEPENDENCIES)) {
    const actualVersion = allDeps[depName];
    
    if (actualVersion && matchesMajorVersion(actualVersion, requiredVersion)) {
      found[depName] = actualVersion;
    } else {
      missing.push(depName);
    }
  }
  
  return {
    valid: missing.length === 0,
    found,
    missing
  };
}

/**
 * Main search function
 */
async function searchRepositories() {
  console.error('\n' + '='.repeat(80));
  console.error('GitHub Repository Dependency Search');
  console.error('='.repeat(80));
  console.error('\nSearching for repositories with ALL dependencies:');
  
  Object.entries(TARGET_DEPENDENCIES).forEach(([name, version]) => {
    console.error(`  ✓ ${name} v${version}.x`);
  });
  
  console.error('\n' + '='.repeat(80) + '\n');
  
  // Search for package.json files mentioning all three dependencies
  const query = 'next react @fluentui/react-components language:json filename:package.json';
  const searchPath = `/search/code?q=${encodeURIComponent(query)}&per_page=100`;
  
  try {
    console.error('Searching GitHub Code API...\n');
    const searchResults = await githubApiRequest(searchPath);
    
    if (!searchResults.items || searchResults.items.length === 0) {
      console.error('No package.json files found matching the search query.\n');
      return;
    }
    
    console.error(`Found ${searchResults.items.length} package.json files to check.\n`);
    
    const matchingRepos = new Map();
    
    for (const item of searchResults.items) {
      const repo = item.repository;
      const repoName = repo.full_name;
      
      // Skip duplicates
      if (matchingRepos.has(repoName)) {
        continue;
      }
      
      console.error(`Checking: ${repoName}/${item.path}...`);
      
      // Convert GitHub URL to raw content URL
      const rawUrl = item.html_url
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
      
      try {
        const content = await fetchRawContent(rawUrl);
        const packageJson = JSON.parse(content);
        
        const validation = validateDependencies(packageJson);
        
        if (validation.valid) {
          console.error('  ✓ MATCH - All dependencies found!\n');
          
          matchingRepos.set(repoName, {
            repository: repoName,
            url: repo.html_url,
            description: repo.description || 'No description provided',
            stars: repo.stargazers_count || 0,
            packageJsonPath: item.path,
            packageJsonUrl: item.html_url,
            dependencies: validation.found
          });
        } else {
          console.error(`  ✗ Missing: ${validation.missing.join(', ')}\n`);
        }
      } catch (error) {
        console.error(`  ✗ Error: ${error.message}\n`);
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Output results
    console.error('='.repeat(80));
    console.error(`RESULTS: Found ${matchingRepos.size} matching repositories`);
    console.error('='.repeat(80) + '\n');
    
    if (matchingRepos.size === 0) {
      console.log('[]');
      console.error('No repositories found with all required dependencies.\n');
      return;
    }
    
    // Sort by stars
    const results = Array.from(matchingRepos.values())
      .sort((a, b) => b.stars - a.stars);
    
    // Output JSON to stdout
    console.log(JSON.stringify(results, null, 2));
    
    // Output summary to stderr
    console.error('\nSummary:\n');
    results.forEach((repo, idx) => {
      console.error(`${idx + 1}. ${repo.repository} ⭐ ${repo.stars}`);
      console.error(`   ${repo.url}`);
      console.error(`   ${repo.description}`);
      console.error(`   Dependencies:`);
      Object.entries(repo.dependencies).forEach(([name, version]) => {
        console.error(`     - ${name}: ${version}`);
      });
      console.error('');
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('Rate limit') || error.message.includes('authentication')) {
      console.error('To use this script, you need a GitHub Personal Access Token.');
      console.error('Get one at: https://github.com/settings/tokens');
      console.error('Then run: export GITHUB_TOKEN=your_token_here\n');
    }
    
    process.exit(1);
  }
}

// Execute
searchRepositories().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
