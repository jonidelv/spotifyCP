import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
} from '../constants/actionTypes'
import { createAction } from 'redux-actions'

export const changeInputValue = createAction(CHANGE_INPUT_VALUE)
export const clearInputValue = createAction(CLEAR_INPUT_VALUE)
export const changePlaylistName = createAction(CHANGE_PLAYLIST_NAME)
