import utils from '../utils'
import cconfig from '../constants/cookies.json'
import cookies from 'js-cookie'
import fetch from '../api/fetch'

/**
 * For pages with protected routes, returns profile.
 * @param {Function} setProfile 
 * @returns profile
 */
export const useProtectedRoute = async () => {
  const eprofile = cookies.get(cconfig.profile)
  let dprofile
  try {
    dprofile = utils.encoder.decode(eprofile)
  } catch {
    dprofile = null
  }
  const profile = utils.isJSON(dprofile)
  if (!profile?.token) {
    window.location.href = '/login'
    return
  }
  const user = await fetch('/users/@me', {
    headers: {
      'Authorization': `user ${profile.token}`
    }
  })
  if (!user) {
    window.location.href = '/login'
    return
  }
  return user
}

export default useProtectedRoute
