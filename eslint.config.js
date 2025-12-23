import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	pluginJs.configs.recommended,

	{
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules,
		},
	},
	pluginReact.configs.flat.recommended,
	pluginPrettierRecommended,
	{
		plugins: {
			'react-native': fixupPluginRules(pluginReactNative),
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react-native/no-unused-styles': 2,
			'react-native/split-platform-components': 2,
			'react-native/no-inline-styles': 2,
			'react-native/no-color-literals': 2,
			'react-native/no-raw-text': 2,
			'react-native/no-single-element-style-arrays': 2,
			'react-hooks/exhaustive-deps': 'off',
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					singleQuote: true,
					semi: true,
					trailingComma: 'all',
					bracketSpacing: true,
					printWidth: 120,
					endOfLine: 'auto',
				},
			],
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/no-require-imports': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-empty-function': ['off'],
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
		},
	},
];
