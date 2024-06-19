/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {
        'vue/comment-directive': false
      }
    }
  ],
  rules: {
    'vue/no-parsing-error': 0
  }
};
