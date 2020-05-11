import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from "../pages/index.vue"
import Tab2 from "../pages/tab2.vue"
import Tab3 from "../pages/tab3.vue"
import Tab4 from "../pages/tab4.vue"
import audioDegist from "../pages/audioDegist.vue"
import searchPage from "../pages/searchpage.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true // 需要被缓存
    }
    },
    {
      path: '/tab2',
      name: 'tab2',
      component: Tab2,
      meta: {
        keepAlive: true // 需要被缓存
    }
    },
    {
      path: '/tab3',
      name: 'tab3',
      component: Tab3,
      meta: {
        keepAlive: true // 需要被缓存
    }
    },    
    {
      path: '/tab4',
      name: 'tab4',
      component: Tab4,
      meta: {
        keepAlive: true // 需要被缓存
    }
    },
    {
      path: '/audiodegist',
      name: 'audiodegist',
      component: audioDegist
    },
    {
      path: '/searchpage',
      name: 'searchpage',
      component: searchPage
    },






    
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }

  ]
})
