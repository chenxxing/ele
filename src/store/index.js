import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import city from './modules/city'
import msite from './modules/msite'

//告诉vue使用Vuex
Vue.use(Vuex)

export default new Vuex.Store({
    module:{
        home,
        city,
        msite
    }
})