import { combineReducers } from 'redux'
import authReducer from './auth'
import chatsReducer from './chats'

const rootReducer = combineReducers({ auth: authReducer, chats: chatsReducer })

export default rootReducer
