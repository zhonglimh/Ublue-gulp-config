/*
 * @Author: Ryan
 * @Date: 2019-05-06 14:50:28
 * @Last Modified by: Ryan
 * @Last Modified time: 2020-03-11 18:38:33
 */
'use strict'

/* = Gulp
-------------------------------------------------------------- */
// include package
const { series, parallel, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const connect = require('gulp-connect')
const proxy = require('http-proxy-middleware')
const sourcemaps = require('gulp-sourcemaps')
const changed = require('gulp-changed')
const fileinclude = require('gulp-file-include')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const base64 = require('gulp-base64')
const postcss = require('gulp-postcss')
const pxtoviewport = require('postcss-px-to-viewport')
const pxtorem = require('postcss-pxtorem')
const del = require('del')
const through2 = require('through2')
const gulpWebpack = require('webpack-stream')

// include config
const config = require('./gulp.env')

// sass compiler
sass.compiler = require('node-sass')

/* = Task List
-------------------------------------------------------------- */
// html
function html () {
    return src(config.paths.html + '/**/!(m_)*.html')
        .pipe(config.isDev ? changed(config.pathsDev.html) : through2.obj())
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file'
            })
        )
        .pipe(dest(config.pathsDev.html))
        .pipe(connect.reload())
}
exports.html = html

// styles
let processors
switch (config.cssUnit) {
    case 'rem':
        processors = [pxtorem(config.pxtoremConfig)]
        break;
    case 'viewport':
        processors = [pxtoviewport(config.pxtoviewportConfig)]
        break;
    default:
        processors = ''
        break;
}
function styles () {
    return src(config.paths.css + '/*.scss')
        .pipe(config.isDev ? sourcemaps.init() : through2.obj())
        .pipe(
            sass({
                outputStyle: config.sassStyle
            }).on('error', sass.logError)
        )
        .pipe(postcss([autoprefixer(config.autoprefixerConfig)]))
        .pipe(processors ? postcss(processors) : through2.obj())
        .pipe(base64(config.base64Config))
        .pipe(
            sass({
                outputStyle: config.sassStyle
            }).on('error', sass.logError)
        )
        .pipe(config.sourceMap ? sourcemaps.write('maps') : through2.obj())
        .pipe(dest(config.pathsDev.css))
        .pipe(connect.reload())
}
exports.styles = styles

// images
function images () {
    return src([
        config.paths.image + '/**/*',
        '!' + config.paths.image + '/sprite/*'
    ])
        .pipe(!config.isDev ? changed(config.pathsDev.image) : through2.obj())
        .pipe(
            !config.isDev
                ? imagemin([
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.mozjpeg({ quality: 75, progressive: true }),
                    imagemin.optipng({ optimizationLevel: 5 }),
                    imagemin.svgo({
                        plugins: [
                            { removeViewBox: true },
                            { cleanupIDs: false }
                        ]
                    })
                ])
                : through2.obj()
        )
        .pipe(dest(config.pathsDev.image))
        .pipe(connect.reload())
}
exports.images = images

// scripts
const webpackConfig = require('./webpack.config')
function scripts () {
    return src([config.paths.script + '/*.js'])
        .pipe(config.isDev ? sourcemaps.init() : through2.obj())
        .pipe(changed(config.pathsDev.script))
        .pipe(config.useWebpack ? gulpWebpack(webpackConfig) : through2.obj())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(config.sourceMap ? sourcemaps.write('maps') : through2.obj())
        .pipe(dest(config.pathsDev.script))
        .pipe(connect.reload())
}
exports.scripts = scripts

// local server
let serverOptions = {
    name: 'ENV：' + config.env,
    root: config.pathsDev.html,
    host: '0.0.0.0',
    port: 8000,
    livereload: true
}
if (config.proxyOptions.changeOrigin) {
    serverOptions = {
        name: 'ENV：' + config.env,
        root: config.pathsDev.html,
        host: '0.0.0.0',
        port: 8000,
        livereload: true,
        middleware: () => {
            return [proxy('/api', config.proxyOptions)]
        }
    }
}
function server () {
    connect.server(serverOptions)
}
exports.server = server

// copy css
function copycss () {
    return src([config.paths.html + '/lib/*.css']).pipe(
        dest(config.pathsDev.css)
    )
}
exports.copycss = copycss

// copy js
function copyjs () {
    return src([config.paths.html + '/lib/*.js']).pipe(
        dest(config.pathsDev.script)
    )
}
exports.copyjs = copyjs

// watch
function watchList () {
    watch(config.paths.html + '/**/*.html', series(html))
    watch(config.paths.css + '/*.scss', series(styles))
    watch(config.paths.image + '/**/*', series(images))
    watch(config.paths.script + '/*.js', series(scripts))

    watch(config.paths.html + '/lib/*.css', series(copycss))
    watch(config.paths.html + '/lib/*.js', series(copyjs))
}
exports.watch = watchList

// clean
function clean () {
    return del([config.pathsDev.html + '/**']).then(() => {
        console.log(config.env + '项目初始化清理完成...')
    })
}
exports.clean = clean

// default
exports.default = series(parallel(server, watchList))

// init/build
exports.init = series(
    clean,
    html,
    styles,
    images,
    scripts,
    copycss,
    copyjs,
    done => {
        console.log(config.env + '项目初始化构建完成...')
        done()
    }
)

// const webpackConfig = require('./webpack.config')
// function assets () {
//     return new Promise((resolve, reject) => {
//         webpack(webpackConfig, (err, stats) => {
//             if (err) {
//                 return reject(err)
//             }
//             if (stats.hasErrors()) {
//                 return reject(new Error(stats.compilation.errors.join('\n')))
//             }
//             resolve()
//         })
//     })
// }
// exports.assets = assets