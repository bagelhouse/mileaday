const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');
module.exports = {
  testMatch: ['**/*.test.{js,ts}'],
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', 
    '<rootDir>/.serverless/', 
    '<rootDir>/.webpack/', 
    '<rootDir>/localstack_tmp/',
    '<rootDir>/resources/',
    '<rootDir>/local/'],
  modulePathIgnorePatterns: [
    '<rootDir>/resources/',
    '<rootDir>/.serverless/', 
    '<rootDir>/.webpack/', 
    '<rootDir>/localstack_tmp/',
    '<rootDir>/local/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } ),
  reporters: [
    'default',
    "github-actions",
    ['jest-junit', {
      outputDirectory: '<rootDir>/test/reports',
      outputName: 'integrationTestReport'
    }]
  ],
  setupFiles: [
    '<rootDir>/test/harnesses/firebaseAdminEnv.ts',
  ],
};