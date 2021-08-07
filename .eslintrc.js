module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
  plugins: ['@html-eslint'],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      rules: {
        // https://yeonjuan.github.io/html-eslint/docs/all-rules
        'max-len': 0,
        '@html-eslint/indent': ['error', 2],
        '@html-eslint/no-abstract-roles': 'error',
        '@html-eslint/no-accesskey-attrs': 'error',
        '@html-eslint/no-aria-hidden-body': 'error',
        '@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }],
        '@html-eslint/no-non-scalable-viewport': 'error',
        '@html-eslint/no-positive-tabindex': 'error',
        '@html-eslint/no-target-blank': 'error',
        '@html-eslint/require-button-type': 'error',
        '@html-eslint/require-frame-title': 'error',
        '@html-eslint/require-meta-charset': 'error',
        '@html-eslint/require-meta-viewport': 'error',
      }
    },
  ],
};
