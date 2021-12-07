import React from 'react'
import { Box, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#eee',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: '50px',
  },
}))

const SendBox = () => {
  const classes = useStyles()

  const sendMessage = (e) => {
    e.preventDefault()
  }

  return (
    <Box p={2} borderTop={1} borderColor={'divider'}>
      <Box component="form" onSubmit={sendMessage} display="flex">
        <Input
          className={classes.input}
          fullWidth
          disableUnderline
          placeholder="Aa"
        />
        <IconButton size="large" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default SendBox
