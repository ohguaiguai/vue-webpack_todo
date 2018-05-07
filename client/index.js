/*
* index.js
* 项目入口文件
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import createRouter from './router'
import createStore from './store'
import App from './app.vue'

// 引入全局CSS样式
import './assets/styles/global.styl'

// 在body下创建一个根节点
const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.watch((state) => state.count + 1, (newCount) => {
    console.log('new count watched')
})
// 监听mutation
store.subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(mutation.payload)
})
// 监听action
store.subscribeAction((action, state) => {

})

// 将根节点root注入到app.vue组件中
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount(root)
