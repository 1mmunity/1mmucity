import React from 'react'
import {
  CardContent,
  Typography,
  makeStyles,
  Link,
  FormControlLabel
} from '@material-ui/core'
import { useFormik } from 'formik'
import cconfig from '../src/constants/cookies.json'
import cookies from 'react-cookies'
import axios from 'axios'
import { Field } from '../src/TextField'
import Button from '../src/Button'
import Card from '../src/Card'
import Tooltip from '../src/Tooltip'
import Checkbox from '../src/Checkbox'
import { useSnackbar } from 'notistack'
import utils from '../src/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(100),
    padding: theme.spacing(4),
    margin: '0 auto'
  },
  btn: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  cancelbtn: {
    margin: theme.spacing(0, 0, 0, 2),
    color: '#fff'
  }
}))

export default function signup() {
  const snackbar = useSnackbar()
  const classes = useStyles()
  const [nmErr, setNmErr] = React.useState(null)
  const [emErr, setEmErr] = React.useState(null)
  const [pwErr, setPwErr] = React.useState(null)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      remember_me: true
    },
    onSubmit: (values, { setSubmitting }) => {
      setNmErr(null)
      setEmErr(null)
      setPwErr(null)
      if (values.password !== values.confirm_password) {
        setPwErr('Passwords do not match.')
        return setSubmitting(false)
      }
      const max_name_length = 32
      if (values.name.length > max_name_length) {
        setNmErr(`Name must be ${max_name_length} or fewer in length.`)
        return setSubmitting(false)
      }
      const api_path = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API : process.env.NEXT_PUBLIC_DEV_API
      axios.post(`${api_path}/users`, {
        name: values.name,
        email: values.email,
        password: values.password
      })
        .then((res) => {
          let encodedProfile
          try {
            encodedProfile = utils.encoder.encode(JSON.stringify(res.data))
          } catch {
            throw new Error('Cannot encode profile')
          }
          cookies.save(cconfig.profile, encodedProfile)
          if (values.remember_me) {
            cookies.save(cconfig.rm.email, values.email)
            cookies.save(cconfig.rm.password, values.password)
          }
          window.location.href = '/~?login=true'
        })
        .catch((e) => {
          if (!e?.response) return snackbar.enqueueSnackbar(<Link href='/api-status' color='secondary'>Something went wrong.</Link>, {
            variant: 'error'
          })
          if (e.response.data.e === 'name') return setNmErr(`${e.response.data.message?.split(': ')[1]}.`)
          if (e.response.data.e === 'email') return setEmErr(`${e.response.data.message?.split(': ')[1]}.`)
          snackbar.enqueueSnackbar(e.response?.data.message?.split(': ')[1] || <Link href='/api-status' color='secondary'>Something went wrong</Link>, {
            variant: 'error'
          })
        })
        .then(() => setSubmitting(false))
    }
  })
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant='h4'>Sign Up</Typography>
            <Typography variant='body2'>
              Sign up to access most of our services.
              Already have an account? <Link href='/login' color='secondary'>Login</Link>
            </Typography>
            <Field 
              name='name'
              superlabel='Name'
              variant='outlined'
              placeholder='1mmucity_user'
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              fullWidth
              required
              error={Boolean(nmErr)}
              helperText={nmErr}
            />
            <Field 
              superlabel='Email'
              variant='outlined'
              type='email'
              placeholder='example@gmail.com'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              fullWidth
              required
              error={Boolean(emErr)}
              helperText={emErr}
            />
            <Field 
              superlabel='Password'
              variant='outlined'
              placeholder='abc123'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              fullWidth
              required
              type='password'
              error={Boolean(pwErr)}
              helperText={pwErr}
            />
            <Field 
              superlabel='Confirm Password'
              variant='outlined'
              placeholder='abc123'
              name='confirm_password'
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              fullWidth
              required
              type='password'
              error={Boolean(pwErr)}
              helperText={pwErr}
            />
            <div>
              <Tooltip title={
                <>
                  <Typography>
                    Check to store credentials on local cookies.
                    Will autofill login forms when found.
                    Overwrites last saved credentials.
                  </Typography>
                </>
              }>
                <FormControlLabel
                  disabled={formik.isSubmitting}
                  control={
                    <Checkbox 
                      // color='primary'
                      name='remember_me'
                      checked={formik.values.remember_me}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                    />
                  }
                  label='Remember Me'
                />
              </Tooltip>
            </div>
            <div className={classes.btn}>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                disabled={formik.isSubmitting}
              >Sign up</Button>
              <Button
                href='/'
                className={classes.cancelbtn}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
