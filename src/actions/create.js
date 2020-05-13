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
import { siteName } from '../constants'

export const changeInputValue = createAction(CHANGE_INPUT_VALUE)
export const clearInputValue = createAction(CLEAR_INPUT_VALUE)
export const changePlaylistName = createAction(CHANGE_PLAYLIST_NAME)
export const errorFetching = createAction(ERROR_FETCHING)
export const pushNewTrack = createAction(PUSH_NEW_TRACK)
export const generatingPlaylist = createAction(GENERATING_PLAYLIST)
export const tracksBeingFetched = createAction(TRACKS_BEING_FETCHED)
export const isDeleting = createAction(IS_DELETING)

export function generatePlaylist(uris, playlistName) {
  return (dispatch, getState) => {
    let userId = ''
    let playlistUri = ''
    dispatch(generatingPlaylist(true))
    userService.get()
      .then((user) => {
        userId = user.id
        return playlistService.create(userId, {
        name: playlistName,
        description: `Generated with ${siteName}`,
      })})
      .then((playlist) => {
        playlistUri = playlist.external_urls.spotify
        return playlistService.addTracks(userId, playlist.id, {
        uris,
      })})
      .then(() => {
        window.open(playlistUri)
        dispatch(clearInputValue())
      })
      .catch((err) => {
        console.log('err', err)
        dispatch(errorFetching(`${err} try again later`))
      })
      .finally(() => {
        dispatch(generatingPlaylist(false))
     })
  }
}

export function fetchTracks(playlistName, idx) {
  return (dispatch, getState) => {
    dispatch(changePlaylistName(playlistName))
    const order = idx
    const playlistNameLastCh = playlistName.substr(-1)
    if (playlistNameLastCh && playlistNameLastCh !== ' ') {
      dispatch(tracksBeingFetched(true))
      getSearchService(playlistNameLastCh, dispatch)
        .then((track) => {
          let newTrack = {
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            duration: track.duration_ms,
            id: track.id,
            order,
            link: track.external_urls.spotify,
            uri: track.uri,
          }
          const state = getState()
          const playlistName = state.create.playlistName
          const tracks = state.create.tracks
          const matchOrder = playlistName[newTrack.order] === playlistNameLastCh
          const exitPushNewTrack = tracks.length >= playlistName.length

          if (playlistName && matchOrder && !exitPushNewTrack) {
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

async function getSearchService(playlistNameLastCh) {
  let track
  do {
    try {
      let response =  await searchService.get(playlistNameLastCh)
      track = response.tracks.items.find((track) => track.name[0] === playlistNameLastCh.toUpperCase())
    } catch (error) {
      console.log('error fetching track', error)
    }
  } while(!track)

  return track
}
