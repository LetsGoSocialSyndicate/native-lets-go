/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import { Field } from 'redux-form'
import { DATE_FORMAT } from './Constants'

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

// https://www.npmjs.com/package/react-native-modal-dropdown
const renderPickerInput = (props) => {
  //input is what we get from Field,
  //...rest - all props from PickerInputFormField and parent components
  const { input, ...rest } = props
  return (
    <ModalDropdown onSelect={(index, value) => input.onChange(value)} {...rest} />
  )
}

// https://www.npmjs.com/package/react-native-datepicker
const renderDatePickerInput = (props) => {
  //input is what we get from Field,
  //...rest - all props from PickerInputFormField and parent components
  const { input, ...rest } = props
  return (
    <DatePicker
       onDateChange={input.onChange}
       date={input.value}
       mode='date'
       format={DATE_FORMAT}
       confirmBtnText='Confirm'
       cancelBtnText='Cancel'
       {...rest}
    />
  )
}


//if we want to use Input with ReduxForm, we must use this one:
const TextInputFormField = ({ name, label, placeholder, secureTextEntry }) => {
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

// https://www.npmjs.com/package/react-native-modal-dropdown
const PickerInputFormField = ({ name, label, defaultOption, options }) => {
  const { pickerInputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderPickerInput}
        defaultValue={defaultOption}
        options={options}
        name={name}
        style={pickerInputStyle}
      />
    </View>
  )
}

// https://www.npmjs.com/package/react-native-datepicker
const DatePickerInputFormField = ({ name, label, placeholder, minDate, maxDate }) => {
  const { pickerInputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderDatePickerInput}
        name={name}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        style={pickerInputStyle}
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
  pickerInputStyle: {
    height: 50,
    width: 200
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

export { DatePickerInputFormField, Input, TextInputFormField, PickerInputFormField }
