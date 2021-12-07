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
