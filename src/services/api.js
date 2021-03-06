import axios from 'axios'
import lscache from 'lscache'
import { apiEndpoints } from '../constants'
import { storageKey } from '../constants'

function errorMessage(err = {}) {
  if (err.status === 401) {
    lscache.flush()
    window.location.href = '/'
    return err.message
  }

  return err.message
}

const api = axios.create({
  baseURL: apiEndpoints.base,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const data = lscache.get(storageKey)
    const token = data && data.token
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.common.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) =>
    // Do something with request error
    Promise.reject(error),
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => (
    // Do something with response data
    response.data
),
  (error) =>
    // Do something with response error
    Promise.reject(errorMessage(error)),
)

export default api
