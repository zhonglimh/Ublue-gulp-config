# Gulp4 工作流配置(Gulp4 workflow config)

<p>
    <a href="https://travis-ci.org/zhonglimh/Ublue-gulp-config">
        <img src="https://travis-ci.org/zhonglimh/Ublue-gulp-config.svg?branch=master">
    </a>
    <a href="https://npmcharts.com/compare/ublue-gulp-config?minimal=true">
        <img src="https://img.shields.io/npm/dt/ublue-gulp-config.svg">
    </a>
    <a href="https://www.npmjs.com/package/ublue-gulp-config">
        <img src="https://img.shields.io/npm/v/ublue-gulp-config.svg">
    </a>
</p>

## 简介 - Introduction

简单实用的前端自动化工作流配置，基于 Gulp4.x  
Simple and practical front-end automated workflow configuration based on Gulp4.x

## 特性 - Features
* SASS (CSS preprocessor)
* 图像压缩和转Base64 (Images compress & save base64 image)
* JS压缩 (JavaScript compressor)
* 热加载 (Hot reload)
* 一套环境多项目共存 (Multi-Project Builds)
* ES6转换 (Babel)
* 自动添加CSS前缀 (Autoprefixer)
* 移动端适配方案 (Pixels / Rem / Viewport)
* 反向代理（HTTP proxy）
* Webpack打包（Webpack）

## 目录结构 - Directory structure
```
+ project_file_name                 // Project folder(Example)
    + Build                         // Production folder(Output floder)
        - etc...
    + dist                          // Pevelopment folder(Output floder)
        - etc...
    + dist__test                    // Test folder(Output floder)
        - etc...
    + src                           // Source code
        - images                    // Image folder
        - js                        // Script folder
        - lib                       // CSS/JS library
        - scss                      // Style folder
        - project.config.js         // Project custom config
- .gitignore                        // Exclude files from git
- gulp.env.js                       // Gulp environmental config
- gulp.config.js                    // Gulp custom config
- gulpfile.js                       // Gulp config
- package.json                      // Dependency & Module list
- README.md                         // Documentation
- webpack.config.js                 // Webpack config
- yarn.lock                         // Yarn
```

## 环境要求 - Pre Required

如果你已经全局安装了 gulp 请先删除旧版本后再安装  
If you've previously installed gulp globally, please remove the old version

```bash
$ npm rm --global gulp
# or
$ yarn global remove gulp
```

全局安装 gulp-cli

Install the gulp command line utility

```bash
$ npm install --global gulp-cli
# or
$ yarn global add gulp-cli
```

## 安装方式 - Installation

```bash
# 安装 - Using npm or yarn
$ npm i ublue-gulp-config
# or
$ yarn add ublue-gulp-config

# 安装依赖 - Install dependency
$ npm install
# or
$ yarn install
```

## 使用方法 - Used

```bash
# 项目初始化 - Project initialization
$ gulp init

# 环境启动 - Start it
$ gulp
```

## 环境切换 - Using environment variables

```bash
# 发布测试环境 - Build for test environment
$ gulp init --test

# 发布生产环境 - Build for production environment
$ gulp init --build

# 清理生产目录 - Clean up development or production
$ gulp clean

# 清理指定环境目录 - Clean up the specified environment directory
$ gulp clean --test
```

## 开源许可(License)
[MIT](https://opensource.org/licenses/MIT)

## 更新日志(Release History)

**2019-10-31**  
v1.1.0 - 个别插件过旧，处于安全因素进行替换，并重构部分代码。

**2019-03-11**  
v1.0.1 - 添加示例。[查看该版本存档](https://github.com/zhonglimh/Ublue-gulp-config/tree/v1.0.1)

**2019-03-10**  
v1.0.0 - 初始发布。