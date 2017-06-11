import { combineReducers } from 'redux'
import login from './login'
import create from './create'

const rootReducer = combineReducers({
  login,
  create,
})

export default rootReducer
