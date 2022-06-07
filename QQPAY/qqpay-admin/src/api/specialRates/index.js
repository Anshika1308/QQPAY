import request from '@/utils/request'
const baseUrl = 'api/v1/special_rates'

export function getServiceChargeType(){
    return request({
        url: `${baseUrl}/get-all-service-charge-type/`,
        method: 'get',
    })
}

export function getPaymentMode(){
    return request({
        url: `${baseUrl}/get-payment-mode/`,
        method: 'get',
    })
}

export function getAll(){
    return request({
        url: `${baseUrl}/all/`,
        method: 'get',
    })
}

export function getById(Id){
    return request({
        url: `${baseUrl}/get-service-charge/` + Id,
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

export function save(data){
    return request({
        url: `${baseUrl}/add-service-charge/`,
        method: 'post',
        data,
    })
}

export function update(data){
    return request({
        url: `${baseUrl}/update-service-charge/`,
        method: 'put',
        data,
    })
}

export function exportToExcel(){
    return request({
        url: `${baseUrl}/currency/export`,
        method: 'get',
        responseType: 'blob',
    })
}