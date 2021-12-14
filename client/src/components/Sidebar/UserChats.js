import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { getInitials, getOtherMember } from '../../utils/functions'
import useStyles from '../styles'

const UserChats = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)
  const chats = useSelector((state) => state.chats)

  const chatBoxes = chats.map((chat) => {
    const otherUser = getOtherMember(chat.members, user._id)

    return (
      <Link
        to={`${chat._id}`}
        key={chat._id}
        style={{ textDecoration: 'none' }}
      >
        <Button fullWidth style={{ textTransform: 'none', color: 'black' }}>
          <Box display="flex" alignItems="center" width="100%" p={1}>
            <Avatar
              src={`https://avatars.dicebear.com/api/initials/${getInitials(
                otherUser.name
              )}.svg`}
            />
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body1" ml={1}>
                {otherUser.name}
              </Typography>
            </Box>
          </Box>
        </Button>
      </Link>
    )
  })

  return (
    <Box className={classes.scrollBox} flex={1} p={2}>
      {chatBoxes}
    </Box>
  )
}

export default UserChats
