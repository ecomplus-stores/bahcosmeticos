const path = require('path')

process.env.NODE_ENV = 'production'
process.env.STOREFRONT_BASE_DIR = __dirname
process.env.STOREFRONT_BUNDLES_PATH = path.join(`${__dirname}/bundles.json`)

exports.handler = async (ev) => {
  if (/^\/(storefront|checkout)\.[^.]+\.(js|css)$/.test(ev.path)) {
    const [filename, , ext] = ev.path.split('.')
    return {
      statusCode: 301,
      headers: {
        Location: `${filename}.${ext}`
      }
    }
  }

  if (/\.(js|css|ico|png|gif|jpg|jpeg|webp|svg|woff|woff2|otf|ttf|eot)$/.test(ev.path)) {
    return {
      statusCode: 404,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=180'
      }
    }
  }

  return new Promise((resolve) => {
    let statusCode = 200
    const headers = {}

    const req = {
      url: ev.path.charAt(0) === '/' ? ev.path : `/${ev.path}`
    }

    const res = {
      set (header, value) {
        headers[header] = value
        return res
      },
      status (status) {
        statusCode = status
        return res
      },
      end () {
        resolve({ statusCode, headers })
        return res
      },
      send (body) {
        resolve({ statusCode, headers, body })
        return res
      }
    }

    const { ssr } = require('@ecomplus/storefront-renderer/functions/')
    ssr(req, res)
  })
}
