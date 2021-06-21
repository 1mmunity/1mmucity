import {
  makeStyles,
  Typography,
} from '@material-ui/core'
import Image from 'next/image'
import {
  Button,
} from '../src'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(12, 6),
    textAlign: 'center',
    boxShadow: theme.shadows[24]
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  desc: {
    marginBottom: theme.spacing(3)
  },
  img: {
    marginBottom: theme.spacing(2)
  },
  nlb: {
    marginRight: '5px' // not-last-button
  },
  content: {
    padding: theme.spacing(10, 7),
    textAlign: 'center',
    '& h4': {
      marginBottom: theme.spacing(2),
      textAlign: 'center'
    },
  },
}))

export default function Index() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.header}>
        <div className={classes.img}>
          <Image 
            src='/1mmucity.png'
            alt='1mmucity Logo'
            width={100}
            height={100}
          />
        </div>
        <Typography variant='h3' className={classes.title}>
          <code>
            1mmucity
          </code>
        </Typography>
        <Typography variant='body2' className={classes.desc}>
          A little community in the edge of the internet.
        </Typography>
        <Button variant='contained' color='primary' href='/projects'>Check it out</Button>
        {/* <Button variant='outlined' color='primary' href='/p'>LiChat</Button> */}
      </div>
      <div className={classes.content}>
        <Typography variant='h4' color='secondary'>
          What’s in 1mmucity?
        </Typography>
        <Typography>
          {/* 1mmucity has a lot of things in it. Starting from a chat app called PiChat to many others.
          1mmucity is designed mainly for developers to easily integrate their applications here. */}
          1mmucity is currently under construction. Come back later!
        </Typography>
      </div>
    </>
  )
}
