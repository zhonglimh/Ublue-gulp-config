let basePaths = 'project-file-name'

let baseConfig = {
    env: 'development',
    isDev: true,
    sourceMap: true,
    sassStyle: 'compact',
    cssRename: true,
    paths: {
        html: basePaths + '/src',
        css: basePaths + '/src/scss',
        script: basePaths + '/src/js',
        image: basePaths + '/src/images'
    },
    pathsDev: {
        html: basePaths + '/dist',
        css: basePaths + '/dist/css',
        script: basePaths + '/dist/js',
        image: basePaths + '/dist/images'
    },
    pathsTest: {
        html: basePaths + '/dist_test',
        css: basePaths + '/dist_test/css',
        script: basePaths + '/dist_test/js',
        image: basePaths + '/dist_test/images'
    },
    pathsBuild: {
        html: basePaths + '/build',
        css: basePaths + '/build/css',
        script: basePaths + '/build/js',
        image: basePaths + '/build/images'
    },
    autoprefixerConfig: {
        overrideBrowserslist: ['last 2 version']
    },
    base64Config: {
        extensions: ['png'],
        maxImageSize: 8 * 1024
    },
    cssUnit: 'px', // px ｜ rem ｜ viewport
    pxtoviewportConfig: {
        viewportWidth: 750,
        viewportUnit: 'vmin'
    },
    pxtoremConfig: {
        rootValue: 16,
        unitPrecision: 4,
        propList: ['*'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 2
    },
    proxyOptions: {},
    useWebpack: false
}

let projectConfig = require('./' + basePaths + '/project.config')

if (projectConfig) {
    for (let k in projectConfig) {
        if (projectConfig[k] !== undefined) {
            baseConfig[k] = projectConfig[k]
        }
    }
}

module.exports = baseConfig
