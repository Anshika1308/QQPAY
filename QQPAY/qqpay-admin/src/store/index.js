import Vue from 'vue'
import Vuex from 'vuex'
import { app } from '@/store/modules/app'
import { getters } from './getters'
//import createPersistedState from 'vuex=persistedState'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugin: {
  },
  modules: {
    app,
  },
  getters,
})
