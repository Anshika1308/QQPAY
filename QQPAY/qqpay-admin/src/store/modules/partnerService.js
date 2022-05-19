import APIS from "../../constants/EndPoint";
import { getApiData } from "../../helpers/AxiosInstance";

const partnerStore = {
  state: {
    partners: []
  },

  actions: {
    async fetchPartners({ commit }) {
      const response = await getApiData(APIS.GET_PARTNER_LIST);
      commit("setPartners", response.data.data)
    },
  },
  mutations: {
    setPartners: (state, users) => (
      state.partners = users
    ),
  },
  getters: {
    partnerLists: state => state.partners
  }
}

export default partnerStore