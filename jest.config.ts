module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/lib/**', '**/src/**', '!jest.config.ts'],
  coverageDirectory: './coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/samples/'],
}
