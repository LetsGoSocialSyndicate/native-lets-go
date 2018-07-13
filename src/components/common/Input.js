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
  const {
    inputStyle,
    labelStyle,
    containerStyle
  } = styles

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
  const { dropdown, dropdownText, dropdownDropdown } = styles
  return (
    <ModalDropdown
     style={dropdown}
     textStyle={dropdownText}
     dropdownStyle={dropdownDropdown}
     onSelect={(index, value) => input.onChange(value)} {...rest}
    />
  )
}

// https://www.npmjs.com/package/react-native-datepicker
const renderDatePickerInput = (props) => {
  //input is what we get from Field,
  //...rest - all props from PickerInputFormField and parent components
  const { input, ...rest } = props
  const { datePickerStyle } = styles

  return (
    <DatePicker
       onDateChange={input.onChange}
       date={input.value}
       mode='date'
       format={DATE_FORMAT}
       confirmBtnText='Confirm'
       cancelBtnText='Cancel'
       style={datePickerStyle}
       customStyles={{
          dateIcon: {
            // position: 'absolute',
            right: 0,
            // top: 4,
            marginLeft: 10
          },
          dateInput: {
            borderWidth: 0
          }
        }}
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
  const { pickerInputStyle1, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderPickerInput}
        defaultValue={defaultOption}
        options={options}
        name={name}
        style={pickerInputStyle1}
      />
    </View>
  )
}

// https://www.npmjs.com/package/react-native-datepicker
const DatePickerInputFormField = ({ name, label, placeholder, minDate, maxDate }) => {
  const { labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderDatePickerInput}
        name={name}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
      />
    </View>
  )
}
const styles = {
  inputStyle: {
    fontSize: 18,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdown: {
    alignSelf: 'flex-end',
    width: 250,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
  },
  dropdownText: {
    fontSize: 18,
    marginRight: 120,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownDropdown: {
    width: 200,
    height: 70,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
  },
  datePickerStyle: {
    marginRight: 90,
    width: 200,
  },
  pickerInputStyle1: {

  }
}

export { DatePickerInputFormField, Input, TextInputFormField, PickerInputFormField }
