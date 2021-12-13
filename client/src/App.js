import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminPage from './components/AdminPage'
import UserPage from './components/UserPage/UserPage'
import ModeratorPage from './components/ModeratorPage/ModeratorPage'
import AuthPage from './components/AuthPage/AuthPage'
import decode from 'jwt-decode'
import { signOut, autoSignIn } from './actions/auth'
import { getChats } from './actions/chats'

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
        dispatch(autoSignIn())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getChats())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (user && user.role === 'user') return <UserPage />
  if (user && user.role === 'moderator') return <ModeratorPage />
  if (user && user.role === 'admin') return <AdminPage />

  return <AuthPage />
}

export default App
