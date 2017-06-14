import apiEndpoints from '../constants/apiEndpoints'
import api from './api'

const playlistService = {}

playlistService.create = function(userId, playlist) {
  return api.post(`${apiEndpoints.user}/${userId}/playlists`, playlist)
    .then((response) => response.data)
}

playlistService.addTracks = function(userId, playlistId, tracks) {
  return api.post(`${apiEndpoints.user}/${userId}/playlists/${playlistId}/tracks`, tracks)
    .then((response) => response.data)
}

export default playlistService
