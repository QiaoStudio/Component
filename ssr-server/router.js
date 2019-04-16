// router.js
import Vue from 'vue'
import Router from 'vue-router'
import Globals from './pages/globals.vue'
import Elements from './pages/elements.vue'
import Modules from './pages/modules.vue'
import Utilities from './pages/utilities.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Elements
      },
      {
        path: '/elements',
        component: Elements
      },
      {
        path: '/globals',
        component: Globals
      },
      {
        path: '/modules',
        component: Modules
      },
      {
        path: '/utilities',
        component: Utilities
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
}
