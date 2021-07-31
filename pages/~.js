/* eslint-disable no-unused-vars */
import {
  Grid,
  IconButton,
  makeStyles,
  Typography,
  DialogContent,
  FormControlLabel,
  Link
} from '@material-ui/core'
import { useFormik } from 'formik'
import hasPerm from '../src/utils/hasPerm'
import { Edit, FileCopyOutlined } from '@material-ui/icons'
import React from  'react'
import useProtectedRoute from '../src/hooks/useProtectedRoute'
import Loading from '../src/Loading'
import { useSnackbar } from 'notistack'
import Dialog from '../src/Dialog'
import { Field } from '../src/TextField'
import Badge from '../src/Badge'
import Checkbox from '../src/Checkbox'
import WentWrong from '../src/WentWrong'
import Button from '../src/Button'
import Divider from '../src/Divider'
import setCookieProfile from '../src/functions/setCookieProfile'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  section: {
    padding: theme.spacing(0, 0, 4)
  },
  wht: {
    color: '#fff',
  },
  firstbtn: {
    marginRight: theme.spacing(2)
  },
  logoutbtn: {
    color: 'red',
    borderColor: 'red'
  }
}))

export default function dashboard() {
  const api_path = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API : process.env.NEXT_PUBLIC_DEV_API
  const snackbar = useSnackbar()
  const [dialogs, setDialogs] = React.useState({
    editName: false
  })
  const [profile, setProfile] = React.useState(null)
  const classes = useStyles()
  const toggleDialog = (name, value) => {
    return setDialogs({
      ...dialogs,
      [name]: value
    })
  }
  React.useEffect(() => {
    useProtectedRoute(snackbar)
      .then(res => {
        setProfile(res.data)
      })
      .catch(() => {
        setProfile('')
      })
  }, [])

  function EditNameDialog() {
    const formik = useFormik({
      initialValues: {
        name: profile.name,
        discriminator: profile.discriminator,
        ns_underline: profile.name_styles.underline,
        ns_bold: profile.name_styles.bold,
        ns_color: profile.name_styles.color,
        ns_gradient: profile.name_styles.gradient,
      },
      onSubmit: (values, { setSubmitting }) => {
        const patchObj = {
          name: values.name,
          discriminator: values.discriminator,
          name_styles: {
            underline: values.ns_underline,
            bold: values.ns_bold,
            color: values.ns_color,
            gradient: values.ns_gradient,
          }
        }
        if (!hasPerm(profile, 'PRO')) {
          delete patchObj.discriminator
          delete patchObj.name_styles
        }
        axios.patch(`${api_path}/users/@me`, patchObj, {
          headers: {
            Authorization: `user ${profile.token}`
          }
        })
          .then((res) => {
            snackbar.enqueueSnackbar('Successfully updated user', {
              variant: 'success'
            })
            setCookieProfile(res.data)
            setProfile(res.data)
          })
          .catch((e) => {
            snackbar.enqueueSnackbar(e.response?.data.message?.split(': ')[1] || <Link href='/api-status' color='secondary'>Something went wrong</Link>, {
              variant: 'error'
            })
          })
          .then(() => setSubmitting(false))
      }
    })
    return (
      <Dialog
        open={dialogs.editName}
        onClose={() => {
          toggleDialog('editName', false)
        }}
      >
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className={classes.section}>
            <div className={classes.section}>
              <Typography variant='h4'>
                Name
              </Typography>
              <Typography variant='body2'>
                {'Edit your name#tag.'}
              </Typography>
              <Field 
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                superlabel='Name'
                variant='outlined'
                fullWidth
                required
              />
              <Field 
                name='discriminator'
                value={formik.values.discriminator}
                onChange={formik.handleChange}
                superlabel={
                  <>
                    Tag <Badge bgimage='linear-gradient(to bottom left, #B715E1, #094AD5)'>PRO</Badge>
                  </>
                }
                variant='outlined'
                fullWidth
                required
                disabled={!hasPerm(profile, 'PRO') || formik.isSubmitting}
              />
            </div>
            <Badge bgimage='linear-gradient(to bottom left, #B715E1, #094AD5)'>PRO</Badge>
            <Typography variant='h4'>
              Name Style
            </Typography>
            <Typography variant='body2'>
              Edit your name style to make it stand out from the crowd.
            </Typography>
            <div className={classes.section}>
              <FormControlLabel
                label='Bold'
                control={
                  <Checkbox
                    name='ns_bold'
                    checked={formik.values.ns_bold}
                    onChange={formik.handleChange}
                    disabled={!hasPerm(profile, 'PRO') || formik.isSubmitting}
                  />
                }
              />
              <FormControlLabel
                label='Underline'
                control={
                  <Checkbox
                    name='ns_underline'
                    checked={formik.values.ns_underline}
                    onChange={formik.handleChange}
                    disabled={!hasPerm(profile, 'PRO') || formik.isSubmitting}
                  />
                }
              />
              <Field 
                name='ns_color'
                value={formik.values.ns_color}
                onChange={formik.handleChange}
                superlabel='Color'
                variant='outlined'
                fullWidth
                required
                type='color'
                disabled={!hasPerm(profile, 'PRO') || formik.isSubmitting}
              />
              <Field 
                name='ns_gradient'
                value={formik.values.ns_gradient}
                onChange={formik.handleChange}
                superlabel='Gradient'
                variant='outlined'
                fullWidth
                disabled={!hasPerm(profile, 'PRO') || formik.isSubmitting}
              />
            </div>
            <Button 
              className={classes.firstbtn}
              type='submit'
              color='primary'
              variant='contained'
            >
              Submit
            </Button>
            <Button 
              onClick={() => toggleDialog('editName', false)}
              className={classes.wht}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  function Dashboard() {
    return (
      <div className={classes.section}>
        <Typography variant='body2'>
            Dashboard
        </Typography>
        <Grid container>
          <Grid item>
            <Typography variant='h4' style={{
              textDecoration: profile.name_styles.underline ? 'underline' : 'none',
              fontWeight: profile.name_styles.bold ? 'bold' : 'normal',
              background: profile.name_styles.gradient ? `linear-gradient(${profile.name_styles.gradient})` : 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: profile.name_styles.gradient ? 'transparent' : profile.name_styles.color
            }}>
              {profile.name}#{profile.discriminator}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton 
              onClick={() => {
                toggleDialog('editName', true)
              }}
              className={classes.wht}
              size='medium'
            >
              <Edit fontSize='small' />
            </IconButton>
            <EditNameDialog />
          </Grid>
        </Grid>
      </div>
    )
  }
  function ID() {
    return (
      <div className={classes.section}>
        <Typography variant='body2'>
            ID
        </Typography>
        <Grid container>
          <Grid item>
            <Typography variant='h6'>
              {profile.id}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton 
              onClick={() => {
                window.navigator.clipboard.writeText(profile.id)
                snackbar.enqueueSnackbar('Successfully copied ID', {
                  variant: 'success'
                })
              }}
              className={classes.wht}
              size='medium'
            >
              <FileCopyOutlined fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
  function ChangePassword() {
    const formik = useFormik({
      initialValues: {
        new_password: '',
        confirm_password: ''
      },
      onSubmit: (values, { setSubmitting, setErrors }) => {
        if (values.new_password !== values.confirm_password) {
          setErrors({ password: 'Passwords do not match.' })
          return setSubmitting(false)
        }
        axios.patch(`${api_path}/users/@me`, {
          password: values.new_password
        }, {
          headers: {
            Authorization: `user ${profile.token}`
          }
        })
          .then((res) => {
            snackbar.enqueueSnackbar('Successfully updated user', {
              variant: 'success'
            })
            setProfile(res.data)
            setCookieProfile(res.data)
          })
          .catch((e) => {
            snackbar.enqueueSnackbar(e.response?.data.message?.split(': ')[1] || <Link href='/api-status' color='secondary'>Something went wrong</Link>, {
              variant: 'error'
            })
          })
          .then(() => setSubmitting(false))
      }
    })
    return (
      <div className={classes.section}>
        <Typography variant='h4'>
          Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.section}>
            <Field
              name='new_password'
              value={formik.values.new_password}
              onChange={formik.handleChange}
              superlabel='New Password'
              variant='outlined'
              required
              disabled={formik.isSubmitting}
              placeholder='abc123'
              type='password'
              error={Boolean(formik.errors?.password)}
              helperText={formik.errors.password}
            />
            <Field
              name='confirm_password'
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              superlabel='Confirm Password'
              variant='outlined'
              required
              disabled={formik.isSubmitting}
              placeholder='abc123'
              type='password'
              error={Boolean(formik.errors?.password)}
              helperText={formik.errors.password}
            />
          </div>
          <Button 
            type='submit'
            color='primary'
            variant='contained'
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }

  function DangerZone() {
    return (
      <>
        <div className={classes.section}>
          <Typography variant='h4'>
            Danger Zone
          </Typography>
          <Typography variant='body2'>
            These actions are irreversible, continue with caution.
          </Typography>
        </div>
        <Button className={classes.logoutbtn} variant='outlined' onClick={() => {
          setCookieProfile(null)
          window.location.href = '/'
        }}>Logout</Button>
      </>
    )
  }

  return (
    <div className={classes.root}>
      {profile ? <>
        <Dashboard />
        <ID />
        <ChangePassword />
        <DangerZone />
      </> : 
        (profile === '' ? <WentWrong /> : <Loading />)
      }
    </div>
  )
}
