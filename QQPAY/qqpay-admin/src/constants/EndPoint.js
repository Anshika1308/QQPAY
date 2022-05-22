const APIS = {
  // AUTH
  LOGIN: `/token/create/`,
  VERIFY: `/auth/jwt/verify/`,
  REFRESH: `/auth/jwt/refresh/`,
  CURRENT_USER_PROFILE: '/auth/users/me/',
  CURRENT_USER_CHANGE_PASSWORD: `/user/set_password/`,

  // PARTNER SERVICE
  GET_PARTNER_LIST: '/partner_details/get_partners',
  DELETE_PARTNER: '/partner_details/delete_partner_by_id',
  CREATE_PARTNER:'/partner_details/create-partner'
}

export default APIS
