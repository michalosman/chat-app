import React, { useState, useEffect } from 'react'
import { signOut } from '../actions/auth'
import { useDispatch } from 'react-redux'
import { Box, Button, IconButton } from '@mui/material'
import { getUsers, warn, block } from '../api'
import WarningIcon from '@mui/icons-material/Warning'
import BlockIcon from '@mui/icons-material/Block'
import { v4 as uuidv4 } from 'uuid'

const AdminPage = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data } = await getUsers()
    setUsers(data)
  }

  const userBoxes = users.map((user) => (
    <Box
      key={uuidv4()}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      mb={2}
      border={1}
    >
      {user.name}
      <Box ml={4}>
        <IconButton onClick={() => warn(user._id)}>
          <WarningIcon />
        </IconButton>
        <IconButton onClick={() => block(user._id)}>
          <BlockIcon />
        </IconButton>
      </Box>
    </Box>
  ))

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
      <Box mt={3}>{userBoxes}</Box>
    </Box>
  )
}

export default AdminPage
