import axios from 'axios'

// https://www.npmjs.com/package/axios#example
export default class BaseDataService {
  constructor () {
    this.http = axios.create({ baseURL: process.env.VUE_APP_BASEURL })
    this.cancelToken = axios.CancelToken
    this.source = undefined
    const data = localStorage.getItem('vuex')
    const parseData = JSON.parse(data)
    if(parseData && parseData.auth && parseData.auth.token) {
      this.http.interceptors.request.use((config) => {
        config.headers['Authorization'] = 'Token ' + parseData.auth.token;
        return config;
      })
    }        
  }

  async getAll (url, DataItemType) {
    await this.makeCancelTokenSource()
    return this.fetch(url, DataItemType, this.source.token)
  }
}