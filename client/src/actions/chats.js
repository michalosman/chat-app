import * as api from '../api'
import {
  FETCH_CHAT,
  FETCH_CHATS,
  CREATE_CHAT,
  DELETE_CHAT,
  LEAVE_GROUP,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} from '../constants/actionTypes'

export const fetchChats = () => async (dispatch) => {
  try {
    const { data } = await api.getChats()
    dispatch({ type: FETCH_CHATS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const fetchChat = (chatId) => async (dispatch) => {
  try {
    const { data } = await api.getChat(chatId)
    dispatch({ type: FETCH_CHAT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createPrivateChat = (email, socket) => async (dispatch) => {
  try {
    const { data } = await api.createPrivateChat(email)
    data.members.map((member) => socket.createChat(member._id))
    dispatch({ type: CREATE_CHAT, payload: data })
  } catch (error) {
    console.log(error)
    alert('User not found')
  }
}

export const createGroupChat = (name) => async (dispatch) => {
  try {
    const { data } = await api.createGroupChat(name)
    dispatch({ type: CREATE_CHAT, payload: data })
  } catch (error) {
    console.log(error)
    alert('Something went wrong. Try again.')
  }
}

export const leaveGroup = (userId, chatId, socket) => async (dispatch) => {
  try {
    await api.leaveGroup(chatId)
    socket.leaveGroup(userId)
    dispatch({ type: LEAVE_GROUP, payload: chatId })
  } catch (error) {
    console.log(error)
  }
}

export const deleteChat = (chatId, socket) => async (dispatch) => {
  try {
    const { data } = await api.getChat(chatId)
    await api.deleteChat(chatId)
    data.members.map((member) => socket.deleteChat(member._id))
    dispatch({ type: DELETE_CHAT, payload: chatId })
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = (chatId, message, socket) => async (dispatch) => {
  try {
    const { data } = await api.createMessage(chatId, message)
    socket.sendMessage(chatId, data.recentMessage)
    dispatch({ type: SEND_MESSAGE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const receiveMessage = (chatId, message) => {
  return { type: RECEIVE_MESSAGE, payload: { chatId, message } }
}
