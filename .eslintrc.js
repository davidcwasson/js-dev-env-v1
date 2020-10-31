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
    sourceType: 'module',
  },
  root: true,
  rules: {
    'comma-dangle': 0,
    'no-console': 1
  },
};
