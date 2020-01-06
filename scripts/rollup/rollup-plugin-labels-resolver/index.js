const resolveLabel = require('./../../labels-generator');

module.exports = function rollupPluginLabelsResolver(options = {}) {
    const { labelXmlPath } = options;
    return {
        name: 'rollup-plugin-labels-resolver',
        resolveId(importee) {
            return resolveLabel(importee, { labelXmlPath });
        },
    };
};
