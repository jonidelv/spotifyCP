import api from './api'
const userService = {}

userService.get = function() {
  return api.get('/v1/me')
    .then((response) => response.data)
}

export default userService
