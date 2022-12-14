import Vue from 'vue'
import Vuex from 'vuex'
import { app } from '@/store/modules/app'
import { getters } from './getters'
//import createPersistedState from 'vuex=persistedState'
import partnerStore from "@/store/modules/partnerService";
import partnerCommissionStore from "@/store/modules/partnerCommission";
import Authentication from "./modules/Authentication/index";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        app,
        partnerService: partnerStore,
        partnerCommission: partnerCommissionStore,
        AuthenticationService: Authentication
    },
    getters,
})