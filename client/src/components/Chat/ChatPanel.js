import React, { useState } from 'react'
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
} from '@mui/material'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import { getInitials, getOtherMember } from '../../utils/functions'
import { useSelector, useDispatch } from 'react-redux'
import { deleteChat } from '../../actions/chats'
import { createReport } from '../../api'

const ChatPanel = ({ currentChat }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const otherUser = getOtherMember(currentChat.members, user._id)
  const [openReportUser, setOpenReportUser] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [reportDescription, setReportDescription] = useState('')

  const openReportUserDialog = () => {
    setOpenReportUser(true)
  }
  const closeReportUserDialog = () => {
    setOpenReportUser(false)
  }

  const handleReportUser = async (e) => {
    e.preventDefault()
    await createReport(otherUser, reportDescription)
    setReportDescription('')
    closeReportUserDialog()
  }

  const openDeleteDialog = () => {
    setOpenDelete(true)
  }
  const closeDeleteDialog = () => {
    setOpenDelete(false)
  }

  const handleDelete = () => {
    dispatch(deleteChat(currentChat._id))
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
        <IconButton onClick={openReportUserDialog}>
          <ReportIcon />
        </IconButton>
        <Dialog
          open={openReportUser}
          onClose={closeReportUserDialog}
          fullWidth
          maxWidth="xs"
        >
          <form onSubmit={handleReportUser}>
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
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeReportUserDialog}>Cancel</Button>
              <Button type="submit">Report</Button>
            </DialogActions>
          </form>
        </Dialog>
        <IconButton onClick={openDeleteDialog}>
          <DeleteIcon />
        </IconButton>
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
