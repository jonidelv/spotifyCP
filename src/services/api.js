import trae from 'trae'
import lscache from 'lscache'
import apiEndpoints from '../constants/apiEndpoints'

function errorMessage (err) {
  switch (err.status) {
    case 400:
      return err.message || 'Error 400: Bad Request'
    case 401:
      lscache.flush()
      window.location.href = '/'
      return err.message
    case 403:
      return 'Forbidden - The server understood the request, but is refusing to fulfill it.'
    case 404:
      return 'Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.'
    case 429:
      return 'Rate Limited'
    case 500: break
    case 502: break
    case 503:
      return `API Server Error ${err.status}`
    default:
      return `API Request Error ${err.status}`
  }
  return 'Unknown Error'
}

function tokenize (config) {
  const token = lscache.get('spotifyCPTkn')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

function throwError (err) {
  throw errorMessage(err)
}

function identity (res) {
  return res
}

const api = trae.create({
  baseUrl: apiEndpoints.base,
})

api.before(tokenize)
api.after(identity, throwError)

export default api
