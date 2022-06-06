const state = {
  config: null,
};

const mutations = {
  SET_CONFIG(state, data) {
    state.config = data;
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
