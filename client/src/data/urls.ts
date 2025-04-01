import config from './config'
export const BACKEND_SERVER_URL  = config.apiDomain

export const fanSignUpUrl = `${BACKEND_SERVER_URL}/fans/signup`
export const loginUrl =`${BACKEND_SERVER_URL}/auth/login`
export const verifyEmailUrl = `${BACKEND_SERVER_URL}/auth/verify-email`;
export const resendVerificationCodeUrl = `${BACKEND_SERVER_URL}/resend-verification-code`;

export const fetchFanChatsUrl = `${BACKEND_SERVER_URL}/fans/chats`



export const fetchAllCelebritiesUrl = `${BACKEND_SERVER_URL}/celebrities/`


export const fetchFanJobsUrl =`${BACKEND_SERVER_URL}/jobs`
export const fetchJobDetailsUrl = `${BACKEND_SERVER_URL}/jobs`