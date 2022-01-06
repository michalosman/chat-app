import { Box, CircularProgress } from '@mui/material'

const LoadingPage = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="100px" />
    </Box>
  )
}

export default LoadingPage
