import request from '@/utils/request'
const baseUrl = '8002/api/v1/partner_details'

export function getList(){
    return request({
        url: `${baseUrl}/get-partners-limited-field/`,
        method: 'get',
    })
}