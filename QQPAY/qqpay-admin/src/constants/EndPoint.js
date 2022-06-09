const APIS = {
  // AUTH
  LOGIN: `/user/token`,
  VERIFY: `/auth/jwt/verify/`,
  REFRESH: `/auth/jwt/refresh/`,
  CURRENT_USER_PROFILE: '/auth/users/me/',
  CURRENT_USER_CHANGE_PASSWORD: `/user/set_password/`,

  // PARTNER SERVICE
  GET_PARTNER_LIST: '/partner_details/get_partners',
  GET_PARTNER: `/partner_details/get_partner_by_id`,
  DELETE_PARTNER: '/partner_details/delete_partner_by_id',
  CREATE_PARTNER: '/partner_details/create-partner',
  UPDATE_PARTNER: '/partner_details/update_partner_by_id',

  //PARTNER COMMISSION SERVICE
  GET_PARTNER_COMMISSION_LIST: '/partner_commission/get_partner_commissions',
  GET_PARTNER_COMMISSION: '/partner_commission/get_partner_commission_by_id',
  DELETE_PARTNER_COMMISSION: '/partner_commission/delete_partner_commission_by_id',
  CREATE_PARTNER_COMMISSION: '/partner_commission/create-partner-commission',
  UPDATE_PARTNER_COMMISSION: `/partner_commission/update_partner_commission_by_id`
}

export default APIS
