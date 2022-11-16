import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/el'
import './utils/filter'
import * as echarts from 'echarts'
import * as config from '../public/config'
import * as methods from './utils/methods'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = new Vue()
Vue.prototype.$config = config.default
Vue.prototype.$methods = methods

methods.registerComponents(require.context('./components/content', true))
methods.registerComponents(require.context('./components/public', true))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
