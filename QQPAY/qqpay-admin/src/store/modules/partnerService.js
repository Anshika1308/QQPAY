import APIS from "../../constants/EndPoint";
import {deleteApiData, getApiData, postApiData} from "../../helpers/AxiosInstance";

const partnerStore = {
  state: {
    partners: [],
  },

  actions: {
    async fetchPartners({commit}) {
      const response = await getApiData(APIS.GET_PARTNER_LIST);
      commit("setPartners", response.data.data)
    },
    async deletePartner({commit}, id) {
      const response = await deleteApiData(`${APIS.DELETE_PARTNER}/${id}`);
      if (response.data.status_code === 200) {
        commit("removePartner", id)
      }
    },
    async addPartner({commit}, data) {

      const formData = data

      const response = await postApiData(`${APIS.CREATE_PARTNER}/`, formData);
      console.log(response)
      if (response.data.status_code === 200) {
        commit("addPartner", response.data)
      }
    }
  },
  mutations: {
    setPartners: (state, users) => (
      state.partners = users
    ),
    removePartner: (state, id) => (
      state.partners.filter(partner => partner.agent_id !== id),
        state.partners.splice(partner => partner.agent_id, 1),
        console.log(state.partners)
    )
  },
  getters: {
    partnerLists: state => state.partners,
  }
}

export default partnerStore