//// @ts-check
import js from '@eslint/js';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const jsTsRules = {
  // TypeScript best practices
  '@typescript-eslint/array-type': ['warn'],
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-assertions': 'warn',
  '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'no-public',
    },
  ],
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    },
  ],
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-inferrable-types': 'warn',
  '@typescript-eslint/no-shadow': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/restrict-template-expressions': 'off',

  // JavaScript best practices
  eqeqeq: 'error',
  complexity: ['error', 20],
  curly: 'error',
  'guard-for-in': 'error',
  'max-classes-per-file': ['error', 1],
  'max-len': [
    'warn',
    {
      code: 120,
      comments: 160,
    },
  ],
  'max-lines': ['error', 400],
  'no-bitwise': 'error',
  'no-console': 'off',
  'no-new-wrappers': 'error',
  'no-useless-concat': 'error',
  'no-var': 'error',
  'no-restricted-syntax': 'off',
  'no-shadow': 'error',
  'one-var': ['error', 'never'],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      allowSeparatedGroups: true,
    },
  ],

  // Security
  'no-eval': 'error',
  'no-implied-eval': 'error',
};

export default tseslint.config(
  // {
  //   plugins: { json, markdown, css },
  // },
  {
    files: ['./apps/api/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintConfigPrettier,
      prettierPlugin,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
      },
      globals: globals.node,
    },
    rules: {
      ...jsTsRules,
    },
  },
  {
    files: ['./apps/demo/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier,
      prettierPlugin,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
      },
      globals: globals.browser,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // Angular best practices
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',

      ...jsTsRules,
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintConfigPrettier,
      prettierPlugin,
    ],
    rules: {},
  }
  // {
  //   files: ['**/*.json'],
  //   plugins: { json },
  //   language: 'json/json',
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //     },
  //   },
  //   extends: ['json/recommended'],
  // },
  // {
  //   files: ['**/*.jsonc'],
  //   plugins: { json },
  //   language: 'json/jsonc',
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //     },
  //   },
  //   extends: ['json/recommended'],
  // },
  // {
  //   files: ['**/*.json5'],
  //   plugins: { json },
  //   language: 'json/json5',
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //     },
  //   },
  //   extends: ['json/recommended'],
  // },
  // {
  //   files: ['**/*.md'],
  //   plugins: { markdown },
  //   language: 'markdown/gfm',
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //     },
  //   },
  //   extends: ['markdown/recommended'],
  // },
  // {
  //   files: ['**/*.css'],
  //   plugins: { css },
  //   language: 'css/css',
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //     },
  //   },
  //   extends: ['css/recommended'],
  // },
);
