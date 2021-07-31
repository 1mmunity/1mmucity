import {
  CardContent,
  Typography,
  makeStyles,
  Link,
  FormControlLabel,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { Field } from '../src/TextField'
import { useSnackbar } from 'notistack'
import Button from '../src/Button'
import Card from '../src/Card'
import cookies from 'react-cookies'
import cconfig from '../src/constants/cookies.json'
import utils from '../src/utils'
import Tooltip from '../src/Tooltip'
import fetchMe from '../src/api/fetchMe'
import Checkbox from '../src/Checkbox'
import React from 'react'
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
  },
}))

export default function login() {
  const notistack = useSnackbar()
  const formik = useFormik({
    initialValues: {
      email: cookies.load(cconfig.rm.email) || '',
      password: cookies.load(cconfig.rm.password) || '',
      remember_me: true
    },
    onSubmit: (values, { setSubmitting }) => {
      const profile = utils.encoder.encode(JSON.stringify({
        email: values.email,
        password: values.password
      }))
      fetchMe(profile, {
        type: 'login'
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
        .catch(e => {
          notistack.enqueueSnackbar(e?.response?.data?.message?.split(': ')[1] || <Link href='/api-status' color='secondary'>Something went wrong</Link>, {
            variant: 'error'
          })
        })
        .then(() => {
          setSubmitting(false)
        })
    }
  })
  const classes = useStyles()
  // React.useEffect(() => {
  //   const b64 = cookies.load(cconfig.last_profile)
  //   let rememberMe
  //   try {
  //     rememberMe = utils.encoder.decode(b64)
  //   } catch {
  //     rememberMe = null
  //   }
  //   const profile = utils.isJSON(rememberMe)
  //   if (!profile?.email || !profile?.password) return
  //   formik.values.email = profile.email
  //   formik.values.password = profile.password
  // }, [])
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant='h4'>Login</Typography>
            <Typography variant='body2'>
              Login to access most of our services.
              Don&apos;t have an account? <Link href='/signup' color='secondary'>Sign Up</Link>
            </Typography>
            <Field
              superlabel='Email'
              variant='outlined'
              name='email'
              type='email'
              placeholder='example@gmail.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              required
              fullWidth
            />
            <Field
              superlabel='Password'
              variant='outlined'
              name='password'
              placeholder='abc123'
              value={formik.values.password}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              required
              fullWidth
              type='password'
            />
            <Link
              href='/contact-me'
              color='secondary'
            >
              Lost your password?
            </Link>
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
              >Login</Button>
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
