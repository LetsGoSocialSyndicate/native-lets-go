/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Button, Text } from 'native-base'

const LGButton = ({ onPress, buttonText }) => {
  const { buttonStyle, textStyle } = styles
  return (
    <Button
      style={buttonStyle}
      block
      bordered
      rounded
      onPress={onPress}
    >
      <Text style={textStyle}>{buttonText}</Text>
    </Button>
  )
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

export { LGButton }
