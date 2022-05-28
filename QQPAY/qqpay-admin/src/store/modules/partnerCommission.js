import APIS from "../../constants/EndPoint";
import {deleteApiData, getApiData, postApiData, putApiData} from "@/helpers/AxiosInstance";

const partnerCommissionStore = {
  state: {
    partnerCommissions: [],
  },

  actions: {
    async fetchPartnerCommission({commit}) {
      const response = await getApiData(APIS.GET_PARTNER_COMMISSION_LIST);
      commit("setPartnerCommission", response.data.data)
    },

    async fetchPartnerCommissionSingle({commit}, id) {
      console.log(commit, "id from cunt")
      return await getApiData(`${APIS.GET_PARTNER_COMMISSION}/${id}`);
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
      return response
    },
    async addPartnerCommission({commit}, {vm, data}) {
      const formData = JSON.stringify(data)
      const response = await postApiData(APIS.CREATE_PARTNER_COMMISSION, formData);
      if (response.data.status_code === 200) {
        commit("setAddPartnerCommission", response.data)
        vm.$bvToast.toast(response.data.message, {
          title: "Success",
          variant: "success",
          solid: true
        })
      } else {
        vm.$bvToast.toast('Something went wrong', {
          title: "Error",
          variant: "danger",
          solid: true
        })
      }
      return response
    },
    async updatePartnerCommission({commit}, {vm, data, id}) {
      const formData = JSON.stringify(data)
      const response = await putApiData(`${APIS.UPDATE_PARTNER_COMMISSION}/${id}`, formData)
      if (response.data.status_code === 200) {
        commit("setUpdatePartnerCommission", response.data)
        console.log(response, "response from service")
        vm.$bvToast.toast(response.data.message, {
          title: "Success",
          variant: "success",
          solid: true
        })
      } else {
        vm.$bvToast.toast('Something went wrong', {
          title: "Error",
          variant: "danger",
          solid: true
        })
      }
      return response
    }
  },
  mutations: {
    setPartnerCommission: (state, data) => (
      state.partnerCommissions = data
    ),
    setUpdatePartnerCommission: (state, data) => {
      let index = state.partnerCommissions.findIndex((item) => item.id == data.id);
      if (index > -1) {
        state.categories[index] = data;
      }
    },
    removePartnerCommission: (state, id) => (
      state.partnerCommissions.filter(commission => commission.id !== id),
        state.partnerCommissions.splice(commission => commission.id, 1),
        console.log(state.partnerCommissions, "state partners")
    ),

    setAddPartnerCommission: (state, data) => (// eslint-disable-line no-unused-vars
      this.state.partnerCommissions.push(data)
    )
  },
  getters: {
    partnerCommissionList: state => state.partnerCommissions,
  }
}

export default partnerCommissionStore