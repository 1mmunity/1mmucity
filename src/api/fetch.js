import axios from 'axios'

/**
 * fetches thing
 * @param {object} options
 * @param {string} options.path
 * @param  {import('axios').AxiosRequestConfig} config
 * @returns 
 */
export function fetch(path, config) {
  const api_path = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API : process.env.NEXT_PUBLIC_DEV_API
  return axios.get(`${api_path}${path}`, config)
}

export default fetch
