import axios from "axios";
// import { APIService } from "../../../service/api";
// import urlConstant from "../../../constant/url.constant";

const state = {
  remitteResponse: {},
};

const mutations = {
  registerRemitte(state, payload) {
    switch (payload.type) {
      case "REGISTERING_REMITTE":
        state.remitteResponse = {
          isRegistering: true,
          errorRegistering: false,
          remitteResponse: {}
        };
        break;
      case "REGISTERED_REMITTE":
        state.remitteResponse = {
          isRegistering: false,
          errorRegistering: false,
          remitteResponse: payload.data
        };
        break;
    }
  },
};

const getters = {
  remitte_details: (state) => {
    return state.remitteResponse;
  }
}

const actions = {
  async createRemitte({ commit }, _remitteeDetails) {
    console.log('remitteeDetails', _remitteeDetails);
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    try {
      const responseData = await axios.post(`http://localhost:4000/api/v1/remitte_details/create_remitte`, _remitteeDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        }
      });
      commit("registerRemitte", { type: "REGISTERED_REMITTE", data: responseData });
      return responseData
    } catch (e) {
      return e;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};