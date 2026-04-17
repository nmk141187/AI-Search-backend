import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true
};

export default config;
