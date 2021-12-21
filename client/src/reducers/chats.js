import {
  FETCH_CHAT,
  FETCH_CHATS,
  CREATE_CHAT,
  DELETE_CHAT,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} from '../constants/actionTypes'

const chatsReducer = (chats = [], action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return action.payload
    case FETCH_CHAT:
      return chats.map((chat) =>
        chat._id === action.payload._id ? action.payload : chat
      )
    case CREATE_CHAT:
      return [...chats, action.payload]
    case DELETE_CHAT:
      return chats.filter((chat) => chat._id !== action.payload)
    case SEND_MESSAGE:
      return chats.map((chat) =>
        chat._id === action.payload._id ? action.payload : chat
      )
    case RECEIVE_MESSAGE:
      return chats.map((chat) => {
        if (chat._id === action.payload.chatId) {
          chat.messages.push(action.payload.message)
          chat.recentMessage = action.payload.message
        }
        return chat
      })
    default:
      return chats
  }
}

export default chatsReducer
