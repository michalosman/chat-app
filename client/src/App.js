/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ModeratorPage from './pages/ModeratorPage'
import LoginPage from './pages/LoginPage'
import useAuth from './hooks/useAuth'
import { getChats } from './actions/chats'
import LoadingPage from './pages/LoadingPage'
import { useDispatch } from 'react-redux'

const App = () => {
  const [user, loading] = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getChats())
    }
  }, [user])

  if (loading) return <LoadingPage />
  if (user && user.role === 'user') return <UserPage />
  if (user && user.role === 'moderator') return <ModeratorPage />
  if (user && user.role === 'admin') return <AdminPage />

  return <LoginPage />
}

export default App
