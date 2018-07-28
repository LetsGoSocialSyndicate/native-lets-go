/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'

const LoadingButton = (args) => {
  const { loading, spinnerStyle, source, ...rest } = args
  let { imageStyle } = args
  if (loading) {
    return <Spinner style={spinnerStyle} color='red' />
  }
  if (!imageStyle) {
    imageStyle = styles.imageStyle
  }
  return (
    <TouchableOpacity {...rest}>
      <Image source={source} style={imageStyle} />
    </TouchableOpacity>
  )
}

const styles = {
  imageStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
  }
}

export default LoadingButton
