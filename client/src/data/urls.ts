import config from './config'
const BACKEND_SERVER_URL  = config.apiDomain

export const fanSignUpUrl = `${BACKEND_SERVER_URL}/fans/signup`
export const loginUrl =`${BACKEND_SERVER_URL}/auth/login`



export const fetchAllCelebritiesUrl = `${BACKEND_SERVER_URL}/celebrities/`
