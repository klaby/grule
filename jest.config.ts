module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.ts', '!jest.config.ts'],
  coverageDirectory: '../coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
