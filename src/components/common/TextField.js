import React from 'react'
import { TextInput, View, Text } from 'react-native'

const TextField = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  const { textInputStyle, containerStyle, labelStyle } = styles
  return (
    <View style={ containerStyle }>
      <Text style={ labelStyle }>{ label }</Text>
      <TextInput autoCorrect={ false }
        keyboardType={ keyboardType }
        placeholder={ placeholder }
        secureTextEntry={ secureTextEntry }
        style={ textInputStyle }
        value={ value }
        onChangeText={ onChangeText }
      />
    </View>
  )
}

const styles = {
  textInputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    paddingLeft: 10,
    fontSize: 18,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  }
}

export { TextField }
