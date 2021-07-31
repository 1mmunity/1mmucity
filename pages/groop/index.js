import {
  Typography
} from '@material-ui/core'
import React from 'react'
import useProtectedRoute from '../../src/hooks/useProtectedRoute'

export default function PiChat() {
  const [profile, setProfile] = React.useState(null)
  React.useEffect(() => {
    setProfile(useProtectedRoute())
  }, [])
  return (
    <>
      <Typography>Also under construction.</Typography>
      {JSON.stringify(profile)}
    </>
  )
}