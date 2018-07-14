/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Button, Spinner } from 'native-base'

const LoadingButton = (args) => {
  const { loading, children, spinnerStyle, ...rest } = args
  return loading
    ? <Spinner style={spinnerStyle} color='red' />
    : <Button {...rest}>{children}</Button>
}

export default LoadingButton
