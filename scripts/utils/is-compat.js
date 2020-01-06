module.exports = function isCompat() {
    return /^compat$/i.test(process.env.mode);
};
