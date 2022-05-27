import APIS from "../../constants/EndPoint";
import {deleteApiData, getApiData, postApiData} from "@/helpers/AxiosInstance";

const partnerCommissionStore = {
  state: {
    partnerCommissions: [],
  },

  actions: {
    async fetchPartnerCommission({commit}) {
      const response = await getApiData(APIS.GET_PARTNER_COMMISSION_LIST);
      commit("setPartnerCommission", response.data.data)
    },
    async deletePartnerCommission({commit}, {vm, id}) {
      const response = await deleteApiData(`${APIS.DELETE_PARTNER_COMMISSION}/${id}`);
      if (response.data.status_code === 200) {
        commit("removePartnerCommission", id)
        vm.$bvToast.toast('Partner Deleted Successfully', {
          title: "Success",
          variant: "danger",
          solid: true
        })
      } else {
        vm.$bvToast.toast('Unable to delete item', {
          title: "Success",
          variant: "success",
          solid: true
        })
      }
    },
    async addPartner({commit}, {vm, data}) {
      const formData = JSON.stringify(data)
      const response = await postApiData(APIS.CREATE_PARTNER, formData);
      if (response.data.status_code === 200) {
        commit("setPartnerCommission", response.data)
        vm.$bvToast.toast('Partner Added Successfully', {
          title: "Success",
          variant: "success",
          solid: true
        })
      } else {
        vm.$bvToast.toast('Something went wrong', {
          title: "Success",
          variant: "success",
          solid: true
        })
      }
    }
  },
  mutations: {
    setPartnerCommission: (state, data) => (
      state.partnerCommissions = data
    ),
    removePartnerCommission: (state, id) => (
      state.partnerCommissions.filter(commission => commission.id !== id),
        state.partnerCommissions.splice(commission => commission.id, 1),
        console.log(state.partnerCommissions, "state partners")
    ),

    addPartner: (state, data) => (// eslint-disable-line no-unused-vars
      console.log(data)
    )
  },
  getters: {
    partnerCommissionList: state => state.partnerCommissions,
  }
}

export default partnerCommissionStore