const fs = require('fs-extra');
const path = require('path');

const assetsDir = path.resolve('node_modules/@salesforce-ux/design-system/assets');
const outputDir = path.resolve('build/assets');

module.exports = function copySldsAssets() {
    fs.copySync(assetsDir, outputDir);
};
