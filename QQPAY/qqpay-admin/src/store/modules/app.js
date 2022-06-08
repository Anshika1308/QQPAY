const state = {
    config: null,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ3NzE5NDcsInN1YiI6Im1vYXp6YW0xMzExMDIzQGdtYWlsLmNvbSJ9.Sgyhxjpi31PnxsO1BiW8yrns70WsRjJ__le2sJ9YTp0', // Need to change after login
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