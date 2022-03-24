import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import useStyles from '../../styles'

const Messages = ({ chat }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)

  const messageBoxes = chat.messages
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((message) => {
      return (
        <Box
          key={uuidv4()}
          className={`${classes.message} ${
            message.sender.id === user.id ? classes.ownMessage : ''
          }`}
          p={1}
        >
          <Typography className={classes.messageAuthor} variant="caption">
            {message.sender.id === user.id ? 'You' : message.sender.name}
          </Typography>
          {message.text}
        </Box>
      )
    })

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column-reverse"
      flex={1}
    >
      {messageBoxes}
    </Box>
  )
}

export default Messages
