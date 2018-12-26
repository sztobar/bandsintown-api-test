const withTypescript = require('@zeit/next-typescript')
const withCss = require('@zeit/next-css')

module.exports = withTypescript(withCss({
  distDir: './dist/.next',
  webpack(config, options) {
    return config
  }
}))