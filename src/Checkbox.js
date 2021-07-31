import {
  withStyles,
  Checkbox as MCheckbox
} from '@material-ui/core'

export const Checkbox = withStyles(() => ({
  root: {
    color: '#333'
  }
}))(MCheckbox)

export default Checkbox
