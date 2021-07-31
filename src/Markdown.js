/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Types from 'prop-types'
import { Link, Typography, makeStyles } from '@material-ui/core'
import idify from 'html4-id'

const useStyles = makeStyles((theme) => ({
  p: {
    padding: theme.spacing(1, 0)
  },
  h1: {
    padding: theme.spacing(2, 0),
    margin: theme.spacing(2, 0),
    borderBottom: '2px solid #333'
  },
  h2: {
    padding: theme.spacing(1, 0)
  }
}))

export function Markdown({ children }) {
  const classes = useStyles()
  const components = {
    // eslint-disable-next-line no-unused-vars
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter 
          style={style}
          language={match[1]}
          PreTag='div'
          {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>{children}</code>
      )
    },
    // p(props) {
    //   return <Typography className={classes.p} variant='body2' {...props}/>
    // },
    // a(props) {
    //   return <Link {...props} />
    // },
    // h1(props) {
    //   return <Typography id={idify(String(props.children))} className={classes.h1} variant='h3' {...props} />
    // },
    // h2(props) {
    //   return <Typography id={idify(String(props.children))} className={classes.h2} variant='h4' {...props} />
    // },
    // h3(props) {
    //   return <Typography id={idify(String(props.children))} variant='h5' {...props} />
    // },
    // h4(props) {
    //   return <Typography id={idify(String(props.children))} variant='h6' {...props} />
    // },
    // // h5(props) {
    // //   return <Typography variant='h5' {...props} />
    // // },
    // // h6(props) {
    // //   return <Typography variant='h6' {...props} />
    // // },
    // li(props) {
    //   return <li {...props}>
    //     <Typography variant='body1'>{props.children}</Typography>
    //   </li>
    // }
  }
  return(
    <div className='markdown-body'>
      <ReactMarkdown plugins={[gfm]} components={components}>{children}</ReactMarkdown>
    </div>
  )
}

Markdown.propTypes = {
  children: Types.any
}

export default Markdown
