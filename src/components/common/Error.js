/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { Text, View } from 'react-native'

const Error = ({ error }) => {
  if (error) {
    const { viewStyle, errorTextStyle } = styles
    return (
      <View style={viewStyle}>
        <Text style={errorTextStyle}>
          {error}
        </Text>
      </View>
    )
  }
  return null
}

const styles = {
  viewStyle: {
    backgroundColor: 'transparent'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export { Error }
