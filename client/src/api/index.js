import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

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

export const getUsers = () => API.get('/users')
export const report = (userId) => API.patch(`/users/${userId}/report`)
export const warn = (userId) => API.patch(`/users/${userId}/warn`)
export const block = (userId) => API.patch(`/users/${userId}/block`)

export const getChats = () => API.get('/chats')
export const getChat = (id) => API.get(`/chats/${id}`)
export const addChat = (email) => API.post('/chats', { email })
export const deleteChat = (id) => API.delete(`/chats/${id}`)
export const addMessage = (id, text) => API.post(`/chats/${id}`, { text })
