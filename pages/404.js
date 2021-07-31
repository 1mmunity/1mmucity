import {
  Typography,
  makeStyles
} from '@material-ui/core'
import Button from '../src/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(25),
    padding: theme.spacing(0, 2),
    textAlign: 'center'
  },
  btns: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
}))

export default function _404() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        404
      </Typography>
      <Typography variant='body2'>
        Page not found.
      </Typography>
      <div className={classes.btns}>
        <Button 
          onClick={() => window.history.back()}
          color='primary'
          variant='contained'
        >Go Back</Button>
      </div>
    </div>
  )
}