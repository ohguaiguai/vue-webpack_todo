const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

const staticRouter = require('./routers/static')

const app = new Koa

const isDev = process.env.NODE_ENV === 'development'

// 记录所有请求和捕捉错误
app.use(async (ctx, next) => {
    try {
        console.log(`request with path ${ctx.path}`)
        await next()
    } catch (err) {
        console.log(err)
        ctx.status = 500
        if (isDev) {
            ctx.body = err.message
        } else {
            ctx.body = 'please try again later'
        }
    }
})
// 处理/favicon.ico
app.use(async (ctx, next) => {
    if(ctx.path === '/favicon.ico')  {
        await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
    } else {
        await next()
    }
})
// 在pageRouter之前使用 单独处理 public开头的静态资源
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if(isDev) {
    pageRouter = require('./routers/dev-ssr')
} else {
    pageRouter = require('./routers/pro-ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}: ${PORT}`)
})
// 处理服务端渲染