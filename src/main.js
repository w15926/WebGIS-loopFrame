import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/el'
import './utils/filter'
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import { Base64 } from 'js-base64'
import * as methods from './utils/methods'
import './components/index.js'
// import { reqFile } from '@/utils/request'

// 导入config目录下所有的json文件
let obj = {}
let arr = []
arr = require.context('/public/static/config', true)
// if (process.env.NODE_ENV === 'development') arr = require.context('/public/static/config', true)
// else arr = require.context('/static/config', true)
arr.keys().forEach(async modulePath => {
  //   if (modulePath.indexOf('.json') > -1) {
  //     const fileName = modulePath.slice(2).replace('.json', '')
  //     obj[fileName] = await reqFile(`/static/config/${fileName}.json`)
  //   }
  if (modulePath.indexOf('.json') > -1) {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    if (moduleName.indexOf('./') === -1) {
      const value = arr(modulePath)
      obj[moduleName] = value
      Vue.prototype.$config = obj
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = new Vue()
Vue.prototype.$methods = methods
Vue.prototype.$loadsh = require('lodash')
Vue.prototype.$Base64 = Base64
Vue.prototype.$md5 = require('md5')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
