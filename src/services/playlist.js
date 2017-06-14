import api from './api'
const playlistService = {}

playlistService.create = function(userId, playlist) {
  return api.post(`/v1/users/${userId}/playlists`, playlist)
    .then((response) => response.data)
}

playlistService.addTracks = function(userId, playlistId, tracks) {
  return api.post(`/v1/users/${userId}/playlists/${playlistId}/tracks`, tracks)
    .then((response) => response.data)
}

export default playlistService
