/* eslint-disable react-hooks/exhaustive-deps */
import decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { validateUser } from '../api'
import { signOut, autoSignIn } from '../actions/auth'

const useAuth = () => {
  const user = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (userData) {
      const decodedToken = decode(userData.token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(signOut())
        setLoading(false)
      } else {
        validateUserData(userData)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const validateUserData = async (userData) => {
    try {
      const { data } = await validateUser(userData)

      if (data.isValid) {
        dispatch(autoSignIn())
      } else {
        dispatch(signOut())
      }
    } catch (error) {
      console.log('Provided credentials are incorrect')
    }
    setTimeout(() => setLoading(false), 300)
  }

  return [user, loading]
}

export default useAuth
