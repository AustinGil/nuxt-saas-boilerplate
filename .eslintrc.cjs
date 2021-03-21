module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    fetch: true,
  },
  plugins: ['@typescript-eslint', 'jsdoc', 'unicorn', 'jest', 'security'],
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'jsdoc/valid-types': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/check-tag-names': ['error', { definedTags: ['template'] }],
    'jsdoc/no-undefined-types': [
      'error',
      {
        definedTypes: ['Record', 'Pick', 'T'],
      },
    ],

    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/import-index': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
