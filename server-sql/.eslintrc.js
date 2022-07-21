module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    radix: 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-throw-literal': 0,
    'import/no-cycle': 0,
  },
}
