const path = require('path');

const resolveSrc = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
    appDirectory: resolveSrc('../app'),
    buildDirectory: resolveSrc('../../dist'),
    buildImageDirectory: resolveSrc('../../dist/images'),
    buildIndexHtml: resolveSrc('../../dist/index.html'),
    buildJsDirectory: resolveSrc('../../dist/js'),
    buildSvgSprite: resolveSrc('../../dist/images'),
    dotEnv: resolveSrc('../.env'),
    imageDirectory: resolveSrc('../images'),
    indexPug: resolveSrc('../index.pug'),
    indexTsx: resolveSrc('../app/index.tsx'),
    indexTs: resolveSrc('../app/index.ts'),
    nodeModulesDirectory: resolveSrc('../node_modules'),
    svgDirectory: resolveSrc('../svg'),
    tsConfig: resolveSrc('../tsconfig.json'),
    tsLint: resolveSrc('../tslint.json'),
};