import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  AUTO_SIGN_IN,
} from '../constants/actionTypes'
import * as API from '../api'

export const signUp = (newUserData) => async (dispatch) => {
  try {
    const { data } = await API.signUp(newUserData)
    dispatch({ type: SIGN_UP, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const signIn = (userData) => async (dispatch) => {
  try {
    const { data } = await API.signIn(userData)
    dispatch({ type: SIGN_IN, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

export const autoSignIn = () => {
  return {
    type: AUTO_SIGN_IN,
  }
}
