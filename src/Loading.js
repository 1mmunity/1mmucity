import {
  makeStyles,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(25),
  }
}))

export function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress size={75}/>
    </div>
  )
}

export default Loading
