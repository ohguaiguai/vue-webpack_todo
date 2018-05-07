import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutation'
import getters from './getter'
import actions from './action'

export default () => {
    const store = new Vuex.Store({
        // strict: true,// 正式环境要关掉，用来规范代码，修改state 的内容必须通过mutations
        strict: process.env.NODE_ENV === 'development',
        state: defaultState,
        mutations,
        getters,
        actions
        // vuex插件
        // plugins: [
        //     (store) => {
        //         console.log('plugin')
        //     }
        // ]
    })

    if (module.hot) {
        module.hot.accept([
            './state',
            './mutation',
            './getter',
            './action'
        ], () => {
            const newState = require('./state').default
            const newMutations = require('./mutation').default
            const newGetters = require('./getter').default
            const newActions = require('./action').default

            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                getters: newGetters,
                actions: newActions
            })
        })
        return store
    }
}
