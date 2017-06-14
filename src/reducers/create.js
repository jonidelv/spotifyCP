import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
  ERROR_FETCHING,
  CLEAR_ERROR_FETCHING,
  LOADING_TRACKS,
  TRACKS_LOADED,
  PUSH_NEW_TRACK,
  GENERATING_PLAYLIST,
} from '../constants/actionTypes'

const initialState = {
  inputValue: '',
  inputValueError: false,
  playlistName: '',
  fetchingTracks: false,
  generatingPlaylist: false,
  errorFetchingDescription: '',
  tracks: [],
}

export default function create(state = initialState, action) {
  switch (action.type) {

    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      }

    case CLEAR_INPUT_VALUE:
      return {
        ...state,
        inputValue: '',
        playlistName: '',
        tracks: [],
      }

    case CHANGE_PLAYLIST_NAME:
      return {
        ...state,
        playlistName: action.payload,
      }

    case ERROR_FETCHING:
      return {
        ...state,
        errorFetchingDescription: action.payload,
      }

    case CLEAR_ERROR_FETCHING:
      return {
        ...state,
        errorFetchingDescription: '',
      }

    case LOADING_TRACKS:
      return {
        ...state,
        fetchingTracks: true,
      }

    case TRACKS_LOADED:
      return {
        ...state,
        fetchingTracks: false,
      }

    case PUSH_NEW_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      }

    case GENERATING_PLAYLIST:
      return {
        ...state,
        generatingPlaylist: action.payload,
      }

    default:
      return state
  }
}
