const withTM = require('next-transpile-modules')(['react-syntax-highlighter'])

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  future: {
    webpack5: true
  }
})
