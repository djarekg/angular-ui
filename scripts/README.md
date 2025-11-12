# GitHub Dependency Search Scripts

This directory contains scripts for searching GitHub repositories that use specific npm package dependencies together.

## Problem Statement

Find repositories that use these dependencies listed in the same `package.json`:
- `next` v16
- `react` v19
- `@fluentui/react-components` v9

## Scripts

### 1. `find-dependencies.mjs` (Recommended)

A Node.js script that searches GitHub for repositories containing all three specified dependencies with the correct major versions.

**Features:**
- Searches GitHub Code API for package.json files
- Validates that all three dependencies exist with correct major versions
- Returns detailed results including repository URLs, stars, and actual dependency versions
- Outputs JSON to stdout and human-readable summary to stderr

**Usage:**

```bash
# With GitHub token (recommended to avoid rate limits)
export GITHUB_TOKEN=your_github_token_here
node scripts/find-dependencies.mjs

# Without token (limited to 10 requests per minute)
node scripts/find-dependencies.mjs

# Save JSON results to a file
node scripts/find-dependencies.mjs > results.json

# View only the summary
node scripts/find-dependencies.mjs 2>&1 > /dev/null
```

**Getting a GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `public_repo` (for searching public repos)
4. Generate and copy the token
5. Set as environment variable: `export GITHUB_TOKEN=your_token`

### 2. `find-repos-with-dependencies.js`

Alternative version using CommonJS style imports.

**Usage:**

```bash
export GITHUB_TOKEN=your_github_token_here
node scripts/find-repos-with-dependencies.js
```

### 3. `search-dependencies.mjs`

A helper script that explains the search strategy without making actual API calls.

**Usage:**

```bash
node scripts/search-dependencies.mjs
```

## How It Works

1. **Search Phase:** The script queries GitHub's Code Search API for package.json files that mention all three package names (next, react, @fluentui/react-components).

2. **Validation Phase:** For each package.json found:
   - Fetches the raw file content
   - Parses the JSON
   - Checks dependencies, devDependencies, and peerDependencies
   - Validates that major versions match (16, 19, and 9 respectively)

3. **Results:** Outputs repositories that have ALL three dependencies with the correct major versions.

## Expected Results

Repositories using this combination typically are:
- Modern web applications using Next.js 16
- React 19 (latest major version)
- Microsoft Fluent UI React Components v9

This combination suggests enterprise or professional web applications built with Microsoft's design system.

## Output Format

### JSON Output (stdout)
```json
[
  {
    "repository": "owner/repo-name",
    "url": "https://github.com/owner/repo-name",
    "description": "Repository description",
    "stars": 123,
    "packageJsonPath": "path/to/package.json",
    "packageJsonUrl": "https://github.com/owner/repo-name/blob/main/package.json",
    "dependencies": {
      "next": "^16.0.0",
      "react": "^19.0.0",
      "@fluentui/react-components": "^9.2.0"
    }
  }
]
```

### Summary Output (stderr)
```
1. owner/repo-name ⭐ 123
   https://github.com/owner/repo-name
   Repository description
   Dependencies:
     - next: ^16.0.0
     - react: ^19.0.0
     - @fluentui/react-components: ^9.2.0
```

## Rate Limits

- **Unauthenticated:** 10 requests per minute
- **Authenticated:** 30 requests per minute for code search

Using a GitHub token is highly recommended.

## Troubleshooting

### Error: "Rate limit exceeded or authentication required"
**Solution:** Set up a GitHub personal access token (see "Getting a GitHub Token" above)

### Error: "No repositories found"
**Possible reasons:**
- The specific combination of dependencies is rare
- Version requirements are too strict
- GitHub's code search index hasn't indexed matching repositories yet

### Error: "Failed to parse JSON"
**Possible reasons:**
- The package.json file is malformed
- The file is too large
- Network issues during download

## Version Matching

The scripts use flexible major version matching:
- `16.0.0`, `^16.0.0`, `~16.0.0`, `>=16.0.0` all match version 16
- `19.0.0-rc.1`, `^19.0.0` both match version 19
- `9.2.0`, `^9.2.0` both match version 9

## Notes

- Results are sorted by GitHub stars (most popular first)
- Duplicate repositories (from different package.json files in the same repo) are filtered out
- The search is limited to public repositories
- Only the first 100 results from the code search are checked
