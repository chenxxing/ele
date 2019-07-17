// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/icon/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['content-type'] = 'application/json'
axios.interceptors.request.use((config) => {
  console.log(config,'提出拦截')
  var Token = 'AAAAAAAAAAAAAAAFFFFFFFF';//Token;
  if(Token){
    config.headers.Authorization = Token
  }
  return config;
})

axios.interceptors.response.use((response) => {
  console.log(response,'响应拦截')
  if(response.data.info){

  }
  return response
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
