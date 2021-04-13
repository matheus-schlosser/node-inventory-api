module.exports = {
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.ts',
  ],
};
