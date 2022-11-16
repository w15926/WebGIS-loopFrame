import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    name: '',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
