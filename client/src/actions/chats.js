import * as API from '../api'
import {
  GET_CHAT,
  GET_CHATS,
  ADD_CHAT,
  DELETE_CHAT,
  ADD_MESSAGE,
} from '../constants/actionTypes'

export const getChats = () => async (dispatch) => {
  try {
    const { data } = await API.getChats()
    dispatch({ type: GET_CHATS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getChat = (chatId) => async (dispatch) => {
  try {
    const { data } = await API.getChat(chatId)
    dispatch({ type: GET_CHAT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const addChat = (email) => async (dispatch) => {
  try {
    const { data } = await API.addChat(email)
    dispatch({ type: ADD_CHAT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteChat = (chatId) => async (dispatch) => {
  try {
    await API.deleteChat(chatId)
    dispatch({ type: DELETE_CHAT, payload: chatId })
  } catch (error) {
    console.log(error)
  }
}

export const addMessage = (text) => async (dispatch) => {
  try {
    const { data } = await API.addMessage(text)
    dispatch({ type: ADD_MESSAGE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
