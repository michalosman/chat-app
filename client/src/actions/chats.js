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
    const { data: chats } = await api.getChats()
    dispatch({ type: FETCH_CHATS, payload: chats })
  } catch (error) {
    console.log(error)
  }
}

export const fetchChat = (chatId) => async (dispatch) => {
  try {
    const { data: chat } = await api.getChat(chatId)
    dispatch({ type: FETCH_CHAT, payload: chat })
  } catch (error) {
    console.log(error)
  }
}

export const createPrivateChat = (email, socket) => async (dispatch) => {
  try {
    const { data: chat } = await api.createPrivateChat(email)
    chat.members.map((member) => socket.createChat(member.id))
    dispatch({ type: CREATE_CHAT, payload: chat })
  } catch (error) {
    console.log(error)
    alert('User not found')
  }
}

export const createGroupChat = (name) => async (dispatch) => {
  try {
    const { data: group } = await api.createGroupChat(name)
    dispatch({ type: CREATE_CHAT, payload: group })
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
    const { data: chat } = await api.getChat(chatId)
    await api.deleteChat(chatId)
    chat.members.map((member) => socket.deleteChat(member.id))
    dispatch({ type: DELETE_CHAT, payload: chatId })
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = (chatId, text, socket) => async (dispatch) => {
  try {
    const { data: message } = await api.createMessage(chatId, text)
    socket.sendMessage(chatId, message)
    dispatch({ type: SEND_MESSAGE, payload: { chatId, message } })
  } catch (error) {
    console.log(error)
  }
}

export const receiveMessage = (chatId, message) => {
  return { type: RECEIVE_MESSAGE, payload: { chatId, message } }
}
