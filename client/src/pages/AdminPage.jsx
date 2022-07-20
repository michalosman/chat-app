import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { signOut } from '../actions/auth'
import * as api from '../api'

function AdminPage() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data: users } = await api.getUsers()
    setUsers(users)
  }

  const handleBlock = async (e, userId) => {
    await api.blockUser(userId)
    fetchUsers()
  }

  const handleUnblock = async (e, userId) => {
    await api.unblockUser(userId)
    fetchUsers()
  }

  const userCards = users
    .filter((user) => user.warnings >= 3 && !user.isBlocked)
    .sort((user1, user2) => user2.warnings - user1.warnings)
    .map((user) => (
      <Card
        key={user.id}
        variant="outlined"
        style={{ width: 300, maxWidth: '90%', marginBottom: '16px' }}
      >
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography>
            <strong>User:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Warnings:</strong> {user.warnings}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleBlock(e, user.id)}>Block</Button>
        </CardActions>
      </Card>
    ))

  const blockedUserCards = users
    .filter((user) => user.warnings >= 3 && user.isBlocked)
    .sort((user1, user2) => user2.warnings - user1.warnings)
    .map((user) => (
      <Card
        key={user.id}
        variant="outlined"
        style={{ width: 300, maxWidth: '90%', marginBottom: '16px' }}
      >
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography>
            <strong>User:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Warnings:</strong> {user.warnings}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleUnblock(e, user.id)}>Unblock</Button>
        </CardActions>
      </Card>
    ))

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        width="100%"
      >
        <Typography variant="h5">
          <strong>Admin Panel</strong>
        </Typography>
        <Button variant="contained" onClick={() => dispatch(signOut())}>
          Sign out
        </Button>
      </Box>
      {userCards.length > 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Typography variant="h5" mb={2}>
            <strong>Users to block</strong>
          </Typography>
          {userCards}
        </Box>
      ) : (
        ''
      )}
      {blockedUserCards.length > 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" mb={2}>
            <strong>Blocked users</strong>
          </Typography>
          {blockedUserCards}
        </Box>
      ) : (
        ''
      )}
    </>
  )
}

export default AdminPage
