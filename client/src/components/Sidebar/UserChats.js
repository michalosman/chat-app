import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography, Avatar, Button } from '@mui/material'
import useStyles from '../styles'
import { getInitials, getOtherMember } from '../../utils/functions'

const UserChats = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)
  const chats = useSelector((state) => state.chats)

  const chatBoxes = chats.map((chat) => {
    const otherUser = getOtherMember(chat.members, user.id)

    return (
      <Link to={`/${chat.id}`} key={chat.id} style={{ textDecoration: 'none' }}>
        <Button fullWidth style={{ textTransform: 'none', color: 'black' }}>
          <Box display="flex" alignItems="center" width="100%" p={1}>
            <Avatar
              src={`https://avatars.dicebear.com/api/initials/${getInitials(
                chat.type === 'private' ? otherUser.name : chat.name
              )}.svg`}
            />
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body1" ml={1}>
                {chat.type === 'private' ? otherUser.name : chat.name}
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
