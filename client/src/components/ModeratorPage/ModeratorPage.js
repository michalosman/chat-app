import React from 'react'
import { signOut } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { Box, Button } from '@mui/material'

const ModeratorPage = () => {
  const dispatch = useDispatch()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Moderator Panel</h1>
      <Button variant="contained" onClick={() => dispatch(signOut())}>
        Sign out
      </Button>
    </Box>
  )
}

export default ModeratorPage
