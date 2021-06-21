import {
  withStyles,
  Drawer as MDrawer
} from '@material-ui/core'

export const Drawer = withStyles(() => ({
  paper: {
    backgroundColor: '#121212'
  }
}))(MDrawer)

export default Drawer
