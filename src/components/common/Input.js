/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Picker, Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import { Field } from 'redux-form'
import { DATE_FORMAT, DATETIME_FORMAT } from './Constants'
import { activityCategories } from '../common/imageUtils'

//If we want to use simple Input (without Redux form)
const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const {
    inputStyle,
    containerStyle
  } = styles

  return (
    <View style={containerStyle}>
      {/* <Text style={labelStyle}>{label}</Text> */}
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

const renderCategoryPickerItems = () => {
  return activityCategories.map(category => {
    return (
      <Picker.Item label={category} key={category} value={category} style={styles.pickerItemStyle} />
    )
  })
}

// helper function - we call it from InputFormField
// every time there is a change in input, onChangeText is called
// and it dispatches the change to ReduxForm (input.onChange)
const renderTextInput = (props) => {
  // input is what we get from Field,
  // ...rest - all props from InputFormField and parent components
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
    // <Picker
    //   // selectedValue="Coffee"
    //   // style={{ height: 100 }}
    //   onValueChange={value => console.log('category is ', value)}
    // >
    //   {renderCategoryPickerItems()}
    // </Picker>

    <ModalDropdown
     style={dropdown}
     textStyle={dropdownText}
     // transparent
     dropdownStyle={{ ...dropdownDropdown, backgroundColor: 'transparent', height: 'auto' }}
     // dropdownTextStyle={{ opacity: 0 }}
     onSelect={(index, value) => input.onChange(value)} {...rest}
    />
  )
}

// https://www.npmjs.com/package/react-native-datepicker
const renderDatePickerInput = (props) => {
  // input is what we get from Field,
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
      showIcon={false}
      style={datePickerStyle}
      customStyles={{
        dateText: {
          marginRight: 65,
          color: '#27608b',
          fontSize: 20,
        },
        dateInput: {
          borderWidth: 0
        },
        placeholderText: {
          marginRight: 55,
          fontSize: 20,
          color: 'hsla(206, 56%, 35%, 0.5)'
        }
      }}
      {...rest}
    />
  )
}

const renderDateTimePickerInput = (props) => {
  // input is what we get from Field,
  //...rest - all props from PickerInputFormField and parent components
  const { input, ...rest } = props
  const { datePickerStyle } = styles

  return (
    <DatePicker
       onDateChange={input.onChange}
       date={input.value}
       mode='datetime'
       format={DATETIME_FORMAT}
       confirmBtnText='Confirm'
       cancelBtnText='Cancel'
       showIcon={false}
       style={datePickerStyle}
       customStyles={{
          dateText: {
            marginRight: 65,
            color: '#27608b',
            fontSize: 20,
          },
          dateInput: {
            borderWidth: 0
          },
          placeholderText: {
            marginRight: 55,
            fontSize: 20,
            color: 'hsla(206, 56%, 35%, 0.5)'
          }
        }}
       {...rest}
    />
  )
}


//if we want to use Input with ReduxForm, we must use this one:
const TextInputFormField = ({
  label,
  multiline,
  name,
  numberOfLne,
  placeholder,
  secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderTextInput}
        name={name}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor='hsla(206, 56%, 35%, 0.5)'
        autoCorrect={false}
        autoCapitalize='none'
        style={inputStyle}
        multiline={multiline}
        numberOfLne={numberOfLne}
        // onClick={onClick}
      />
    </View>
  )
}

// https://www.npmjs.com/package/react-native-modal-dropdown
const PickerInputFormField = ({ name, label, defaultOption, options, defaultValue = 'select gender' }) => {
  const { pickerInputStyle1, labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderPickerInput}
        defaultValue={defaultValue}
        options={options}
        name={name}
        style={pickerInputStyle1}
        // transparent
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

const DateTimePickerInputFormField = ({ name, label, placeholder, minDate, maxDate }) => {
  const { labelStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Field
        component={renderDateTimePickerInput}
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
    fontSize: 20,
    flex: 2,
    color: '#27608b',
    paddingLeft: 10
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdown: {
    width: 250,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3
  },
  dropdownText: {
    paddingLeft: 10,
    fontSize: 20,
    color: 'hsla(206, 56%, 35%, 0.5)'
  },
  dropdownDropdown: {
    width: 200,
    height: 70
  },
  datePickerStyle: {
    width: 250,
  },
  pickerInputStyle1: {
  },
  pickerItemStyle: {
    color: 'red'
  }
}

export {
  DatePickerInputFormField,
  DateTimePickerInputFormField,
  Input,
  TextInputFormField,
  PickerInputFormField
}
