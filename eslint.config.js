import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angularLint from 'angular-eslint';
import jasmine from 'eslint-plugin-jasmine';
import prettierConfigs from 'eslint-plugin-prettier/recommended';
import { eslintDefaultConfig } from './eslint-default.config.js';

export default tseslint.config(
  {
    ignores: ['**/target', '**/node_modules', '**/karma.conf.cjs', '**/environments'],
  },
  eslint.configs.recommended,
  prettierConfigs,
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angularLint.configs.tsRecommended,
      ...eslintDefaultConfig.jsConfig,
      ...eslintDefaultConfig.tsConfig,
    ],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [...eslintDefaultConfig.jsConfig],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        createDefaultProgram: true,
      },
    },
  },
  {
    files: ['**/*.spec.ts'],
    plugins: { jasmine },
    extends: [jasmine.configs.recommended, ...eslintDefaultConfig.specConfig],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.jasmine,
      },
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
    },
  },
  {
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],
    extends: [...angularLint.configs.templateRecommended, ...eslintDefaultConfig.htmlConfig],
    languageOptions: {
      parser: angularLint.templateParser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
    processor: angularLint.processInlineTemplates,
  },
);
