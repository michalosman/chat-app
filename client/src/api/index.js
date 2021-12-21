import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userData')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userData')).token
    }`
  }
  return req
})

export const signUp = (newUserData) => API.post('users/signUp', newUserData)
export const signIn = (userData) => API.post('/users/signIn', userData)

export const fetchUsers = () => API.get('/users')
export const warnUser = (userId) => API.patch(`/users/${userId}/warn`)
export const blockUser = (userId) => API.patch(`/users/${userId}/block`)
export const validateUser = (userData) =>
  API.post('/users/validateUser', userData)

export const fetchChats = () => API.get('/chats')
export const fetchChat = (chatId) => API.get(`/chats/${chatId}`)
export const createChat = (email) => API.post('/chats', { email })
export const deleteChat = (chatId) => API.delete(`/chats/${chatId}`)
export const sendMessage = (chatId, text) =>
  API.post(`/chats/${chatId}`, { text })

export const getReports = () => API.get('/reports')
export const reportUser = (reportedUser, description) =>
  API.post(`/reports`, { reportedUser, description })
