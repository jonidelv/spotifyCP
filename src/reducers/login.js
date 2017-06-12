import {
  SAVE_ERROR_DESCRIPTION,
  MAKE_LOGIN,
  MAKE_LOGOUT,
  SAVE_USER_ID,
} from '../constants/actionTypes'

const initialState = {
  loggedIn: false,
  errorDescription: '',
  userId: '',
}

export default function login(state = initialState, action) {
  switch (action.type) {

    case SAVE_ERROR_DESCRIPTION:
      return {
        ...state,
        errorDescription: action.payload,
      }

    case MAKE_LOGIN:
      return {
        ...state,
        errorDescription: '',
        loggedIn: true,
      }

    case MAKE_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        errorDescription: '',
        userId: '',
      }

    case SAVE_USER_ID:
      return {
        ...state,
        userId: action.payload,
        errorDescription: '',
      }

    default:
      return state
  }
}
