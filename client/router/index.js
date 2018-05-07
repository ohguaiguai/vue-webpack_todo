import VueRouter from 'vue-router'
import routes from './routes'

export default () => {
    return new VueRouter({
        routes,
        // 使用了history模式，前端路由没有错误但是如果手动刷新浏览器那么请求会到服务端，服务端没有处理就返回错误
        // 需要webpack做配置
        mode: 'history',
        // base: '/base'
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
        // 页面跳转时是否发生滚动
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 100}
            }
        },
        // 如果浏览器不支持前端路由则vue-router帮我们处理为hash跳转
        fallback: true
        // parseQuery() {
        //
        // },
        // stringifyQuery() {
        //
        // }
    })
}
