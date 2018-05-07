// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        // props: true, // id会作为props传递给Todo
        // props: (route) => {
        //     return {
        //         id: route.query.b
        //     }
        // },
        component: () => import('../views/todo/todo.vue')
    },
    {
        path: '/login',
        component: () => import('../views/login/login.vue')
    }
]
