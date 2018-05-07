/*
每一次服务端渲染都要渲染新的app
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// 处理meta信息
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store'
import createRouter from './router'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return {app, router, store}
}
