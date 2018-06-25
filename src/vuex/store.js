
/**
 * Created by 123 on 2018/5/22.
 */
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  userSig: '',
  token: '',
  sdk: '',
  videoRender: '',
  msg: '',
  memberVideo: '',
  loginName: '',
  renderShare: ''
}
const store = new Vuex.Store({state, mutations})
export default store
