import request from '@/utils/request'
const baseUrl = '8000/api/v1/complaince'

export function getAll() {
    return request({
        url: `${baseUrl}/all_value_scores/`,
        method: 'get',
    })
}

export function getParameterById(Id) {
    return request({
        url: `${baseUrl}/get_parameter/` + Id,
        method: 'get',
    })
}

export function getValueById(parameter_code, value_code) {
    return request({
        url: `${baseUrl}/get_value_score/` + parameter_code + `/` + value_code,
        method: 'get',
    })
}

export function getParameterList(data) {
    return request({
        url: `${baseUrl}/all_parameters/`,
        method: 'get',
        data,
    })
}

export function saveParameter(data) {
    return request({
        url: `${baseUrl}/add_parameter/`,
        method: 'post',
        data,
    })
}

export function updateParameter(data) {
    return request({
        url: `${baseUrl}/update_parameter/`,
        method: 'put',
        data,
    })
}

export function saveValue(data) {
    return request({
        url: `${baseUrl}/add_value_score/`,
        method: 'post',
        data,
    })
}

export function updateValue(data, parameter_code, parameter_val_code) {
    return request({
        url: `${baseUrl}/update_parameter_value_score/` + parameter_code + `/` + parameter_val_code,
        method: 'put',
        data,
    })
}

export function onDelete(parameter_code, parameter_val_code){
    return request({
        url: `${baseUrl}/delete_value_score/` + parameter_code + `/` + parameter_val_code,
        method: 'delete',
    })
}