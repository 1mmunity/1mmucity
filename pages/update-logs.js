import {
  makeStyles,
} from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import Markdown from '../src/Markdown'
import Loading from '../src/Loading'
import { WentWrong, pushError } from '../src/WentWrong'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  center: {
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(25)
  },
  btns: {
    marginTop: theme.spacing(4),
    textAlign: 'center'
  },
  firstbtn: {
    marginRight: theme.spacing(1)
  }
}))

export default function Updates() {
  const snackbar = useSnackbar()
  const classes = useStyles()
  const [content, setContent] = React.useState(
    <Loading />
  )
  const api_path = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API : process.env.NEXT_PUBLIC_DEV_API
  React.useEffect(() => {
    axios.get(`${api_path}/documents/frontend/updates`)
      .then((res) => {
        setContent(
          <Markdown>
            {res.data.content}
          </Markdown>
        )
      })
      .catch(() => {
        pushError({
          message: 'Cannot fetch update logs', 
          snackbar
        })
        setContent(
          <WentWrong />
        )
      })
  }, [])
  return (
    <div className={classes.root}>
      {content}
    </div>
  )
}
