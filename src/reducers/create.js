import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
  ERROR_FETCHING,
  CLEAR_ERROR_FETCHING,
} from '../constants/actionTypes'

const tracks = [{
  title: 'never stop',
  artist: 'asdek',
  album: 'never stop',
  duration: 222200,
}, {
  title: 'never stop',
  artist: 'asdek',
  album: 'never stop',
  duration: 222200,
}, {
  title: 'never stop',
  artist: 'asdek',
  album: 'never stop',
  duration: 224210,
}, {
  title: 'never stop',
  artist: 'asdek',
  album: 'never stop',
  duration: 292200,
}, {
  title: 'never stop',
  artist: 'asdek',
  album: 'never stop',
  duration: 222200,
}]

const initialState = {
  inputValue: '',
  inputValueError: false,
  playlistName: '',
  fetchingTracks: false,
  generatingPlaylist: false,
  errorFetchingDescription: '',
  tracks,
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

    default:
      return state
  }
}
