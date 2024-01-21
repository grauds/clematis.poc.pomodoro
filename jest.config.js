/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
  moduleNameMapper: {
    "\\.(css)": "identity-obj-proxy"
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageReporters: [
    "text",
    "cobertura"
  ],
  coveragePathIgnorePatterns: [
    'index.js',
    'index.jsx',
    'index.ts',
    '/node_modules/'
  ],
};