/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Field } from 'redux-form'

//If we want to use simple Input (without Redux form)
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize='none'
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

//helper function - we call it from InputFormField
//every time there is a change in input, onChangeText is called
//and it dispatches the change to ReduxForm (input.onChange)
const renderTextInput = (props) => {
  //input is what we get from Field,
  //...rest - all props from InputFormField and parent components
  const { input, ...rest } = props
  return <TextInput onChangeText={input.onChange} {...rest} />
}

//if we want to use Input with ReduxForm, we must use this one:
const InputFormField = ({ name, label, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderTextInput}
        name={name}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize='none'
        style={inputStyle}
      />
    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export { Input, InputFormField }
