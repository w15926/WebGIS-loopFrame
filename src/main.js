import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/el'
import './utils/filter'
import * as echarts from 'echarts'
import * as methods from './utils/methods'
import { reqFile } from '@/utils/request'

// 导入config目录下所有的json文件
let obj = {}
let arr = []
if (process.env.NODE_ENV === 'development') arr = require.context('/public/static/config', true)
else arr = require.context('/static/config', true)
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

methods.registerComponents(require.context('./components/content', true))
methods.registerComponents(require.context('./components/public', true))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
