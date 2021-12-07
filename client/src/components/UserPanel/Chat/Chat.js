import React from 'react'
import { Box } from '@mui/material'
import ChatSettings from './ChatSettings'
import Messages from './Messages'
import SendBox from './SendBox'

const Chat = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor={'divider'}
    >
      <ChatSettings />
      <Messages />
      <SendBox />
    </Box>
  )
}

export default Chat
