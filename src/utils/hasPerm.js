const perms = {
  pro: ['PRO', 'MODERATOR', 'ADMIN'],
  moderator: ['MODERATOR', 'ADMIN'],
  admin: ['ADMIN']
}

/**
 * 
 * @param {*} user 
 * @param {('PRO'|'MODERATOR'|'ADMIN')} perm 
 * @returns 
 */

export function userHas(user, perm) {
  const proRegex = new RegExp(perms.pro.join('|'))
  const modRegex = new RegExp(perms.moderator.join('|'))
  const adminRegex = new RegExp(perms.admin.join('|'))
  const { flags } = user
  if (!flags || flags.length === 0) return false
  const fl = flags.join('')
  switch(perm) {
  case 'PRO': {
    if (!fl.match(proRegex)) return false
    return true
  }
  case 'MODERATOR': {
    if (!fl.match(modRegex)) return false
    return true
  }
  case 'ADMIN': {
    if (!fl.match(adminRegex)) return false
    return true
  }
  default: return false
  }
}

export default userHas
