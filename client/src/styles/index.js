import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },

  activeChat: {
    backgroundColor: theme.palette.action.selected,
  },

  message: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    borderRadius: '10px',
    backgroundColor: '#eee',
  },

  ownMessage: {
    textAlign: 'right',
    alignItems: 'flex-end',
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& $messageAuthor': {
      right: '5px',
      left: 'auto',
    },
  },

  messageAuthor: {
    minWidth: '300px',
    position: 'absolute',
    top: '-18px',
    left: '5px',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
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
