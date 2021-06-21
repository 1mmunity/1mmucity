import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0556F3',
    },
    secondary: {
      main: '#ffa500',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#121212'
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif'
    ].join(','),
    body1: {
      color: '#fff',
      fontSize: '18px'
    },
    body2: {
      fontSize: '16px',
      color: '#888'
    },
    h1: {
      color: '#fff'
    },
    h2: {
      color: '#fff'
    },
    h3: {
      color: '#fff'
    },
    h4: {
      color: '#fff',
      fontWeight: 'bold'
    },
    h5: {
      color: '#fff',
    },
    h6: {
      color: '#fff',
    }
  }
})

export default theme
