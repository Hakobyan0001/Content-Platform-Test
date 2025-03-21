import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    plugins: {
      react,
      prettier,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': typescript
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto'
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true, 
          allowTernary: true 
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$', '^next', '^[a-z]'],
            ['^@'],
            ['^~'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^\\u0000']
          ]
        }
      ]
    }
  },
  {
    files: ['src/service-worker.js', 'src/serviceWorkerRegistration.js'],

    rules: {
      'no-undef': 'off'
    }
  }
];
