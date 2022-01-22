import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
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
import { deleteChat } from '../../../actions/chats'
import * as api from '../../../api'
import { SocketContext } from '../../../context/Socket'

const PrivateMenu = ({ otherUser, chat }) => {
  const dispatch = useDispatch()

  const socket = useContext(SocketContext)

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [openReportUser, setOpenReportUser] = useState(false)
  const [reportDescription, setReportDescription] = useState('')
  const [openDelete, setOpenDelete] = useState(false)

  const handleReportUser = async () => {
    if (!reportDescription) return
    await api.createReport(otherUser, reportDescription)
    setReportDescription('')
    closeReportUserDialog()
  }

  const handleDelete = () => {
    dispatch(deleteChat(chat.id, socket))
    closeDeleteDialog()
  }

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

  const openDeleteDialog = () => {
    setOpenDelete(true)
    closeChatMenu()
  }
  const closeDeleteDialog = () => {
    setOpenDelete(false)
    closeChatMenu()
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
  )
}

export default PrivateMenu
