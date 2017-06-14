import apiEndpoints from '../constants/apiEndpoints'
import api from './api'

const userService = {}

userService.get = function() {
  return api.get(`${apiEndpoints.me}`)
    .then((response) => response.data)
}

export default userService
