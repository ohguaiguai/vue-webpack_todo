
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


`Error: Path variable [contenthash] not implemented in this context: style/[name].[contenthash].css`

    new ExtractPlugin('styles.[contentHash:8].css')
    这种写法最新版本的extract-text-webpack-plugin不再支持
    暂时使用new ExtractPlugin('styles.[md5:contentHash:hex:8].css')
