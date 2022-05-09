import axios from "axios";
// import { APIService } from "../../../service/api";
// import urlConstant from "../../../constant/url.constant";

const state = {
  emailRegisterResponse: {},
  registerAccountResponse: {},
  loginResponse:{},
  forgotPassword: {},
  updatepwdResponse: {},
  language: '',
};

const mutations = {
  registerEmployer(state, payload) {
    switch (payload.type) {
      case "REGISTERING_EMPLOYER":
        state.registerResponse = {
          isRegistering: true,
          errorRegistering: false,
          emailRegisterResponse: {}
        };
        break;
      case "REGISTERED_EMPLOYER":
        state.registerResponse = {
          isRegistering: false,
          errorRegistering: false,
          emailRegisterResponse: payload.data
        };
        break;
    }
  },
  registerAccount(state, payload) {
    switch (payload.type) {
      case "REGISTERING_ACCOUNT":
        state.registerAccountResponse = {
          isRegistering: true,
          errorRegistering: false,
          resgisterResponse: {}
        };
        break;
      case "REGISTERED_ACCOUNT":
        state.registerAccountResponse = {
          isRegistering: false,
          errorRegistering: false,
          resgisterResponse: payload.data
        };
        break;
    }
  },
  loginAccount(state, payload) {
    switch (payload.type) {
      case "LOGING_ACCOUNT":
        state.loginResponse = {
          isLoging: true,
          errorRegistering: false,
          loginResponsePayload: {}
        };
        break;
      case "LOGIN_ACCOUNT":
        state.loginResponse = {
          isLoging: false,
          errorRegistering: false,
          loginResponsePayload: payload.data
        };
        break;
    }
  },
  resetPassword(state, payload) {
    switch (payload.type) {
      case "RESETING_PASSWORD":
        state.forgotPassword = {
          isLoging: true,
          errorRegistering: false,
          resetPasswordResponse: {}
        };
        break;
      case "RESET_PASSWORD":
        state.loginResponse = {
          isLoging: false,
          errorRegistering: false,
          resetPasswordResponse: payload.data
        };
        break;
    }
  },
  updatePassword(state, payload) {
    switch (payload.type) {
      case "UPDATING_PASSWORD":
        state.updatepwdResponse = {
          isLoging: true,
          errorRegistering: false,
          resetPasswordResponse: {}
        };
        break;
      case "UPDATE_PASSWORD":
        state.updatepwdResponse = {
          isLoging: false,
          errorRegistering: false,
          resetPasswordResponse: payload.data
        };
        break;
    }
  },
  updateLanguage(state, payload) {
    switch (payload.type) {
      case "UPDATE_LANGUAGE":
        state.language = payload.data;
        break;
    }
  },

};

const getters = {
  user_details: (state) => {
    return state.emailRegisterResponse;
  }
}

const actions = {
  async registerEmail({ commit }, _userDetails) {
    // commit("registerEmail", { type: "REGISTER_EMAIL" });
    const payloadData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    try {
      const fetchResponse = await fetch(`http://localhost:5000/api/v1/user/validate_email?User_Email=${_userDetails.User_Email}`, payloadData);
      const responseData = await fetchResponse.json();
      commit("registerEmployer", { type: "REGISTERED_EMPLOYER", data: responseData });
      return responseData
    } catch (e) {
      return e;
    }
  },
  async registerAccount({ commit }, _userDetails) {
    try {
      const responseData = await axios.put(`http://localhost:5000/api/v1/user/register`, _userDetails);
      console.log('respinse', responseData);
      commit("registerAccount", { type: "REGISTERED_ACCOUNT", data: responseData });
      return responseData
    } catch (e) {
      return e;
    }
  },
  async login({ commit }, _userDetails) {
    try {
      const responseData = await axios.post(`http://localhost:5000/api/v1/user/login`, _userDetails);
      commit("loginAccount", { type: "LOGIN_ACCOUNT", data: responseData });
      return responseData
    } catch (e) {
      console.log('store error', e);
      return e;
    }
  },
  async forgotPassword({ commit }, _userDetails) {
    try {
      const User_Email = _userDetails.User_Email;
      const responseData = await axios.get(`http://localhost:5000/api/v1/user/reset_password/?User_Email=${User_Email}`, User_Email);
      commit("resetPassword", { type: "RESET_PASSWORD", data: responseData });
      return responseData
    } catch (e) {
      console.log('error', e);
      return e;
    }
  },
  async updatePassword({ commit }, _userDetails) {
    try {
      const responseData = await axios.get(`http://localhost:5000/api/v1/user/update_password`, _userDetails);
      commit("updatePassword", { type: "UPDATE_PASSWORD", data: responseData });
      return responseData
    } catch (e) {
      console.log('error', e);
      return e;
    }
  },
  async ekycUpdate({ commit }, _kycDetails) {
    try {
      const token = localStorage.getItem('access_token');
      const responseData = await axios.post(`http://localhost:5000/api/v1/user/ekyc`, _kycDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        }
      });
      commit("updatePassword", { type: "UPDATE_PASSWORD", data: responseData });
      // return responseData
      console.log('ekyc', responseData);
    } catch (e) {
      console.log('error', e);
      return e;
    }
  },
  async setLanguage({ commit }, _langauge) {
    try {
      commit('updateLanguage', { type: "UPDATE_LANGUAGE", data: _langauge })
    } catch(e) {
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