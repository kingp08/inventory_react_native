module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allow JSX syntax
    },
    ecmaVersion: 2020, // Set a supported ECMAScript version (adjust as needed)
    sourceType: 'module', // Specify module source type
    project: './tsconfig.json', // Reference your project's tsconfig.json
  },
  plugins: [
    'react', // ... other plugins
    'react-hooks',
  ],
  plugins: [
    'react', // ESLint plugin for React
    '@typescript-eslint', // ESLint plugin for TypeScript
    'prettier', // ESLint plugin for Prettier integration (optional)
  ],
  extends: [
    'plugin:react/recommended', // Recommended React rules
    'plugin:@typescript-eslint/recommended', // Recommended TypeScript rules
    'prettier', // Airbnb or other code style guide (optional)
  ],
  rules: {
    // Add or customize ESLint rules here
    '@typescript-eslint/no-unused-vars': 'error', // Prevent unused variables
    '@typescript-eslint/no-explicit-any': 'warn', // Discourage any type usage
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {allowExpressions: true},
    ], // Consider explicit return types
    'react/prop-types': 'off', // Not necessary with TypeScript
    'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.jsx']}], // Allow JSX in .tsx files
    // ... other rules
    'react-hooks/rules-of-hooks': 'error', // Warns for incorrect hook usage (recommended)
    'react-hooks/exhaustive-deps': 'warn', // Warns for missing useEffect dependencies (optional)
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Handle TypeScript extensions
      },
    },
  },
};
