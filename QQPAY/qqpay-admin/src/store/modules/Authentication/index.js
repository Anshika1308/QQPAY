import axios from "axios";
// import { store } from "../..";
// import { APIService } from "../../../service/api";
// import urlConstant from "../../../constant/url.constant";
const state = {
  loginResponse:{},
  updatepwdResponse: {},
  forgotResponse: {},
  validOTPResponse: {},
  base_url: process.env.VUE_APP_BASEURL,
  user_port: process.env.VUE_APP_USER_PORT,
};

const mutations = { 
  loginAccount(state, payload) {
    switch (payload.type) {
      case "LOGING_ACCOUNT":
        state.loginResponse = {
          isLoging: true,
          errorRegistering: false,
          loginData: {}
        };
        break;
      case "LOGIN_ACCOUNT":
        state.loginResponse = {
          isLoging: false,
          errorRegistering: false,
          loginData: payload.data
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
          password: {}
        };
        break;
      case "UPDATE_PASSWORD":
        state.updatepwdResponse = {
          isLoging: false,
          errorRegistering: false,
          password: payload.data
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

  updateProfile(state, payload) {
    switch (payload.type) {
      case "UPDATING_PROFILE":
        state.profileResponse = {
          isLoging: true,
          errorRegistering: false,
          profile: {}
        };
        break;
      case "UPDATE_PROFILE":
        state.profileResponse = {
          isLoging: false,
          errorRegistering: false,
          profile: payload.data
        };
        break;
    }
  },
  forgotPassowrd(state, payload) {
    switch (payload.type) {
      case "FORGOT_PASSWORD":
        state.forgotResponse = {
          isLoging: false,
          errorRegistering: false,
          data: payload.data
        };
        break;
    }
  },
  validOTP(state, payload) {
    switch (payload.type) {
      case "VALID_OTP":
        state.validOTPResponse = {
          isLoging: false,
          errorRegistering: false,
          data: payload.data
        };
        break;
    }
  },

};

const getters = {
  getLoginData: state => state.loginResponse,
}

const actions = {
  async login({ commit }, _userDetails) {
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(_userDetails),
    };
    try {
      const loginRes = await (await fetch(`${state.base_url}:${state.user_port}/api/v1/user/login`, option)).json()
      commit("loginAccount", { type: "LOGIN_ACCOUNT", data: loginRes });
      return loginRes;
    } catch (error) {
      console.log('err', error);
      return error;
    }
  },
  async forgotPassword({ commit }, _userDetails) {
    try {
      const User_Email = _userDetails.User_Email;
      const responseData = await axios.get(`${state.base_url}:${state.user_port}/api/v1/user/forget_password/get_otp/?email=${User_Email}`, User_Email);
      commit("forgotPassowrd", { type: "FORGOT_PASSWORD", data: responseData });
      return responseData;
    } catch (e) {
      return e;
    }
  },
  async validateOtpPassword({ commit }, _otpDetails) {
    try {
      const User_Email = _otpDetails.email;
      const otpValue = _otpDetails.otpPassword;
      const responseData = await axios.post(`${state.base_url}:${state.user_port}/api/v1/user/forget_password/confirm_otp?email=${User_Email}&otp=${otpValue}`, _otpDetails);
      commit("validOTP", { type: "VALID_OTP", data: responseData });
      return responseData
    } catch (e) {
      return e;
    }
  },
  async changePassword({ commit }, _userDetails) {
    console.log('userDetao', _userDetails)
    try {
      const responseData = await axios.post(`${state.base_url}:${state.user_port}/api/v1/user/forget_password`, _userDetails);
      commit("updatePassword", { type: "UPDATE_PASSWORD", data: responseData });
      console.log('store', responseData);
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