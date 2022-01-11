import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Registering from "@/views/Registering";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/registering',
        name: 'registering',
        component: Registering
    },
]

const router = new VueRouter({
    routes
})

export default router
