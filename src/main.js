// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.less'
import '../static/css/iconfont.css'
import store from './vuex/store'
import axios from 'axios'
import '@/../static/js/iLiveSDK'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
process.env.NODE_ENV === 'development' && (Vue.prototype.$ajax.defaults.baseURL = '/api')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
