import cconfig from '../constants/cookies.json'
import cookies from 'react-cookies'
import encoder from '../utils/encoder'

export function setCookieProfile(profile) {
  if (!profile) {
    cookies.remove(cconfig.profile)
    return
  }
  const cprofile = encoder.encode(JSON.stringify(profile))
  cookies.save(cconfig.profile, cprofile)
  return
}

export default setCookieProfile
