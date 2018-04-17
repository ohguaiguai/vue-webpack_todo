
#### 主要文件
- `webpack.base.config.js`webpack的基本配置
- `webpack.client.config.js`区分开发、生产环境
- `.eslintrc` 保证代码规范
- `.postcss.config.js` css添加前缀
- `.babelrc` es6编译
- `.editorconfig` 使ge

#### 问题汇总

`Cannot read property 'vue' of undefined`

这种错误一般都是因为对应的loader版本有问题，可以卸载重装

