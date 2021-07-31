import axios from 'axios'

/**
 * Fetch own user for logging in
 * @param {string} credentials Credentials that will be sent.
 * @param {object} options Login options when fetching.
 * @param {('token' | 'login')} options.type Types for logging in. For login, email-password JSON must be encoded in base64.
 * @returns 
 */
export const fetchMe = async (credentials, options = {
  type: 'token'
}) => {
  const api_path = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API : process.env.NEXT_PUBLIC_DEV_API
  return axios.get(`${api_path}/users/@${options.type === 'token' ? 'me' : 'login'}`, {
    headers: {
      'Authorization': `user ${credentials}`
    }
  })
}

export default fetchMe
