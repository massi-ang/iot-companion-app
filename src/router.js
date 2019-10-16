import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/LoginView.vue'
import Claim from './views/Claim.vue'
import { Auth } from 'aws-amplify'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/claim/:deviceid',
      name: 'claim',
      component: Claim,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user)
        next()
       })
      .catch(err => {
        console.log(err)
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      })
  } else {
    next()
  }
})

export default router