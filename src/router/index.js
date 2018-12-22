import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Cont from '@/components/cont'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/cont',
      name: 'cont',
      component: Cont
    },
    /* 默认根路由 */
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
