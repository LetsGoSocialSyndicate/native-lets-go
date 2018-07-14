/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Button, Text } from 'native-base'
import { Spinner } from './Spinner'

const LGButton = ({ onPress, buttonText }) => {
  const { buttonStyle, textStyle } = styles
  return (
    <Button
      style={ buttonStyle }
      block
      bordered
      rounded
      onPress={ onPress }>
      <Text style={ textStyle }>{ buttonText }</Text>
    </Button>
  )
}

const LoadingButton = ({ loading, onPress, children }) => {
  if (loading) {
    return <Spinner size="large" />
  }
  return <Button onPress={onPress}>{children}</Button>
}

const styles = {
  buttonStyle: {
    marginBottom: 15,
    borderColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textStyle: {
    color: 'white',
    letterSpacing: 2,
  }
}

export { LGButton, LoadingButton }
