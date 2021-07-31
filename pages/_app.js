import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import { Fade, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from '../src/Header'
import '../styles/global.css'

export default function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const currentRef = React.createRef()

  return (
    <React.Fragment>
      <Head>
        <title>1mmucity</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          preventDuplicate
          maxSnack={2} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          hideIconVariant
          TransitionComponent={Fade}
          ref={currentRef}
          action={(key) => (
            <IconButton onClick={() => currentRef.current.closeSnackbar(key)}>
              <Close />
            </IconButton>
          )}
        >
          <CssBaseline />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Header />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
