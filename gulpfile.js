"use strict";

/* = Gulp组件
-------------------------------------------------------------- */
const { series, parallel, src, dest, watch } = require('gulp'), // Gulp
    sass                = require('gulp-sass'),                 // Sass预处理
    autoprefixer        = require('gulp-autoprefixer'),         // 自动添加css浏览器前缀
    uglify              = require('gulp-uglify'),               // JS文件压缩
    imagemin            = require('gulp-imagemin'),             // 图片压缩
    pngquant            = require('imagemin-pngquant'),         // 深度压缩
    connect             = require('gulp-connect'),              // 本地服务器
    sourcemaps          = require('gulp-sourcemaps'),	        // 来源地图
    changed             = require('gulp-changed'),		        // 只操作有过修改的文件
    fileinclude         = require('gulp-file-include'),	        // 文件引入
    rename              = require('gulp-rename'),		        // 文件重命名
    gutil               = require('gulp-util'),                 // gulp工具箱（包含了很多 task 会使用到的工具）
    babel               = require('gulp-babel'),                // ES6转换
    base64              = require('gulp-base64'),               // 图片转 base64
    postcss             = require('gulp-postcss'),              // 样式转换插件
    pxtoviewport        = require('postcss-px-to-viewport'),    // PX 转 Viewport
    del                 = require('del');                       // 文件清理

// 引入配置文件
const config = require('./gulp.config');

// 配置sass
sass.compiler = require('node-sass');

/* = 配置切换( Config Witch )
-------------------------------------------------------------- */
if ( gutil.env.test === true ) {
    config.isDev = false;
    config.sourceMap = false;
    config.sassStyle = 'compressed';
    config.pathsDev = config.pathsTest;
}
if ( gutil.env.build === true ) {
    config.isDev = false;
    config.sourceMap = false;
    config.sassStyle = 'compressed';
    config.pathsDev = config.pathsBuild;
}

/* = 开发环境( Ddevelop Task )
-------------------------------------------------------------- */
// HTML处理
function html() {
    return src( config.paths.html+'/**/!(m_)*.html' )
        .pipe( config.isDev ? changed( config.pathsDev.html ) : gutil.noop() )
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest( config.pathsDev.html ))
        .pipe(connect.reload())
};
exports.html = html;

// 样式处理
function styles() {
    const processors = [
        pxtoviewport({
            viewportWidth: 750,
            viewportUnit: 'vmin'
        })
    ];
    return src(config.paths.css+'/*.scss')
        .pipe(config.isDev ? sourcemaps.init() : gutil.noop())
        .pipe(sass({outputStyle: config.sassStyle}).on('error', sass.logError))
        .pipe(config.pxToViewport ? postcss(processors) : gutil.noop())
        .pipe(autoprefixer(config.autoprefixerConfig))
        .pipe(base64(config.base64Config))
        .pipe(config.sourceMap ? sourcemaps.write('maps') : gutil.noop())
        .pipe(dest(config.pathsDev.css))
        .pipe(connect.reload())
};
exports.styles = styles;

// 图片压缩
function images() {
    return src( [config.paths.image+'/**/*','!'+config.paths.image+'/sprite/*'] )
        .pipe( config.isDev ? changed( config.pathsDev.html ) : gutil.noop() )
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(dest( config.pathsDev.image ))
        .pipe(connect.reload())
};
exports.images = images;

// JS 文件压缩&重命名
function scripts() {
    return src([config.paths.script+'/*.js'])
        .pipe(config.isDev ? sourcemaps.init() : gutil.noop())
        .pipe(changed( config.pathsDev.script ))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(config.sourceMap ? sourcemaps.write('maps') : gutil.noop())
        .pipe(dest( config.pathsDev.script ))
        .pipe(connect.reload())
};
exports.scripts = scripts;

// 本地服务器
function server() {
    connect.server({
        name: '当前为：' + (config.isDev ? '开发环境' : '生产环境'),
        root: config.pathsDev.html,
        // host: '192.168.154.97',
        port: 8000,
        livereload: true
    });
};
exports.server = server;

// 拷贝CSS
function copycss() {
    return src( [config.paths.html+'/lib/*.css'] )
        .pipe(dest( config.pathsDev.css ));
};
exports.copycss = copycss;

// 拷贝JS
function copyjs() {
    return src( [config.paths.html+'/lib/*.js'] )
        .pipe(dest( config.pathsDev.script ));
};
exports.copyjs = copyjs;

// 监听任务
function watchList() {
    watch(config.paths.html + '/**/*.html', series(html));
    watch(config.paths.css + '/*.scss', series(styles));
    watch(config.paths.image + '/**/*', series(images));
    watch(config.paths.script + '/*.js', series(scripts));

    watch(config.paths.html + '/lib/*.css', series(copycss));
    watch(config.paths.html + '/lib/*.js', series(copyjs));
}

exports.watch = watchList;

// 清理环境
function clean() {
    return del([config.pathsDev.html + '/**']).then(() => {
        console.log('项目初始化清理完成...');
    });
}
exports.clean = clean;

// 默认任务
exports.default = series(parallel(server, watchList));

// 初始化任务
exports.init = series(clean, html, styles, images, scripts, copycss, copyjs, () => {
    console.log('项目初始化构建完成...');
})