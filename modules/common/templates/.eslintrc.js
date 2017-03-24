module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    eqeqeq: 2,
    curly: 0,
    'no-console': 1,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ['error'],
    'react/prop-types': 1
  }
}
