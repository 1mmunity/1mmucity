import {
  withStyles,
  Tooltip as MTooltip
} from '@material-ui/core'

export const Tooltip = withStyles((theme) => ({
  arrow: {
    color: '#333'
  },
  tooltip: {
    backgroundColor: '#333',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1.5)
  }
}))(MTooltip)

export function CustomTooltip(props) {
  return <Tooltip arrow {...props}/>
}

export default CustomTooltip
