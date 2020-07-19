module.exports = {
  env: {
    browser: false,
    es2020: true
  },

  globals: {
    '__dirname': true,
    '__filename': true,
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
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
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
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    // 'react/jsx-filename-extension': 0,
    // 'jsx-a11y/control-has-associated-label': 0,

    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },

  overrides: [{
    'files': ['*actions.ts'],
    'rules': {
      '@typescript-eslint/explicit-module-boundary-types': 0,
    }
  }]
};

