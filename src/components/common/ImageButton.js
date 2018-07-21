import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const ImageButton = ({ handleOnPress, buttonSource }) => {
  return (
    <TouchableOpacity onPress={ handleOnPress }>
      <Image
        source={ buttonSource }
        style={ styles.buttonStyle }
      />
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    resizeMode: 'contain',
    width: 200,
    height: 100,
    alignSelf: 'center',
  }
}

export { ImageButton }
