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

const initialState = {
  inputValue: '',
  inputValueError: false,
  playlistName: '',
  fetchingTracks: false,
  generatingPlaylist: false,
  errorFetchingDescription: '',
  tracks: [],
  deleting: false,
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
        fetchingTracks: false,
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

    case TRACKS_BEING_FETCHED:
      return {
        ...state,
        fetchingTracks: action.payload,
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

    case IS_DELETING:
      return {
        ...state,
        deleting: action.payload,
      }

    default:
      return state
  }
}
