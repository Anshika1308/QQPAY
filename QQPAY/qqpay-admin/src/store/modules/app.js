// const token = localStorage.getItem('token');
const state = {
    config: null,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxNzgxNzEsInN1YiI6ImFkbWluQGdtYWlsLmNvbSJ9.pEloeWIz5MiS68Ti_34M_Q9i1-Wlgs_595ctTIcuqZ4',
    base_url: 'http://3.111.140.40:8001/api/v1/',
    selected_deal_id: null, // to be used in settlement page
    selected_settlement_id: null, // to be used in prefund page
};

const mutations = {
    SET_CONFIG(state, data) {
        state.config = data;
    },
    set_token: (state, payload) => {
        state.token = payload
    },
    set_selected_deal_id: (state, payload) => {
        state.selected_deal_id = payload
    },
    set_selected_settlement_id: (state, payload) => {
        state.selected_settlement_id = payload
    },
};

const actions = {
    setConfig({ commit }, config) {
        commit("SET_CONFIG", config);
    },

};

export const app = {
    namespaced: true,
    state,
    mutations,
    actions,
}