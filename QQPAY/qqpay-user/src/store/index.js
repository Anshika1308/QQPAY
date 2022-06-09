import Vue from 'vue';
import Vuex from 'vuex';
import Common from "./modules/common";
import Authentication from './modules/authentication/index';
import Remittee from './modules/Remittee/index';
import Transaction from './modules/transaction';
import onBehalf from './modules/onBehalf'
import remitte from './modules/remitte'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Common,
        Authentication,
        Remittee,
        Transaction,
        onBehalf,
        remitte
    },
});