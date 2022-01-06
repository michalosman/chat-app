/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ModeratorPage from './pages/ModeratorPage'
import LoginPage from './pages/LoginPage'
import useAuth from './hooks/useAuth'
import { fetchChats } from './actions/chats'
import LoadingPage from './pages/LoadingPage'
import { useDispatch } from 'react-redux'
import { SocketContext } from './context/Socket'

const App = () => {
  const [user, loading] = useAuth()
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (user) {
      dispatch(fetchChats())
      if (user.role === 'user') {
        socket.subscribeOwnChats(user._id)
      }
    }
  }, [user])

  if (loading) return <LoadingPage />
  if (!user || user?.isBlocked) return <LoginPage />
  if (user && user.role === 'user') return <UserPage />
  if (user && user.role === 'moderator') return <ModeratorPage />
  if (user && user.role === 'admin') return <AdminPage />
}

export default App
