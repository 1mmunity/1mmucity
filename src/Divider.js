import {
  Divider as MDivider,
  withStyles
} from '@material-ui/core'

export const Divider = withStyles(() => ({
  root: {
    backgroundColor: '#222'
  }
}))(MDivider)

export default Divider
