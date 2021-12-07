import React from 'react'
import { signOut } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { Box, Button } from '@mui/material'

const AdminPanel = () => {
  const dispatch = useDispatch()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Admin Panel</h1>
      <Button variant="contained" onClick={() => dispatch(signOut())}>
        Sign out
      </Button>
    </Box>
  )
}

export default AdminPanel
