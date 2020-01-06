const path = require('path');
const lwcCompiler = require('@lwc/rollup-plugin');
const rollupCompatPlugin = require('rollup-plugin-compat');
const replace = require('rollup-plugin-replace');
const copy = require('rollup-plugin-cpy');
const copyFwFiles = require('./scripts/rollup/copy-fw-files');
const cleanBuildDir = require('./scripts/utils/clean');
const copySldsAssets = require('./scripts/utils/copy-assets');
const isCompat = require('./scripts/utils/is-compat')();
const external = require('./scripts/rollup/external');
const globals = require('./scripts/rollup/globals');

cleanBuildDir();
copySldsAssets();
copyFwFiles();

module.exports = {
    input: path.resolve('src/index.js'),
    output: {
        file: path.resolve('build/app.js'),
        format: 'iife',
        globals,
    },
    external,
    plugins: [
        copy({
            files: ['src/index.html', 'src/favicon.ico', 'src/lightning-logo.svg'],
            dest: 'build',
            options: {
                verbose: true,
            },
        }),
        lwcCompiler({
            exclude: [/\.md$/],
            stylesheetConfig: {
                customProperties: {
                    allowDefinition: true,
                },
            },
            modules: ['@salesforce-ux/design-system'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        isCompat && rollupCompatPlugin({ polyfills: false }),
    ],
    watch: {
        exclude: ['node_modules/**'],
    },
};
