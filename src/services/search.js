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
  return api.get('/v1/search', { params: query })
}

export default searchService
