import {
  makeStyles,
  Typography
} from '@material-ui/core'
import Types from 'prop-types'

export default function Badge(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: '9999px',
      backgroundColor: props.color || theme.palette.primary.main,
      backgroundImage: props.bgimage || 'none',
      padding: theme.spacing(0, 1)
    },
    mid: {
      verticalAlign: 'middle',
      fontWeight: 'bold',
      color: '#fff'
    }
  }))
  const classes = useStyles()
  return <span className={classes.root} {...props}>
    <Typography variant='button' className={classes.mid}>{props.children}</Typography>
  </span>
}

Badge.propTypes = {
  children: Types.any,
  color: Types.string,
  bgimage: Types.any
}
