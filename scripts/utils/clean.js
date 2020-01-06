const path = require('path');
const fs = require('fs-extra');

const buildDir = path.resolve('build');

module.exports = function cleanBuildDir() {
    fs.ensureDirSync(buildDir);
    fs.emptyDirSync(buildDir);
};
