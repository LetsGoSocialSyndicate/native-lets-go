import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const ImageButton = ({ handleOnPress, buttonSource, buttonWidth }) => {
  let buttonStyle = styles.buttonStyle
  if (buttonWidth) {
    buttonStyle = { ...buttonStyle, width: buttonWidth}
  }
  return (
    <TouchableOpacity onPress={ handleOnPress }>
      <Image
        source={ buttonSource }
        style={ buttonStyle }
      />
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',
  }
}

export { ImageButton }
