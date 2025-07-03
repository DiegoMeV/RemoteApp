import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jestPlugin from 'eslint-plugin-jest'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Variables globales de Node.js
        __dirname: 'readonly',
        __filename: 'readonly',
        _: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        document: 'readonly',
        window: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        clearTimeout: 'readonly',
        crypto: 'readonly',
        FileReader: 'readonly',
        alert: 'readonly',
        hasOwnProperty: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        requestIdleCallback: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Buffer: 'readonly',
        TextEncoder: 'readonly',
        btoa: 'readonly',
        // Variables globales de Jest
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      'react/prop-types': 'off', // Desactiva la verificación de prop-types
      'react/react-in-jsx-scope': 'off', // Desactiva la necesidad de importar React en archivos JSX
      'no-useless-catch': 'off', // Desactiva la regla no-useless-catch
      'no-unused-vars': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-undef': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
