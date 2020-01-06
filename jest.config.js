const path = require('path');

module.exports = {
    moduleFileExtensions: ['js'],
    resolver: path.resolve('scripts/jest/lightning-jest-resolver'),
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__test-disabled__/',
        '/__integration__/',
        '/__component__/',
        '__wdio__',
    ],
    preset: '@lwc/jest-preset',
    testMatch: ['**/__unit__/**/?(*.)(spec|test).js'],
    moduleNameMapper: {
        '^(c)/(.+)$': '<rootDir>/src/$1/$2/$2',
    },
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
        },
    },
    coveragePathIgnorePatterns: ['[.]css$', '[.]html$'],
    snapshotSerializers: ['@lwc/jest-serializer'],
};
