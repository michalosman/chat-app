import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material'
import { deleteChat, leaveGroup } from '../../../actions/chats'
import * as api from '../../../api'
import { SocketContext } from '../../../context/Socket'

const GroupMenu = ({ chat }) => {
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const user = useSelector((state) => state.auth)

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [openAddMember, setOpenAddMember] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [openDeleteGroup, setOpenDelete] = useState(false)
  const [openLeaveGroup, setOpenLeaveGroup] = useState(false)

  const handleAddMember = async () => {
    if (!newMemberEmail) return

    try {
      const { data } = await api.addMember(chat.id, newMemberEmail)
      data.members.map((member) => socket.addMember(member.id))
      closeAddMemberDialog()
      setNewMemberEmail('')
    } catch (error) {
      alert('User not found or already exists')
    }
  }

  const handleDelete = () => {
    dispatch(deleteChat(chat.id, socket))
    closeDeleteGroupDialog()
  }

  const handleLeaveGroup = () => {
    dispatch(leaveGroup(user.id, chat.id, socket))
    closeLeaveGroupDialog()
  }

  const openChatMenu = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const closeChatMenu = () => {
    setMenuAnchor(null)
  }

  const openAddMemberDialog = () => {
    setOpenAddMember(true)
    closeChatMenu()
  }

  const closeAddMemberDialog = () => {
    setOpenAddMember(false)
    closeChatMenu()
  }

  const openDeleteGroupDialog = () => {
    setOpenDelete(true)
    closeChatMenu()
  }
  const closeDeleteGroupDialog = () => {
    setOpenDelete(false)
    closeChatMenu()
  }

  const openLeaveGroupDialog = () => {
    setOpenLeaveGroup(true)
    closeChatMenu()
  }

  const closeLeaveGroupDialog = () => {
    setOpenLeaveGroup(false)
    closeChatMenu()
  }

  if (user.id !== chat.ownerId) {
    return (
      <Box display="flex">
        <IconButton onClick={openChatMenu}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeChatMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={openLeaveGroupDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Leave
          </MenuItem>
        </Menu>
        <Dialog
          open={openLeaveGroup}
          onClose={closeLeaveGroupDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Leave group</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Are you sure want to leave this group?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLeaveGroupDialog}>No</Button>
            <Button onClick={handleLeaveGroup}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  return (
    <Box display="flex">
      <IconButton onClick={openChatMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeChatMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={openAddMemberDialog}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          Add member
        </MenuItem>
        <MenuItem onClick={openDeleteGroupDialog}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={openAddMember}
        onClose={closeAddMemberDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Add new member</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Enter new member's email address.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            type="email"
            fullWidth
            variant="standard"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddMemberDialog}>Cancel</Button>
          <Button onClick={handleAddMember}>Add member</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteGroup}
        onClose={closeDeleteGroupDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Do you want to delete this chat?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Notice: This action is irreversible and will result in permanent
            deletion of the chat for both users.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteGroupDialog}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default GroupMenu
