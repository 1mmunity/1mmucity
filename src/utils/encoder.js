export const encoder = {
  encode: (str) => {
    const b64 = new Buffer.from(str, 'utf-8')
    return b64.toString('base64')
  },
  decode: (b64) => {
    const str = new Buffer.from(b64, 'base64')
    return str.toString('utf-8')
  }
}

export default encoder
