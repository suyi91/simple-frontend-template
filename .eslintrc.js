module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  extends: 'airbnb-base',
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'arrow-parens': ['error', 'as-needed'],
  }
};