/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Image } from 'react-native'
import { Button, Spinner } from 'native-base'

const LoadingButton = (args) => {
  const { loading, children, spinnerStyle, source, ...rest } = args
  if (loading) {
    return <Spinner style={spinnerStyle} color='red' />
  }
  return (
    <Button {...rest}>
      <Image source={source} style={styles.buttonSubmitImageStyle} />
    </Button>
  )
}

const styles = {
  buttonSubmitImageStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
  }
}

export default LoadingButton
