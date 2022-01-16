import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'
import { signOut } from '../actions/auth'
import * as api from '../api'

const AdminPage = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data } = await api.getUsers()
    setUsers(data)
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
    .filter((user) => user.warningsCount >= 3 && !user.isBlocked)
    .sort((user1, user2) => user2.warningsCount - user1.warningsCount)
    .map((user) => (
      <Card
        key={user._id}
        variant="outlined"
        style={{ width: 300, maxWidth: '90%', marginBottom: '16px' }}
      >
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography>
            <strong>User:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Warnings:</strong> {user.warningsCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleBlock(e, user._id)}>Block</Button>
        </CardActions>
      </Card>
    ))

  const blockedUserCards = users
    .filter((user) => user.warningsCount >= 3 && user.isBlocked)
    .sort((user1, user2) => user2.warningsCount - user1.warningsCount)
    .map((user) => (
      <Card
        key={user._id}
        variant="outlined"
        style={{ width: 300, maxWidth: '90%', marginBottom: '16px' }}
      >
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography>
            <strong>User:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Warnings:</strong> {user.warningsCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleUnblock(e, user._id)}>Unblock</Button>
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
