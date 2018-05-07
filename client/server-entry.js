/*
传入到server-render.js
 */

import createApp from './create-app'

export default context => {
    return new Promise((resolve, reject) => {
        // 每次都创建新的app
        const {app, router} = createApp()

        router.push(context.url)
        // 服务端渲染时才使用onReady; 所有异步操作执行完之后
        router.onReady(() => {
            // 根据url来匹配组件
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            // 服务端使用vue-meta
            context.meta = app.$meta()
            resolve(app)
        })
    })
}
