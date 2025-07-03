import '@testing-library/jest-dom'
import dotenv from 'dotenv'

// Configura dotenv
dotenv.config({
  path: '.env',
})

// Mock de Jest para el archivo de entorno
jest.mock('./helpers/getEnvironments.js', () => ({
  getEnvironments: () => ({ ...process.env }),
}))

jest.mock('@monaco-editor/react', () => {
  return jest.fn(({ value, onChange }) => (
    <textarea
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      data-testid='monaco-editor'
    />
  ))
})

jest.mock('mui-tel-input', () => {
  const React = require('react')
  const MuiTelInput = React.forwardRef(({ value, onChange, defaultCountry, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-testid='mui-tel-input'
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={`Country: ${defaultCountry || ''}`}
        {...props}
      />
    )
  })

  MuiTelInput.displayName = 'MuiTelInput' // Explicitly setting the displayName

  return {
    MuiTelInput,
  }
})

// jest.setup.js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Obsoleto
    removeListener: jest.fn(), // Obsoleto
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
