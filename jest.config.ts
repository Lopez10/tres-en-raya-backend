import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/*.test.ts'],

  roots: ['<rootDir>'],
};

export default config;
