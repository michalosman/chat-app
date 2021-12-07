import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminPanel from './components/AdminPanel/AdminPanel'
import Chat from './components/Chat/Chat'
import ModeratorPanel from './components/ModeratorPanel/ModeratorPanel'
import Auth from './components/Auth/Auth'
import decode from 'jwt-decode'
import { signOut, autoSignIn } from './actions/auth'

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

  if (user && user.role === 'user') return <Chat />
  if (user && user.role === 'moderator') return <ModeratorPanel />
  if (user && user.role === 'admin') return <AdminPanel />

  return <Auth />
}

export default App
