# Gulp4 工作流配置(Gulp4 workflow config)

![npm](https://img.shields.io/npm/v/ublue-gulp-config.svg?style=flat-square)

## 简介(Introduction)

简单实用的前端自动化工作流配置，基于 Gulp4.x
Simple and practical front-end automated workflow configuration based on Gulp4.x

## 特性(Features)
* SASS (CSS preprocessor)
* 图像压缩和转Base64 (Images compress & save base64 image)
* JS压缩 (JavaScript compressor)
* 热加载 (Hot reload)
* 一套环境多项目共存 (Multi-Project Builds)

## 目录结构(Directory structure)
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
- gulp.config.js                    // Gulp custom config
- gulpfile.js                       // Gulp config
- package.json                      // Dependency & Module list
- README.md                         // Documentation
- yarn.lock                         // Yarn
```

## 环境要求(Pre Required)

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

## 安装方式(Installation)

```bash
# 安装 - Using npm or yarn
$ npm i ublue-gulp-config
# or
$ yarn add ublue-gulp-config
```

```bash
# 安装依赖 - install dependency
$ npm install
# or
$ yarn install
```

## 使用方法(Used)

```bash
# 环境启动 - start it
$ gulp

# 项目初始化 - project initialization
$ gulp init

# 清理生产和开发 - clean up development or production
$ gulp clean
```

## 项目发布(Build)
```bash
# 发布测试环境- build for test environment
$ gulp init --test

# 发布生产环境 - build for production environment
$ gulp init --build
```

## 开源许可(License)
[MIT](https://github.com/vuejs/vuepress/blob/master/LICENSE)