import Vue from 'vue'
import Vuex from 'vuex'
import TokenModule from '../components/auth/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'auth': TokenModule
  }
})
