const fs = require('fs-extra');
const crypto = require('crypto');

module.exports = function getHash(source) {
    return crypto
        .createHash('sha256')
        .update(fs.readFileSync(source, 'utf8'))
        .digest('hex');
};
