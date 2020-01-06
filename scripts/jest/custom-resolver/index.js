const lwcJestResolver = require('@lwc/jest-resolver');

module.exports = function rollupPluginJestResolver(importee, options) {
    return lwcJestResolver(importee, options);
};
