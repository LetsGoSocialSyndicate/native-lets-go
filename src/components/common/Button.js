import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles
  return (
    <TouchableOpacity
      style={ buttonStyle }
      onPress={ onPress }>
      <Text style={ textStyle }>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  }
}

export { Button }
