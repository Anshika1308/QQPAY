import request from '@/utils/request'
const baseUrl = '8004/api/v1/special_rates_router'
const new_base_url = '8001/api/v1/country_setup'

export function getAll(){
    return request({
        url: `${baseUrl}/get_all_special_rates/`,
        method: 'get',
    })
}

export function getAllCountriesData(){
    return request({
        url: `${new_base_url}/get-all-countries`,
        method: 'get',
    })
}

export function getByCompany(Id){
    return request({
        url: `${baseUrl}/get_special_rates_by_company/` + Id,
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

export function saveCountry(data){
    return request({
        url: `${new_base_url}/new-country-data`,
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

export function updateCountry(data,id){
    return request({
        url: `${new_base_url}/update-country/${id}`,
        method: 'put',
        data,
    })
}
