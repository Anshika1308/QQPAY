import request from '@/utils/request'
const baseUrl = '8004/api/v1/special_rates_router'

export function getAll(){
    return request({
        url: `${baseUrl}/get_all_special_rates/`,
        method: 'get',
    })
}

export function getByCompany(Id){
    return request({
        url: `${baseUrl}/special_rates_by_company/` + Id,
        method: 'get',
    })
}

export function save(data){
    return request({
        url: `${baseUrl}/add_special_rates/`,
        method: 'post',
        data,
    })
}

export function update(data){
    return request({
        url: `${baseUrl}/update_special_rates/`,
        method: 'put',
        data,
    })
}
