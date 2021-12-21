import * as API from '../api'
import {
  FETCH_CHAT,
  FETCH_CHATS,
  CREATE_CHAT,
  DELETE_CHAT,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} from '../constants/actionTypes'

export const fetchChats = () => async (dispatch) => {
  try {
    const { data } = await API.fetchChats()
    dispatch({ type: FETCH_CHATS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const fetchChat = (chatId) => async (dispatch) => {
  try {
    const { data } = await API.fetchChat(chatId)
    dispatch({ type: FETCH_CHAT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createChat = (email) => async (dispatch) => {
  try {
    const { data } = await API.createChat(email)
    dispatch({ type: CREATE_CHAT, payload: data })
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

export const sendMessage = (chatId, message, socket) => async (dispatch) => {
  try {
    const { data } = await API.sendMessage(chatId, message)
    // Socket is here because we must ensure that message is saved to DB
    socket.sendMessage(chatId, data.recentMessage)
    dispatch({ type: SEND_MESSAGE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const receiveMessage = (chatId, message) => {
  return { type: RECEIVE_MESSAGE, payload: { chatId, message } }
}
