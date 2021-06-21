import {
  withStyles,
  Button as MButton
} from '@material-ui/core'

export const Button = withStyles(() => ({
  root: {
    textTransform: 'none',
    fontWeight: 'bold',
    borderRadius: 0
  }
}))(MButton)

export default function CButton(props) {
  return <Button centerRipple {...props}/>
}
