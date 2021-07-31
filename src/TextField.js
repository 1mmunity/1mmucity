import {
  withStyles,
  TextField as MTextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import Types from 'prop-types'

export const TextField = withStyles((theme) => ({
  root: {
    '& input': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#333'
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main
      },
    },
  }
}))(MTextField)

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  text: {
    margin: theme.spacing(0, 0, .5, 0)
  }
}))

export const Field = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='body2' className={classes.text}>
        {props.superlabel}
      </Typography>
      <TextField size='small' {...props} />
    </div>
  )
}

Field.propTypes = {
  superlabel: Types.any
}

export default TextField
