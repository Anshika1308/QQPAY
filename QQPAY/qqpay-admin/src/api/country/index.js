import request from '@/utils/request'
const baseUrl = 'api/v1/service_charge'

export function getById(Id){
    return request({
        url: `${baseUrl}/get/` + Id,
        method: 'get',
    })
}

export function search(data){
    return request({
        url: `${baseUrl}/search/`,
        method: 'post',
        data, 
    })
}

export function getAll(){
    return request({
        url: `${baseUrl}/get-all-country/`,
        method: 'get',
    })
}

export function exportToExcel(){
    return request({
        url: `${baseUrl}/currency/export`,
        method: 'get',
        responseType: 'blob',
    })
}