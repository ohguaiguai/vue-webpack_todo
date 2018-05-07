<template>
    <!-- app.vue 的template标签内只能有一个节点 -->
    <div id="app">
        <div id="cover"></div>
        <v-header></v-header>
        <!--<p>{{count}} {{fullName}}</p>-->
        <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link>
        <router-view />
        <v-footer></v-footer>
    </div>
</template>

<script>
    // 引入header.vue组件
    import vHeader from './views/layout/header.vue'

    // 引入footer.jsx组件
    import vFooter from './views/layout/footer.jsx'

    // 引入todo.vue组件
    import vTodo from './views/todo/todo.vue'

    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        mataInfo: {
          title: 'this is meta'
        },
        // 声明组件，之后便可以使用组件标签
        components: {
            vHeader,
            vFooter,
            vTodo
        },
        mounted() {
            // let i = 1
            // setInterval(() => {
            //     this.updateCount({
            //         num: i++
            //     })
            // }, 1000)
        },
        computed: {
            ...mapState(['count']),
            ...mapGetters(['fullName'])
        },
        methods: {
            ...mapMutations(['updateCount'])
        }
    }
</script>

<!-- 设置scoped 表示当前组件下的id只在当前组件起作用，不会跟其他组件引起冲突 -->
<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }

</style>