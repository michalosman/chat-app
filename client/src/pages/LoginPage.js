import { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'
import { signUp, signIn } from '../actions/auth'

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const dispatch = useDispatch()

  const toggleIsSignUp = () => setIsSignUp(!isSignUp)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (isSignUp) {
      const firstName = data.get('firstName')
      const lastName = data.get('lastName')
      const email = data.get('email')
      const password = data.get('password')
      dispatch(signUp({ firstName, lastName, email, password }))
    } else {
      const email = data.get('email')
      const password = data.get('password')
      dispatch(signIn({ email, password }))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {isSignUp ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              </>
            ) : (
              ''
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={toggleIsSignUp}
                style={{ textTransform: 'none' }}
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      Michał Osman&nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default LoginPage
