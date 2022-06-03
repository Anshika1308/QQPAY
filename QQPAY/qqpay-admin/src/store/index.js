import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQyMzUzMzUsInN1YiI6Im1vYXp6YW0xMzExMDIzQGdtYWlsLmNvbSJ9.XW-asm0yuQH_0I1B4nwyapNlZKG1OOZXjHAfP0bHvUk', // Need to change after login
        base_url: 'http://3.111.140.40:8001/api/v1/',
        selected_deal: null, // to be used in settlement page
        selected_Settlement: null, // to be used in prefund page

    },
    getters: {
        token: state => {
            return state.token;
        },
        base_url: state => {
            return state.base_url;
        },
        selected_deal: state => {
            return state.selected_deal;
        },
        selected_Settlement: state => {
            return state.selected_Settlement;
        }
    },
    mutations: {
        set_token: (state, payload) => {
            state.token = payload
        },
        set_selected_deal: (state, payload) => {
            state.selected_deal = payload
        },
        set_selected_Settlement: (state, payload) => {
            state.selected_Settlement = payload
        },
    },
    actions: {},
    modules: {}
})