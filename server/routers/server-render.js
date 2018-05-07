const ejs = require('ejs')

// 渲染模板
module.exports = async (ctx, renderer, template) => {
    ctx.headers['Content-Type'] = 'text/html'

    // 包括一堆属性，比如css的路径,js的路径
    const context = {url: ctx.path}
    try {
        const appString = await renderer.renderToString(context)
        // 拿到title
        const {
            title
        } = context.meta.inject()
        // 渲染、处理依赖关系
        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            title: title.text()
        })

        ctx.body = html
    } catch (err) {
        console.log('render error')
        throw err
    }
}