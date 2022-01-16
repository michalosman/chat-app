import axios from 'axios'
import decode from 'jwt-decode'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

API.interceptors.request.use((req) => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    const userToken = JSON.parse(userData).token

    req.headers.Authorization = `Bearer ${userToken}`

    const decodedToken = decode(userToken)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      window.location.reload(false)
      alert('Your token expired, please sign in again')
    }
  }
  return req
})

// USERS
export const getUsers = () => API.get('/users')
export const signUp = (newUserData) => API.post('users/signUp', newUserData)
export const signIn = (userData) => API.post('/users/signIn', userData)
export const validateUser = (userData) =>
  API.post('/users/validateUser', userData)
export const warnUser = (userId) => API.put(`/users/warn/${userId}`)
export const blockUser = (userId) => API.put(`/users/block/${userId}`)
export const unblockUser = (userId) => API.put(`/users/unblock/${userId}`)

// CHATS
export const getChats = () => API.get('/chats')
export const getChat = (chatId) => API.get(`/chats/${chatId}`)
export const createPrivateChat = (email) =>
  API.post('/chats/private', { email })
export const createGroupChat = (name) => API.post('/chats/group', { name })
export const createMessage = (chatId, text) =>
  API.post(`/chats/${chatId}`, { text })
export const addMember = (chatId, email) =>
  API.put(`/chats/${chatId}/add-member`, { email })
export const leaveGroup = (chatId) => API.put(`/chats/${chatId}/leave`)
export const deleteChat = (chatId) => API.delete(`/chats/${chatId}`)

// REPORTS
export const getReports = () => API.get('/reports')
export const createReport = (reportedUser, description) =>
  API.post(`/reports`, { reportedUser, description })
export const closeReport = (id) => API.put(`/reports/close/${id}`)
