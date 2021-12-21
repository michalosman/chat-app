import React, { useState, useEffect } from 'react'
import { signOut } from '../actions/auth'
import { useDispatch } from 'react-redux'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { fetchUsers, blockUser } from '../api'
import BlockIcon from '@mui/icons-material/Block'

const AdminPage = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const { data } = await fetchUsers()
    setUsers(data)
  }

  const handleBlock = async (userId) => {
    await blockUser(userId)
    window.location.reload(false)
  }

  const userBoxes = users.map((user) =>
    user.warningsCount >= 3 && !user.isBlocked ? (
      <Box
        key={user._id}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        mb={2}
        borderRadius="10px"
        boxShadow={3}
        style={{ width: 500 }}
      >
        <Typography>
          <strong>User:</strong> {user.name}
        </Typography>
        <Typography>
          <strong>Warnings:</strong> {user.warningsCount}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleBlock(user._id)}
        >
          Block
        </Button>
      </Box>
    ) : (
      ''
    )
  )

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
