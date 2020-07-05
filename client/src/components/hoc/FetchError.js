import React from 'react'
import { Button } from '@material-ui/core'

const FetchError = ({message, onRetry}) => {
  return (
    <div>
      <p>{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  )
}


export default FetchError
