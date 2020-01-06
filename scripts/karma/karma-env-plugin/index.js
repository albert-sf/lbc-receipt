const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../../dist');
const ENV_FILENAME = path.resolve(DIST_DIR, 'env.js');

function createEnvFile(lwcConfig) {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }

    const content = [
        `window.process = {`,
        `    env: {`,
        `        NODE_ENV: ${lwcConfig.prod ? '"production"' : '"development"'},`,
        `        COMPAT: ${lwcConfig.compat},`,
        `        NATIVE_SHADOW: ${lwcConfig.nativeShadow}`,
        `    }`,
        `};`,
    ];

    fs.writeFileSync(ENV_FILENAME, content.join('\n'));
}

function initEnv(lwcConfig, files) {
    createEnvFile(lwcConfig);
    files.unshift({
        pattern: ENV_FILENAME,
    });
}

initEnv.$inject = ['config.lwc', 'config.files'];

module.exports = {
    'framework:env': ['factory', initEnv],
};
