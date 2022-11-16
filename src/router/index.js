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

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

router.beforeEach((to, from, next) => {
  next()
})

export default router
