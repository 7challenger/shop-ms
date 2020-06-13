module.exports = {
  env: {
    browser: false,
    es2020: true
  },
  globals: {
    '__dirname': true,
    'module': true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },

  plugins: [
    '@typescript-eslint'
  ],

  rules: {
    // 'react/sort-comp': 0,
    // 'react/prop-types': 0,
    'no-underscore-dangle': 0,
    // 'react/state-in-constructor': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 0,
    // 'react/jsx-props-no-spreading': 0,
    'operator-linebreak': 0,
    // 'react/jsx-filename-extension': 0,
    // 'jsx-a11y/control-has-associated-label': 0,

    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },

  overrides: [{
    'files': ['*actions.ts'],
    'rules': {
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }]
};

