const path = require('path');
const kjhtml = require('karma-jasmine-html-reporter');
const karmaLwcPreprocessor = require('./scripts/karma/karma-lwc-preprocessor');
const karmaEnvPlugin = require('./scripts/karma/karma-env-plugin');
const babelIstanbulInstrumenter = require('./scripts/karma/babel-istanbul-instrumenter');

const { getModulePath } = require('lwc');

const LWC_ENGINE = getModulePath('engine', 'umd', 'es2017', 'dev');
const LWC_ENGINE_COMPAT = getModulePath('engine', 'umd', 'es5', 'dev'); //require.resolve('@lwc/engine/dist/umd/es5/engine.js');
const POLYFILL_COMPAT = require.resolve('es5-proxy-compat/polyfills.js');

const testPattern = '**/__component__/*.spec.js';

const coverageDir = path.join(__dirname, 'coverage');

function createPattern(location, config = {}) {
    return {
        ...config,
        pattern: location,
    };
}

function getLwcConfig(config) {
    const prod = Boolean(config.prod);
    const compat = Boolean(config.compat);
    const nativeShadow = Boolean(config.nativeShadow);

    const tags = [
        `${nativeShadow ? 'native' : 'synthetic'}-shadow`,
        compat && 'compat',
        prod && 'production',
    ].filter(Boolean);

    return {
        prod,
        compat,
        nativeShadow,
        tags,
    };
}

function getFiles(lwcConfig) {
    const frameworkFiles = lwcConfig.compat
        ? [createPattern(POLYFILL_COMPAT), createPattern(LWC_ENGINE_COMPAT)]
        : [createPattern(LWC_ENGINE)];

    return [...frameworkFiles, createPattern(testPattern, { watched: false })];
}

module.exports = function karmaConfig(config) {
    const lwcConfig = getLwcConfig(config);
    const files = getFiles(lwcConfig);
    config.set({
        baseDir: './src/',
        frameworks: ['env', 'jasmine'],
        files,
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            karmaLwcPreprocessor,
            karmaEnvPlugin,
            kjhtml,
        ],
        preprocessors: {
            [testPattern]: ['lwc'],
        },
        client: {
            args: [...config.client.args, '--grep', config.grep],
        },
        reporters: ['kjhtml'],
        browsers: ['Chrome'],
        lwc: lwcConfig,
    });

    if (config.coverage) {
        config.reporters.push('coverage');
        config.plugins.push('karma-coverage');

        config.coverageReporter = {
            dir: path.join(coverageDir, lwcConfig.tags.join('_')),
            reporters: [{ type: 'html' }, { type: 'json' }],

            // The instrumenter used by default by karma-coverage doesn't play well with es6+ syntax. We need to
            // override the default instrumenter with a more recent version using Babel.
            instrumenter: {
                [testPattern]: 'babel-instanbul',
            },
            instrumenters: {
                'babel-instanbul': babelIstanbulInstrumenter,
            },
        };
    }
};
