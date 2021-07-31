import {
  withStyles,
  Dialog as MDialog
} from '@material-ui/core'

export const Dialog = withStyles(() => ({
  paper: {
    backgroundColor: '#222',
  }
}))(MDialog)

export default Dialog