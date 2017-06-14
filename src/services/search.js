import apiEndpoints from '../constants/apiEndpoints'
import api from './api'
import getRandomInt from '../utils/getRandomInt'

const searchService = {}

searchService.get = function(playlistNameLastCh) {
  let query = {
    q: `track:${playlistNameLastCh}`,
    type: 'track',
    limit: 50,
    offset: getRandomInt(),
  }
  return api.get(`${apiEndpoints.search}`, { params: query })
}

export default searchService
