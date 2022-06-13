import axios from "axios";
import { store } from "@/store";

const service = axios.create({
  withCredentials: true,
  timeout: 0, // no timeout
  headers: {
    "content-type": "application/json",
  },
});
// const token = localStorage.getItem('token');
//request interceptor
service.interceptors.request.use(
  (config) => {
    config.baseURL = store.getters.config.VUE_APP_BASE_API;
    // console.log("token in request",this.token);

    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxNzgxNzEsInN1YiI6ImFkbWluQGdtYWlsLmNvbSJ9.pEloeWIz5MiS68Ti_34M_Q9i1-Wlgs_595ctTIcuqZ4'
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
