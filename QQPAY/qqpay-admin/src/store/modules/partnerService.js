import APIS from "../../constants/EndPoint";
import {deleteApiData, getApiData, postApiData} from "@/helpers/AxiosInstance";

const partnerStore = {
  state: {
    partners: [],
  },

  actions: {
    async fetchPartners({commit}) {
      const response = await getApiData(APIS.GET_PARTNER_LIST);
      commit("setPartners", response.data.data)
      return response
    },
    async fetchPartner({commit}, id) {
      const response = await getApiData(`${APIS.GET_PARTNER}/${id}`);
      commit("setPartners", response.data.data)
      return response
    },
    async deletePartner({commit}, {vm, id}) {
      const response = await deleteApiData(`${APIS.DELETE_PARTNER}/${id}`);
      if (response.data.status_code === 200) {
        commit("removePartner", id)
        vm.$bvToast.toast(response.data.message, {
          title: "Success",
          variant: "danger",
          solid: true
        })
      }
    },
    async addPartner({commit}, {vm, data}) {
      const formData = JSON.stringify(data)
      const response = await postApiData(APIS.CREATE_PARTNER, formData);
      console.log(response)
      if (response.data.status_code === 200) {
        commit("addPartner", response.data)
        vm.$bvToast.toast('Partner Added Successfully', {
          title: "Success",
          variant: "success",
          solid: true
        })
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
    ),

    addPartner: (state, data) => (// eslint-disable-line no-unused-vars
      console.log(data)
    )
  },
  getters: {
    partnerLists: state => state.partners,
  }
}

export default partnerStore