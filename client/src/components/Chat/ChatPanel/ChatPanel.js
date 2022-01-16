import { useSelector } from 'react-redux'

import { Box, Avatar, Typography } from '@mui/material'

import { getInitials, getOtherMember } from '../../../utils/functions'
import PrivateMenu from './PrivateMenu'
import GroupMenu from './GroupMenu'

const ChatPanel = ({ chat }) => {
  const user = useSelector((state) => state.auth)
  const otherUser = getOtherMember(chat.members, user._id)

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
