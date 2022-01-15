import { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { deleteChat } from '../../actions/chats'
import { createReport } from '../../api'
import { SocketContext } from '../../context/Socket'
import { getInitials, getOtherMember } from '../../utils/functions'

const ChatPanel = ({ currentChat }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const otherUser = getOtherMember(currentChat.members, user._id)
  const socket = useContext(SocketContext)

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [openReportUser, setOpenReportUser] = useState(false)
  const [reportDescription, setReportDescription] = useState('')
  const [openDelete, setOpenDelete] = useState(false)

  const openChatMenu = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const closeChatMenu = () => {
    setMenuAnchor(null)
  }

  const openReportUserDialog = () => {
    setOpenReportUser(true)
    closeChatMenu()
  }
  const closeReportUserDialog = () => {
    setOpenReportUser(false)
    closeChatMenu()
  }

  const handleReportUser = async () => {
    if (!reportDescription) return
    await createReport(otherUser, reportDescription)
    setReportDescription('')
    closeReportUserDialog()
  }

  const openDeleteDialog = () => {
    setOpenDelete(true)
    closeChatMenu()
  }
  const closeDeleteDialog = () => {
    setOpenDelete(false)
    closeChatMenu()
  }

  const handleDelete = () => {
    dispatch(deleteChat(currentChat._id, socket))
    closeDeleteDialog()
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
            otherUser.name
          )}.svg`}
        />
        <Typography variant="h6" ml={1}>
          {otherUser.name}
        </Typography>
      </Box>
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
          <MenuItem onClick={openReportUserDialog}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            Report
          </MenuItem>
          <MenuItem onClick={openDeleteDialog}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
        <Dialog
          open={openReportUser}
          onClose={closeReportUserDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Report user</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Tell us more about the issue you have with {otherUser.name}.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              type="text"
              variant="standard"
              multiline
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeReportUserDialog}>Cancel</Button>
            <Button onClick={handleReportUser}>Report</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={closeDeleteDialog}
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
            <Button onClick={closeDeleteDialog}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default ChatPanel
