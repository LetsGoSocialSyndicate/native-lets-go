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
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 20
  }
}

export { ImageButton }
