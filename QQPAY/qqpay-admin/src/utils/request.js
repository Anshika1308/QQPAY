import axios from "axios";
import { store } from "@/store";

const service = axios.create({
  withCredentials: true,
  timeout: 0, // no timeout
  headers: {
    "content-type": "application/json",
  },
});
const token = localStorage.getItem('token');
//request interceptor
service.interceptors.request.use(
  (config) => {
    config.baseURL = store.getters.config.VUE_APP_BASE_API;

    const authToken = token
    config.headers['Authorization'] = 'Bearer ' + authToken
    
    const port  = config.url.slice(0, 4);
    config.url = config.url.substring(4);
    config.baseURL = config.baseURL + port  

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
