const state = {
    config: null,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ2NzQ1MjYsInN1YiI6Im1vYXp6YW0xMzExMDIzQGdtYWlsLmNvbSJ9.jarjHT3k1d-jun_RKU23H-vf0obcxYUYaIfcHw7Xw5I', // Need to change after login
    base_url: 'http://3.111.140.40:8001/api/v1/',
    selected_deal: null, // to be used in settlement page
    selected_Settlement: null, // to be used in prefund page
};

const mutations = {
    SET_CONFIG(state, data) {
        state.config = data;
    },
    set_token: (state, payload) => {
        state.token = payload
    },
    set_selected_deal: (state, payload) => {
        state.selected_deal = payload
    },
    set_selected_Settlement: (state, payload) => {
        state.selected_Settlement = payload
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