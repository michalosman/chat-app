import AddIcon from '@mui/icons-material/Add'
import GroupsIcon from '@mui/icons-material/Groups'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../../actions/auth'
import { createGroupChat, createPrivateChat } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'
import { getInitials } from '../../utils/functions'

function UserPanel() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const socket = useContext(SocketContext)

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [openAddPrivate, setOpenAddPrivate] = useState(false)
  const [newPrivateEmail, setNewPrivateEmail] = useState('')
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')

  const logOut = () => {
    dispatch(signOut())
  }

  const openAddMenu = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const closeAddMenu = () => {
    setMenuAnchor(null)
  }

  const openAddPrivateDialog = () => {
    setOpenAddPrivate(true)
    setNewPrivateEmail('')
    closeAddMenu()
  }

  const closeAddPrivateDialog = () => {
    setOpenAddPrivate(false)
    setNewPrivateEmail('')
  }

  const handleAddPrivate = () => {
    if (!newPrivateEmail) return
    dispatch(createPrivateChat(newPrivateEmail, socket))
    closeAddPrivateDialog()
  }

  const openAddGroupDialog = () => {
    setOpenAddGroup(true)
    setNewGroupName('')
    closeAddMenu()
  }

  const closeAddGroupDialog = () => {
    setOpenAddGroup(false)
    setNewGroupName('')
  }

  const handleAddGroup = () => {
    if (!newGroupName) return
    dispatch(createGroupChat(newGroupName))
    closeAddGroupDialog()
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderBottom={1}
      borderColor="divider"
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
        <IconButton onClick={openAddMenu}>
          <AddIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeAddMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={openAddPrivateDialog}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Private
          </MenuItem>
          <MenuItem onClick={openAddGroupDialog}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            Group
          </MenuItem>
        </Menu>
        <Dialog
          open={openAddPrivate}
          onClose={closeAddPrivateDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Create new private chat</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Enter user&apos;s email address.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              type="email"
              fullWidth
              variant="standard"
              value={newPrivateEmail}
              onChange={(e) => setNewPrivateEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddPrivateDialog}>Cancel</Button>
            <Button onClick={handleAddPrivate}>Add chat</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openAddGroup}
          onClose={closeAddGroupDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Create new group chat</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Enter group name.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              type="email"
              fullWidth
              variant="standard"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddGroupDialog}>Cancel</Button>
            <Button onClick={handleAddGroup}>Add group</Button>
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
