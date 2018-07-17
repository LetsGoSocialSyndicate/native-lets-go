import React from 'react'
import { Image, TouchableHighlight } from 'react-native'

const ImageButton = ({ handleOnPress, buttonSource }) => {
  return (
    <TouchableHighlight onPress={ handleOnPress }>
      <Image
        source={ buttonSource }
        style={ styles.buttonStyle }
      />
    </TouchableHighlight>
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
