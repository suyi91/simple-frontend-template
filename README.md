# 简单的前端小项目模板工程

> 适用于一些简单的多页面项目(比如说*component项目*)，可以本地调试开发和生产打包压缩。

## 更新日志

2018-04-30 升级支持Webpack4✨ 添加SCSS支持

## 支持功能

1. 模块化
1. ES6+([Babel][babel]转义)
1. [ESLint][eslint]
1. CSS/[LESS][less]/[SCSS][scss]
1. [PostCSS][postcss]/[Autoprefixer][autoprefixer]
1. 本地开发支持[Hot Module Replacement(HMR)][hmr]，并发布到本地
1. 编译生产支持[js压缩][uglifyjs]并生成sourceMap和css压缩，在`dist/`文件夹生成编译文件
1. CDN配置(设置webpack config文件中的`output.publicPath`)
1. 多页应用配置(设置webpack config文件中的`entry`。页面设置webpack config文件中添加[HtmlWebpackPlugin][html_webpack_plugin])

## 如何使用

1. 解压zip包
1. cd进目录
1. `npm i`安装node依赖(太慢可以配置[淘宝镜像][npm_taobao])
1. 本地开发`npm run dev` / 编译生产`npm run build`
1. 如果只需要js和css，删除webpack config中的[HtmlWebpackPlugin][html_webpack_plugin]

## 工程介绍

工程结构如下

```bash
.
├── .babelrc                    # babel配置文件
├── .editorconfig               # 通用编辑器配置文件
├── .eslintignore               # eslint跳过检查的配置文件
├── .eslintrc.js                # eslint配置规则文件
├── .postcssrc.js               # postcss配置文件
├── README.md
├── build                       # webpack配置文件夹
│   ├── webpack.base.conf.js    # base文件
│   ├── webpack.dev.conf.js     # 开发用
│   └── webpack.prod.conf.js    # 生产用
├── package.json                # 项目配置
└── src                         # 源代码目录
    ├── index.html              # 入口html文件
    ├── index.js                # js入口文件
    └── less                    # less文件夹
        └── main.less

```

[babel]: https://babeljs.io/ "Babel"
[eslint]: https://eslint.org/ "ESLint"
[less]: http://lesscss.org/ "LESS"
[stylus]: https://github.com/stylus/stylus "STYLUS"
[scss]: http://sass-lang.com/ "SCSS"
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/  "HMR"
[postcss]: https://github.com/postcss/postcss "PostCSS"
[autoprefixer]: https://github.com/postcss/autoprefixer "AutoPrefixer"
[uglifyjs]: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/ "Uglifyjs"
[html_webpack_plugin]: https://webpack.js.org/plugins/html-webpack-plugin/ "HtmlWebpackPlugin"
[npm_taobao]: http://npm.taobao.org/ "淘宝镜像"
