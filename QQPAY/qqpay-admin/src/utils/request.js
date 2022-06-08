import axios from "axios";
import { store } from "@/store";

const service = axios.create({
  withCredentials: true,
  timeout: 0, // no timeout
  headers: {
    "content-type": "application/json",
  },
});

//request interceptor
service.interceptors.request.use(
  (config) => {
    config.baseURL = store.getters.config.VUE_APP_BASE_API;

    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ3NzI4NjgsInN1YiI6ImphdGluQHNvZnRkZXZlbHMuY29tIn0.3HwmEqu9dl5KYTgMsaQ9odt49DVuW6QHPpVtarQlJok'
    config.headers['Authorization'] = 'Bearer ' + authToken
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
service.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // forbidden
    if (error.response.status == 403) {
      //route to forbidden page
    }

    return Promise.reject(error.response.data)
  }
)

export default service;
