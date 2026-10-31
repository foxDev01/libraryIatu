import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['node_modules', 'public', 'resources/views', 'vendor'] },
    {
        files: ['resources/js/**/*.{ts,tsx}', 'vite.config.js'],
        extends: [js.configs.recommended, reactRecommended],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: { version: 'detect' },
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            ...tseslint.configs.recommended[1].rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': 'off',
        },
    },
    {
        files: ['resources/js/**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
);
