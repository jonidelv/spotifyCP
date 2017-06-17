import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
  ERROR_FETCHING,
  PUSH_NEW_TRACK,
  GENERATING_PLAYLIST,
  TRACKS_BEING_FETCHED,
  IS_DELETING,
} from '../constants/actionTypes'
import { createAction } from 'redux-actions'
import userService from '../services/user'
import playlistService from '../services/playlist'
import searchService from '../services/search'
import sites from '../constants/sites'

export const changeInputValue = createAction(CHANGE_INPUT_VALUE)
export const clearInputValue = createAction(CLEAR_INPUT_VALUE)
export const changePlaylistName = createAction(CHANGE_PLAYLIST_NAME)
export const errorFetching = createAction(ERROR_FETCHING)
export const pushNewTrack = createAction(PUSH_NEW_TRACK)
export const generatingPlaylist = createAction(GENERATING_PLAYLIST)
export const tracksBeingFetched = createAction(TRACKS_BEING_FETCHED)
export const isDeleting = createAction(IS_DELETING)

export function generatePlaylist() {
  return (dispatch, getState) => {
    let tracks = getState().create.tracks
    let userId = ''
    let playlistUri = ''
    dispatch(generatingPlaylist(true))
    userService.get()
      .then((user) => {
        userId = user.id
        return playlistService.create(userId, {
        name: getState().create.playlistName,
        description: `Playlist generated with ${sites.prod}`,
      })})
      .then((playlist) => {
        playlistUri = playlist.external_urls.spotify
        return playlistService.addTracks(userId, playlist.id, {
        uris: tracks.sort((a, b) => (a.order - b.order)).map((track) => track.uri),
      })})
      .then(() => window.location.replace(playlistUri))
      .catch((err) => {
        dispatch(generatingPlaylist(false))
        dispatch(errorFetching(`${err} try again later`))
      })
  }
}

export function fetchTracks(playlistName, idx) {
  return (dispatch, getState) => {
    dispatch(changePlaylistName(playlistName))
    let playlistNameLastCh = playlistName.substr(-1)
    if (playlistNameLastCh && playlistNameLastCh !== ' ') {
      dispatch(tracksBeingFetched(true))
      _getSeacrchService(playlistNameLastCh, dispatch)
        .then((track) => {
          let playlistName = getState().create.playlistName
          let tracks = getState().create.tracks
          let newTrack = {
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            duration: track.duration_ms,
            id: track.id,
            order: idx,
            link: track.external_urls.spotify,
            uri: track.uri,
          }
          let matchOrder = playlistName[newTrack.order] === playlistNameLastCh
          let exitPushNewTrack = tracks.length >= playlistName.length
          if (playlistName && !exitPushNewTrack && matchOrder) {
            dispatch(pushNewTrack(newTrack))
          }
          dispatch(errorFetching(''))
        })
        .catch((err) => {
          dispatch(errorFetching(`${err} try again later`))
        })
    }
  }
}

async function _getSeacrchService(playlistNameLastCh) {
  do {
    let response =  await searchService.get(playlistNameLastCh)
    var track = response.data.tracks.items.find((track) => track.name[0] === playlistNameLastCh.toUpperCase())
  } while(!track)
  return track
}
