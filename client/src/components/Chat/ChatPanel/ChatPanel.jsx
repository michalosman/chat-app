import { Avatar, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { getInitials, getOtherMember } from '../../../utils/functions'
import GroupMenu from './GroupMenu'
import PrivateMenu from './PrivateMenu'

function ChatPanel({ chat }) {
  const user = useSelector((state) => state.auth)
  const otherUser = getOtherMember(chat.members, user.id)

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
            chat.type === 'private' ? otherUser.name : chat.name
          )}.svg`}
        />
        <Typography variant="h6" ml={1}>
          {chat.type === 'private' ? otherUser.name : chat.name}
        </Typography>
      </Box>
      {chat.type === 'private' ? (
        <PrivateMenu otherUser={otherUser} chat={chat} />
      ) : (
        <GroupMenu chat={chat} />
      )}
    </Box>
  )
}

export default ChatPanel
