/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ModeratorPage from './pages/ModeratorPage'
import AuthPage from './pages/AuthPage'
import decode from 'jwt-decode'
import { signOut, autoSignIn } from './actions/auth'
import { getChats } from './actions/chats'
import { validateRole } from './api'

const App = () => {
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (userData) {
      const decodedToken = decode(userData.token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(signOut())
      } else {
        validateUserData(userData)
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getChats())
    }
  }, [user])

  const validateUserData = async (userData) => {
    const { data: isValid } = await validateRole(userData.role)

    if (isValid) {
      dispatch(autoSignIn())
    } else {
      dispatch(signOut())
    }
  }

  if (user && user.role === 'user') return <UserPage />
  if (user && user.role === 'moderator') return <ModeratorPage />
  if (user && user.role === 'admin') return <AdminPage />

  return <AuthPage />
}

export default App
