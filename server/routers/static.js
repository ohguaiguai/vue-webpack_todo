const Router = require('koa-router')
const send = require('koa-send')

// 只处理 /public开头的静态资源
// 打包出来的静态资源是在dist下，而访问的时候用的是public，所有映射关系不对，需要修改webpack.base.config.js
const staticRouter = new Router({prefix: '/public'})

staticRouter.get('/*', async ctx => {
    await send(ctx, ctx.path)
})

module.exports = staticRouter