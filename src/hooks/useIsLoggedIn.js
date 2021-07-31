import utils from '../utils'
import cconfig from '../constants/cookies.json'
import cookies from 'js-cookie'
import fetch from '../api/fetch'

/**
 * Check for logged in dudes
 * @param {Function} setProfile 
 * @returns profile
 */
export const useIsLoggedIn = async () => {
  const eprofile = cookies.get(cconfig.profile)
  let dprofile
  try {
    dprofile = utils.encoder.decode(eprofile)
  } catch {
    dprofile = null
  }
  const profile = utils.isJSON(dprofile)
  if (!profile?.token) return false
  const user = await fetch('/users/@me', {
    headers: {
      'Authorization': `user ${profile.token}`
    }
  })
  if (!user) return false
  return user
}

export default useIsLoggedIn
