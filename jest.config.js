// Essa linha deve ser carregada antes dos demais codigos para garantir
// O corregamento das variaveis de ambiente.
require('dotenv').config();

process.env.NODE_ENV = 'TEST';

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(.*.(test|spec)).(jsx?|tsx?)$',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/utils/', '/node_modules/', '/prisma/'],
  coveragePathIgnorePatterns: ['/src/utils/',],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  verbose: true,
  globals: {
    'ts-jest': {
      disableSourceMapSupport: true,
    },
  },
};
