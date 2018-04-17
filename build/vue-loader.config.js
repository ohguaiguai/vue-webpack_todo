module.exports = (isDev) => {
    return {
        // 是否保留不小心多出的空格，默认false
        preserveWhiteSpace: false,
        // vue默认情况下是不会把所有组件的css用ExtractPlugin抽取到公共样式表中，组件以及组件内的css,都是异步按需加载,这样可以提升首屏        // 渲染速度，如果希望抽取到公共样式表中则设置为true
        // 开发环境下是不允许使用ExtractPlugin的
        extractCss: !isDev,
        cssModules: {
            // 修改类名
            localIdentName: isDev ? '[hash:base64:5]' : '[path]-[name]-[hash:base64:5]',
            camelCase: true
        },
        // 这里无需配置，使用全局的postcss.config.js
        postcss: {},
        // 生产环境关闭
        // hotReload: true
    }
}
