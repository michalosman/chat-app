import {
  CREATE_CHAT,
  DELETE_CHAT,
  FETCH_CHAT,
  FETCH_CHATS,
  LEAVE_GROUP,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from '../constants/actionTypes'

const chatsReducer = (chats = [], action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return action.payload
    case FETCH_CHAT:
      return chats.map((chat) =>
        chat.id === action.payload.id ? action.payload : chat
      )
    case CREATE_CHAT:
      return [...chats, action.payload]
    case DELETE_CHAT:
    case LEAVE_GROUP:
      return chats.filter((chat) => chat.id !== action.payload)
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
      return chats.map((chat) => {
        if (chat.id === action.payload.chatId) {
          chat.messages.push(action.payload.message)
          // eslint-disable-next-line no-param-reassign
          chat.recentMessage = action.payload.message
        }
        return chat
      })
    default:
      return chats
  }
}

export default chatsReducer
