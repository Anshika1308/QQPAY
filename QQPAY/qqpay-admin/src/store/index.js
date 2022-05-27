import Vue from 'vue'
import Vuex from 'vuex'
import partnerStore from "@/store/modules/partnerService";
import partnerCommissionStore from "@/store/modules/partnerCommission";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    partnerService: partnerStore,
    partnerCommission: partnerCommissionStore
  }
})
