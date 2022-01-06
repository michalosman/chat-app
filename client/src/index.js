import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import store from './store/index.js'
import SocketProvider from './context/Socket'

const theme = createTheme()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
