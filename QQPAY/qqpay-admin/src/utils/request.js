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

    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ0Mzk1NjUsInN1YiI6ImphdGluQHNvZnRkZXZlbHMuY29tIn0.181UxbdnXxXg-J28lc8s4S296GHxXYP6pWcvMF9aCY0'
    // config.headers['Authorization'] = 'Bearer ' + authToken
    
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
