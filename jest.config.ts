import type { Config } from 'jest';

export default async (): Promise<Config> => {
    return {
        roots: ['<rootDir>/tests'],
        testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
        transform: {
            '^.+\\.(ts|tsx)$': 'ts-jest'
        },
        testEnvironment: 'jsdom',
        moduleDirectories: ['node_modules', 'src']
    };
};
