import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
  ERROR_FETCHING,
  SAVE_USER_ID,
  CLEAR_ERROR_FETCHING,
  LOADING_TRACKS,
  TRACKS_LOADED,
  PUSH_NEW_TRACK,
  GENERATING_PLAYLIST,
} from '../constants/actionTypes'
import { createAction } from 'redux-actions'
import userService from '../services/user'
import searchService from '../services/search'

export const changeInputValue = createAction(CHANGE_INPUT_VALUE)
export const clearInputValue = createAction(CLEAR_INPUT_VALUE)
export const changePlaylistName = createAction(CHANGE_PLAYLIST_NAME)
export const errorFetching = createAction(ERROR_FETCHING)
export const saveUserId = createAction(SAVE_USER_ID)
export const clearErrorFetching = createAction(CLEAR_ERROR_FETCHING)
export const loadingTracks = createAction(LOADING_TRACKS)
export const tracksLoaded = createAction(TRACKS_LOADED)
export const pushNewTrack = createAction(PUSH_NEW_TRACK)
export const generatingPlaylist = createAction(GENERATING_PLAYLIST)


export function fetchUser() {
  return function(dispatch, getState) {
    dispatch(generatingPlaylist(true))
    userService.get()
      .then((user) => {
        dispatch(saveUserId(user.id))
        dispatch(clearErrorFetching())
        dispatch(generatingPlaylist(false))
      })
      .catch((err) => {
        dispatch(generatingPlaylist(false))
        dispatch(errorFetching(`${err} try again later`))
      })
  }
}

export function fetchTracks(playlistName) {
  return function(dispatch, getState) {
    //let tracks = getState().create.traks
    dispatch(changePlaylistName(playlistName))
    let playlistNameLastCh = playlistName.substr(-1)
    if (playlistNameLastCh && playlistNameLastCh !== ' ') {
      dispatch(loadingTracks())
      getSeacrchService(playlistNameLastCh)
        .then((track) => {
          let trackToSave = {
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            duration: track.duration_ms,
            id: track.id,
          }
          dispatch(clearErrorFetching())
          dispatch(pushNewTrack(trackToSave))
          dispatch(tracksLoaded())
        })
        .catch((err) => {
          dispatch(errorFetching(`${err} try again later`))
        })
    }
  }
}

async function getSeacrchService(playlistNameLastCh) {
  do {
    let response =  await searchService.get(playlistNameLastCh)
    var track = response.data.tracks.items.find((track) => track.name[0] === playlistNameLastCh.toUpperCase())
  } while(!track)
  return track
}
