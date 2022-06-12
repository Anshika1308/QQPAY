const state = {
    config: null,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUwOTg2NjcsInN1YiI6InNhaWxlc2hrdXNoOTVAZ21haWwuY29tIn0.FKCgUwCkPfR1V60Th34PA80ToyX-dURw8ZZUScF0fYs', // Need to change after login
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