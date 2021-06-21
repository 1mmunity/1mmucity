import {
  AppBar,
  makeStyles,
  Toolbar,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import {
  Button
} from '../src'
import Image from 'next/image'
import React from 'react'
import {
  Menu as IconMenu
} from '@material-ui/icons'
import Drawer from './Drawer'
import Divider from './Divider'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: theme.spacing(2, 1),
    boxShadow: theme.shadows[24],
  },
  logo: {
    flexGrow: 1
  },
  logoTitle: {
    marginLeft: theme.spacing(2.5),
    fontSize: theme.spacing(3),
    verticalAlign: 'middle'
  },
  menuLogin: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    }
  },
  menuSignup: {
    color: theme.palette.primary.main
  }
}))

function ListItemLink(props) {
  return <ListItem button component='a' {...props}/>
}

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleDrawer = (state) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setMenuOpen(state)
  }
  const classes = useStyles()
  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar>
        <div className={classes.logo}>
          <Link href='/'>
            <Image 
              src='/1mmucity.png'
              alt='1mmucity Logo'
              width={50}
              height={50}
            />
          </Link>
        </div>
        <Button color='primary' variant='outlined'>Login</Button>
        <IconButton onClick={toggleDrawer(true)}>
          <IconMenu color='secondary'/>
        </IconButton>
        <Drawer anchor='right' open={menuOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItem>
              <Button color='primary' variant='outlined' href='/auth/login' fullWidth>Login</Button>
            </ListItem>
            <ListItem>
              <Button color='primary' variant='contained' href='/auth/signup' fullWidth>Sign In</Button>
            </ListItem>
            <Divider />
            <ListItemLink href='/pichat'>
              <ListItemText primary='PiChat - Chat with others' />
            </ListItemLink>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}