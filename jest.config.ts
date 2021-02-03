module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/lib/**', '!jest.config.ts'],
  coverageDirectory: './coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
