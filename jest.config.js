/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef, @typescript-eslint/no-unused-vars
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
 // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/scripts/fileMock.js',
    '^@/(.*)$': ['<rootDir>/src/$1'],
  },
  snapshotSerializers: [],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['text', 'cobertura'],
  coveragePathIgnorePatterns: [
    'index.js',
    'index.jsx',
    'index.ts',
    '/node_modules/',
  ]
};
