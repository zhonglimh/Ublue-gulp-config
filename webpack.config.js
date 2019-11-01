/*
 * @Author: Ryan
 * @Date: 2019-05-06 14:50:28
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-31 23:02:47
 */
'use strict'

// transforming file paths
const path = require('path')

// include environmental config
const config = require('./gulp.env')

/* = Webpack
-------------------------------------------------------------- */
const webpackConfig = {
    mode: !config.isDev ? 'production' : 'development',
    entry: path.resolve(__dirname, config.paths.script + '/main.js'),
    output: {
        path: path.resolve(__dirname, config.pathsDev.script),
        filename: '[name].js'
    }
}
module.exports = webpackConfig
