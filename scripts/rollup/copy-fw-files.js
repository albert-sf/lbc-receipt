const path = require('path');
const fs = require('fs-extra');
const compatPolyfills = require('compat-polyfills');

const historyPath = path.join(require.resolve(`history/umd/history.js`));

module.exports = function copyFwFiles() {
    fs.ensureDir(path.resolve('build/fw/'));

    // polyfills
    fs.writeFileSync(path.resolve('build/fw/polyfills.js'), compatPolyfills.loadPolyfills());

    // history
    fs.copySync(historyPath, path.resolve('build/fw/history.js'));
};
