import {
  AUTO_SIGN_IN,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from '../constants/actionTypes'

const authReducer = (auth = null, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      if (!action.payload.token) return null
      localStorage.setItem('userData', JSON.stringify(action.payload))
      return action.payload
    case SIGN_OUT:
      localStorage.clear()
      return null
    case AUTO_SIGN_IN:
      return JSON.parse(localStorage.getItem('userData'))
    default:
      return auth
  }
}

export default authReducer
