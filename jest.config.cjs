module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/pngMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
