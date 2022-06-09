import request from '@/utils/request'
const baseUrl = '5001/api/v1/business_user_kyc'

export function getAll(){
    return request({
        url: `${baseUrl}/get_all_companies/`,
        method: 'get',
    })
}