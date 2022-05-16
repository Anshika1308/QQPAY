const partnerStore = {
  state: {
    partners: ['test test']
  },
  mutations: {
    LOAD_PARTNER_LIST(state, data) {
      state.partners = data
    }
  },
  actions: {
    getPartnerList({commit}) {
      // const res = await axios.get(API_ENDPOINTS.PAGES);
      commit("LOAD_PARTNER_LIST", ['partner one', 'partner two']);
    },
  },
  getters: {}
}

export default partnerStore