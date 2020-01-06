const GLOBALS = require('./globals');

module.exports = function(id) {
    return id in GLOBALS;
};
