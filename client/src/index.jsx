import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import SocketProvider from './context/Socket'
import store from './store/index'

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
