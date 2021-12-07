import React, { useState } from 'react'
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
  NativeSelect,
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import ReportIcon from '@mui/icons-material/Report'
import LogoutIcon from '@mui/icons-material/Logout'
import { getInitials } from '../../../utils/functions'
import { useDispatch } from 'react-redux'
import { signOut } from '../../../actions/auth'

const UserSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const [openAddChat, setOpenAddChat] = useState(false)
  const [openReportAnIssue, setOpenReportAnIssue] = useState(false)
  const [reportType, setReportType] = useState('')

  const handleOpenAddChat = () => setOpenAddChat(true)
  const handleCloseAddChat = () => setOpenAddChat(false)
  const handleOpenReportAnIssue = () => setOpenReportAnIssue(true)
  const handleCloseReportAnIssue = () => setOpenReportAnIssue(false)

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value)
  }

  const logOut = () => {
    dispatch(signOut())
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
        <IconButton onClick={handleOpenAddChat}>
          <AddIcon />
        </IconButton>
        <Dialog open={openAddChat} onClose={handleCloseAddChat}>
          <DialogTitle>Add new chat</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddChat}>Cancel</Button>
            <Button onClick={handleCloseAddChat}>Add chat</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={handleOpenReportAnIssue}>
          <ReportIcon />
        </IconButton>
        <Dialog open={openReportAnIssue} onClose={handleCloseReportAnIssue}>
          <DialogTitle>Report an issue</DialogTitle>
          <DialogContent>
            <NativeSelect
              value={reportType}
              label="Report type"
              onChange={handleReportTypeChange}
              fullWidth
            >
              <option value={'Other'}>Other</option>
              <option value={'Smth 1'}>Smth 1</option>
              <option value={'Smth 2'}>Smth 2</option>
              <option value={'Smth 3'}>Smth 3</option>
              <option value={'Smth 4'}>Smth 4</option>
            </NativeSelect>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReportAnIssue}>Cancel</Button>
            <Button onClick={handleCloseReportAnIssue}>Send report</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default UserSettings
