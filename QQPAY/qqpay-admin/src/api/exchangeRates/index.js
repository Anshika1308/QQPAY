import request from '@/utils/request'
const baseUrl = '8000/api/v1/exchangerates'

export function getAllCountry(){
    return request({
        url: `${baseUrl}/get-all_country_data/`,
        method: 'get',
    })
}