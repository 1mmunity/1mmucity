import {
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core'
import {
  Close
} from '@material-ui/icons'
import Button from './Button'
// import Types from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(25),
    padding: theme.spacing(0, 2),
    textAlign: 'center'
  },
  btns: {
    marginTop: theme.spacing(4)
  },
  firstBtn: {
    marginRight: theme.spacing(1)
  }
}))

export function pushError({ message, snackbar }) {
  const action = (key) => (
    <>
      <Button
        onClick={() => window.location.reload()}
        color='secondary'
        variant='contained'
      >
        Reload
      </Button>
      <IconButton onClick={() => snackbar.closeSnackbar(key)}>
        <Close />
      </IconButton>
    </>
  )
  snackbar.enqueueSnackbar(message || 'Something went wrong', {
    variant: 'error',
    persist: true,
    action
  })
}

export function WentWrong() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Something went wrong.
      </Typography>
      <Typography variant='body2'>
        Failed to connect to the backend.
        This might be caused by the inactivity of the backend.
      </Typography>
      <div className={classes.btns}>
        <Button 
          onClick={() => window.location.reload()}
          color='primary'
          variant='contained'
          className={classes.firstBtn}
        >
          Reload
        </Button>
        <Button href='/api-status' color='primary'>
          Status Page
        </Button>
      </div>
    </div>
  )
}

// WentWrong.propTypes = {
//   message: Types.any,
// }

export default WentWrong
