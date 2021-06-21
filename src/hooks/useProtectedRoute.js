import isJSON from '../utils/isJSON'
import cookies from 'js-cookie'
import {
  profile as cprofile
} from '../constants/cookies.json'

/**
 * For pages with protected routes, returns setting the state hook to profile.
 * @param {Function} setProfile 
 * @returns setProfile(profile)
 */
export const useProtectedRoute = (setProfile) => {
  const eprofile = cookies.get(cprofile)
  const profile = isJSON(eprofile)
  if (!profile) return window.location.href = '/'
  return setProfile?.(profile)
}

export default useProtectedRoute
