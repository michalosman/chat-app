import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },

  message: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderRadius: '10px',
    backgroundColor: '#eee',
  },

  ownMessage: {
    alignItems: 'flex-end',
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  messageTime: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'grey',
  },

  ownMessageTime: {
    color: 'lightgrey',
  },

  input: {
    backgroundColor: '#eee',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: '50px',
  },
}))

export default useStyles
