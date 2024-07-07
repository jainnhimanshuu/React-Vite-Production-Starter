const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'padding-line-between-statements': [
            2,
            {
                blankLine: 'always',
                prev: '*',
                next: ['return', 'class', 'try', 'for', 'if', 'switch', 'while'],
            },
        ],
        'prettier/prettier': ['error', prettierOptions],
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-var': 2,
        'prefer-const': 2,
        'prefer-template': 2,
        'prefer-spread': 2,
        'spaced-comment': 1,
        'max-statements-per-line': 2,
        'multiline-comment-style': 2,
        'no-octal-escape': 0,
        'react/no-multi-comp': [2, { ignoreStateless: false }],
        'react/display-name': 0,
        'react/jsx-pascal-case': 2,
        'react/react-in-jsx-scope': 'off',
        'react/prefer-read-only-props': 2,
        'react/jsx-sort-props': 2,
        'react/jsx-max-depth': [1, { max: 5 }],
        'react/jsx-no-duplicate-props': 2,
        'react/prefer-es6-class': 2,
        'react/boolean-prop-naming': 2,
        'react/no-typos': 2,
        'react/sort-comp': [
            2,
            {
                order: [
                    'instance-variables',
                    'static-methods',
                    'lifecycle',
                    '/^on.+$/',
                    'everything-else',
                    'render',
                ],
            },
        ],
        'import/newline-after-import': [2, { count: 1 }],
        'import/no-duplicates': 2,
        'import/no-unresolved': 0,
        'import/named': 0,
        'import/no-named-as-default': 0,
    },
};
