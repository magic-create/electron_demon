import {createRouter, createWebHashHistory} from 'vue-router'

const routers = [{path: '/', meta: {title: 'Index'}, component: () => import('../../views/index/index.vue')}]
routers.push({path: '/:pathMatch(.*)', redirect: '/'})
export default createRouter({history: createWebHashHistory(), routes: routers})
