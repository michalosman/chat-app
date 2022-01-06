import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { getInitials } from '../../utils/functions'
import { signOut } from '../../actions/auth'
import { createChat } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'

const UserPanel = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const [openAddChat, setOpenAddChat] = useState(false)
  const [newChatEmail, setNewChatEmail] = useState('')
  const socket = useContext(SocketContext)

  const logOut = () => {
    dispatch(signOut())
  }

  const openAddChatDialog = () => {
    setOpenAddChat(true)
    setNewChatEmail('')
  }

  const closeAddChatDialog = () => {
    setOpenAddChat(false)
    setNewChatEmail('')
  }

  const handleAddChat = () => {
    if (!newChatEmail) return
    dispatch(createChat(newChatEmail, socket))
    closeAddChatDialog()
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderBottom={1}
      borderColor={'divider'}
    >
      <Box display="flex" alignItems="center">
        <Avatar
          src={`https://avatars.dicebear.com/api/initials/${getInitials(
            user.name
          )}.svg`}
        />
        <Typography
          variant="h5"
          textAlign="center"
          style={{ fontWeight: 'bold' }}
          ml={2}
        >
          Chats
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={openAddChatDialog}>
          <AddIcon />
        </IconButton>
        <Dialog
          open={openAddChat}
          onClose={closeAddChatDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Create new chat</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Enter user's email address.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              type="email"
              fullWidth
              variant="standard"
              value={newChatEmail}
              onChange={(e) => setNewChatEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddChatDialog}>Cancel</Button>
            <Button onClick={handleAddChat}>Add chat</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default UserPanel
