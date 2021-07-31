const withTM = require('next-transpile-modules')(['react-syntax-highlighter'])

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: true
})
