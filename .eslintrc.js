module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "browser": true,
    "es6": true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  parser: "babel-eslint",
  rules: {
    // For linter to work properly
    'react/jsx-uses-vars': 'warn',
    "react/jsx-uses-react": 'warn',
    // react rule
    'react/no-direct-mutation-state': 'warn',
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-curly-spacing': ['warn', 'never', { allowMultiline: true }],
    'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/no-this-in-sfc': 'warn',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-no-duplicate-props': ['warn', { 'ignoreCase': true }],
    'react/jsx-no-undef': 'warn',
    'react/jsx-one-expression-per-line': 'warn',
    'react/jsx-no-literals': 'warn',
    // js rule
    'no-unused-vars': [
      'warn', 
      { 
        vars: 'all', 
        args: 'none', 
        ignoreRestSiblings: true, 
        varsIgnorePattern: "(res)||(theme)" 
      }
    ],
    'object-curly-spacing': ['warn', 'always'],
    'no-whitespace-before-property': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'array-bracket-spacing': ['warn', 'never'],
    'block-spacing': ['warn', 'always'],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi-style': ['warn', 'last'],
    'semi': 'warn',
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
