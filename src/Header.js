import {
  AppBar,
  makeStyles,
  Toolbar,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
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
import Badge from './Badge'
import useIsLoggedIn from './hooks/useIsLoggedIn'

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
  },
  white: {
    color: '#ffffff',
    fontSize: '32px'
  },
  wht: {
    color: '#fff'
  }
}))

function ListItemLink(props) {
  return <ListItem button component='a' {...props}/>
}

export default function Header() {
  const [profile, setProfile] = React.useState(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleDrawer = (state) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setMenuOpen(state)
  }
  const classes = useStyles()
  React.useEffect(() => {
    useIsLoggedIn()
      .then((res) => {
        setProfile(res.data)
      })
      .catch(() => {
        setProfile('')
      })
  }, [])
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
        <IconButton onClick={toggleDrawer(true)}>
          <IconMenu className={classes.white}/>
        </IconButton>
        <Drawer anchor='right' open={menuOpen} onClose={toggleDrawer(false)}>
          <List>
            {profile ? <>
              <ListItem>
                <ListItemText primary={
                  <>
                    <Typography variant='body2'>
                      Logged in as
                    </Typography>
                    <Link href='/~' className={classes.wht} style={{
                      textDecoration: profile.name_styles.underline ? 'underline' : 'none',
                      fontWeight: profile.name_styles.bold ? 'bold' : 'normal',
                      background: profile.name_styles.gradient ? `linear-gradient(${profile.name_styles.gradient})` : 'none',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: profile.name_styles.gradient ? 'transparent' : profile.name_styles.color
                    }}>
                      {profile.name}#{profile.discriminator}
                    </Link>
                  </>
                } />
              </ListItem>
            </> : <>
              {profile === '' ? <>
                <ListItem>
                  <Typography variant='body2'>
                    Cannot connect to the API.
                  </Typography>
                </ListItem>
              </> : ''}
              <ListItem>
                <Button color='primary' variant='outlined' href='/login' fullWidth>Login</Button>
              </ListItem>
              <ListItem>
                <Button color='primary' variant='contained' href='/signup' fullWidth>Sign In</Button>
              </ListItem>
            </>}
            <Divider />
            <ListItemLink href='/update-logs'>
              <ListItemText primary={
                <>
                  Update Logs <Badge bgimage='linear-gradient(to top right, rgb(101, 115, 255), rgb(111, 114, 247), rgb(120, 114, 239), rgb(130, 113, 231), rgb(139, 112, 223), rgb(149, 111, 215), rgb(158, 111, 208), rgb(168, 110, 200), rgb(177, 109, 192), rgb(187, 108, 184), rgb(196, 108, 176), rgb(206, 107, 168))'>NEW</Badge>
                </>}/>
            </ListItemLink>
            {/* <ListItemLink href='/groop'>
              <ListItemText primary={
                <>
                  Groop <Badge bgimage='radial-gradient( circle farthest-corner at 10% 20%,  rgba(215,75,80,1) 0%, rgba(243,146,32,1) 100.2% );'>TESTERS ONLY</Badge>
                </>}/>
            </ListItemLink> */}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}