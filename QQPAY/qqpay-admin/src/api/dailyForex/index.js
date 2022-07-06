import request from '@/utils/request'
const baseUrl = '8000/api/v1/forex_deal'





export function saveBusinus(data){
    return request({
        url: `${baseUrl}/add_business_forex_deal/`,
        method: 'post',
        data,
    })
}

export function getBusinusForex(){
    return request({
        url: `${baseUrl}/get-business-forex-deals-by-country/`,
        method: 'get',
    })
}

export function getAll(deal_type){
    return request({
        url: `${baseUrl}/get-forex-deals-by-country?deal_type=${deal_type}`,
        method: 'get',
    })
}

export function getAllafterSave(){
    return request({
        url: `${baseUrl}/all_forex_deals/`,
        method: 'get',
    })
}

export function getById(Id){
    return request({
        url: `${baseUrl}/get_forex_deal/` + Id,
        method: 'get',
    })
}

export function getPublishRateByCurrency(countryCode){
    return request({
        url: `${baseUrl}/get_publish_rate_country_wise/` + countryCode,
        method: 'get',
    })
}

export function getPayoutDetailList(){
    return request({
        url: `${baseUrl}/get_payout_details/`,
        method: 'get',
    })
}

export function save(data){
    return request({
        url: `${baseUrl}/add_forex_deal/`,
        method: 'post',
        data,
    })
}

export function update(data, Id){
    return request({
        url: `${baseUrl}/update_forex_deal/` + Id,
        method: 'put',
        data,
    })
}