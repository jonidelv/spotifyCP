import {
  SAVE_ERROR_DESCRIPTION,
  MAKE_LOGIN,
  MAKE_LOGOUT,
} from '../constants/actionTypes'
import { createAction } from 'redux-actions'

export const saveErrorDescription = createAction(SAVE_ERROR_DESCRIPTION)
export const makeLogin = createAction(MAKE_LOGIN)
export const makeLogout = createAction(MAKE_LOGOUT)
