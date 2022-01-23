import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  AUTO_SIGN_IN,
} from '../constants/actionTypes'
import * as api from '../api'

export const signUp = (newUserData) => async (dispatch) => {
  try {
    const { data: user } = await api.signUp(newUserData)
    dispatch({ type: SIGN_UP, payload: user })
  } catch (error) {
    console.log(error)
  }
}

export const signIn = (userData) => async (dispatch) => {
  try {
    const { data: user } = await api.signIn(userData)
    dispatch({ type: SIGN_IN, payload: user })
  } catch (error) {
    console.log(error)
    alert('Incorrect email or password')
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
