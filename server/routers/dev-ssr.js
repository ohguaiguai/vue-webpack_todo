const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// 和fs的区别是: 不会把文件写入磁盘而是写在内存中
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
// 关键插件
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
// 在node环境下编译webapck
const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFS()
// 指定webapck的compiler输出目录在mfs(内存)中
serverCompiler.outputFileSystem = mfs

let bundle // 记录每次打包生成的文件
// 修改文件则重新打包
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(err => console.log(err))
    // 读取生成的bundle文件
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json' // VueServerPlugin生成的json文件
    )
    // mfs.readFileSync(bundlePath, 'utf-8')返回的是字符串
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('new bundle has generated successfully.')
})

// 处理整个服务端返回的内容
const handleSSR = async (ctx) => {
    // console.log(ctx)
    if(!bundle) {
        ctx.body = '等一会，别着急...'
        return
    }
    // 发送http请求请求到webpack-dev-server生成的vue-ssr-client-manifest.json，里面包含了静态资源的路径
    // 服务端渲染的页面对于静态资源的引用是相对路径：在node服务中取请求webpack-dev-server中资源有跨域问题
    // 把webpack.config.base.js 中的publicPath 改为 'http://127.0.0.1/public/'
    const clientManifestResp = await axios.get('http://127.0.0.1:8888/public/vue-ssr-client-manifest.json')
    const clientManifest = clientManifestResp.data;

    // 读取模板
    const template = fs.readFileSync(path.join(__dirname, '../server-template.ejs'), 'utf-8')
    // 生成一个可以直接调用render的方法
    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false, // 禁止掉默认的注入
        clientManifest// 生成一个类似'<script src=""></script>'的字符串
    })
    await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router