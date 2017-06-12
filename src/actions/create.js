import {
  CHANGE_INPUT_VALUE,
  CLEAR_INPUT_VALUE,
  CHANGE_PLAYLIST_NAME,
  ERROR_FETCHING,
  SAVE_USER_ID,
  CLEAR_ERROR_FETCHING,
} from '../constants/actionTypes'
import { createAction } from 'redux-actions'
import userService from '../services/user'

export const changeInputValue = createAction(CHANGE_INPUT_VALUE)
export const clearInputValue = createAction(CLEAR_INPUT_VALUE)
export const changePlaylistName = createAction(CHANGE_PLAYLIST_NAME)
export const errorFetching = createAction(ERROR_FETCHING)
export const saveUserId = createAction(SAVE_USER_ID)
export const clearErrorFetching = createAction(CLEAR_ERROR_FETCHING)

export function fetchUser() {
  return function(dispatch, getState) {
    userService.get()
      .then((user) => {
        dispatch(saveUserId(user.id))
        dispatch(clearErrorFetching())
      })
      .catch((err) => {
        dispatch(errorFetching(`${err} try again later`))
      })
  }
}
