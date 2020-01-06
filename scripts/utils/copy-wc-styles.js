const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const componentStylesDir = path.resolve('node_modules/@salesforce-ux/design-system/ui/modules');
const componentsDir = path.resolve('src/lightning');
const commonCssPath = path.join(componentStylesDir, '/common/index.css');
let commonCssContent = '';

function componentExists(name) {
    return fs.existsSync(path.join(componentsDir, name));
}

function getCommonCssContent() {
    if (commonCssContent === '') {
        commonCssContent = fs.readFileSync(commonCssPath).toString();
    }
    return commonCssContent;
}

function copyStyles(stylesDir) {
    const { name } = path.parse(stylesDir);
    const query = path.join(stylesDir, '/**/index.css');
    const content = glob.sync(query).reduce((seed, cssFilePath) => {
        const cssContent = fs.readFileSync(cssFilePath);
        seed += `
            ${cssContent.toString()}
        `;
        return seed;
    }, getCommonCssContent());
    const cssDir = path.join(componentsDir, name, 'styles');
    const cssBundlePath = path.join(cssDir, 'bundle.css');
    fs.ensureDirSync(cssDir);
    fs.writeFileSync(cssBundlePath, content);
}

function copyComponentStyles() {
    if (fs.existsSync(componentStylesDir)) {
        const query = path.join(componentStylesDir, '/*/');
        glob.sync(query).forEach(stylesDir => {
            const { name } = path.parse(stylesDir);
            if (componentExists(name)) {
                copyStyles(stylesDir);
            }
        });
    } else {
        throw new Error(`
            We didn't find @salesforce-ux package with the wc styles, 
            either the package wasn't installed yet or there is a wrong
            version of the package installed.
        `);
    }
}

copyComponentStyles();
