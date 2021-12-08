import {
  GET_CHAT,
  GET_CHATS,
  ADD_CHAT,
  DELETE_CHAT,
  ADD_MESSAGE,
} from '../constants/actionTypes'

const chatsReducer = (chats = [], action) => {
  switch (action.type) {
    case GET_CHATS:
      return action.payload
    case GET_CHAT:
      return chats.map((chat) =>
        chat._id === action.payload._id ? action.payload : chat
      )
    case ADD_CHAT:
      return [...chats, action.payload]
    case DELETE_CHAT:
      return chats.filter((chat) => chat._id !== action.payload)
    case ADD_MESSAGE:
      return chats.map((chat) =>
        chat._id === action.payload._id ? action.payload : chat
      )
    default:
      return chats
  }
}

export default chatsReducer
