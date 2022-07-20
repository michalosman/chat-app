/* eslint-disable react-hooks/exhaustive-deps */
import decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { autoSignIn, signOut } from '../actions/auth'
import * as api from '../api'

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
        validateUser(userData)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const validateUser = async (userData) => {
    try {
      const { data } = await api.validateUser(userData)

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
