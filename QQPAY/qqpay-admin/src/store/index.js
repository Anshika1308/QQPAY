import Vue from 'vue'
import Vuex from 'vuex'
import partnerStore from "@/store/modules/partnerService";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    partnerService: partnerStore
  }
})
