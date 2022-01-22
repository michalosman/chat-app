/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ModeratorPage from './pages/ModeratorPage'
import LoginPage from './pages/LoginPage'
import useAuth from './hooks/useAuth'
import LoadingPage from './pages/LoadingPage'
import { fetchChats } from './actions/chats'
import { SocketContext } from './context/Socket'

const App = () => {
  const [user, loading] = useAuth()
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const chats = useSelector((state) => state.chats)

  useEffect(() => {
    if (user) {
      if (user.role === 'user') {
        dispatch(fetchChats())
        socket.subscribeChats(user.id)
        chats.map((chat) => socket.subscribeChatMessages(chat.id))
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
