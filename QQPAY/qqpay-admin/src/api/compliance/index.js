import request from '@/utils/request'
const baseUrl = ':8000/api/v1/complaince'

export function getAll(){
    return request({
        url: `${baseUrl}/all_parameters/`,
        method: 'get',
    })
}

export function getById(Id){
    return request({
        url: `${baseUrl}/get_parameter/` + Id,
        method: 'get',
    })
}

export function search(data){
    return request({
        url: `${baseUrl}/get_parameter-name/`,
        method: 'get',
        data, 
    })
}

export function save(data){
    return request({
        url: `${baseUrl}/add_parameter/`,
        method: 'post',
        data,
    })
}

export function update(data){
    return request({
        url: `${baseUrl}/update_parameter/`,
        method: 'put',
        data,
    })
}