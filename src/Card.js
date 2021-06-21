import {
  withStyles,
  Card as MCard
} from '@material-ui/core'

const Card = withStyles(() => ({
  root: {
    backgroundColor: '#222',
    textAlign: 'left'
  }
}))(MCard)

export default function CCard(props) {
  return <Card {...props}/>
}
