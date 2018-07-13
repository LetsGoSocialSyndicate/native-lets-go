/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import { Field } from 'redux-form'
import { DATE_FORMAT } from './Constants'

// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TouchableHighlight,
//   ScrollView,
// } from 'react-native'

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
  // const { modalDropdownStyle } = styles
  // <View style={styles.cell}>
  //   <ModalDropdown ref="dropdown_2"
  //                  style={styles.dropdown_2}
  //                  textStyle={styles.dropdown_2_text}
  //                  dropdownStyle={styles.dropdown_2_dropdown}
  //                  options={DEMO_OPTIONS_2}
  //                  renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
  //                  renderRow={this._dropdown_2_renderRow.bind(this)}
  //                  renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
  //   />
  //   <TouchableOpacity onPress={() => {
  //     this.refs.dropdown_2.select(0);
  //   }}>
  //     <Text style={styles.textButton}>
  //       select Rex
  //     </Text>
  //   </TouchableOpacity>
  // </View>
  return (
    <ModalDropdown
      // textStyle={{ fontSize: 18, marginRight: 120, color: 'lightgray' }}
      // style={modalDropdownStyle}
      onSelect={(index, value) => input.onChange(value)} {...rest}
    />
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
    fontSize: 18,
    flex: 2,
  },
  pickerInputStyle: {

  },
  labelStyle: {
    fontSize: 18,
    flex: 1
  },
  modalDropdownStyle: {
    width: 200,
    paddingRight: 30,
    marginRight: 30
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    //borderWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    height: 500,
    paddingVertical: 100,
    paddingLeft: 20,
  },
  textButton: {
    color: 'deepskyblue',
    //borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deepskyblue',
    margin: 2,
  },

  dropdown_1: {
    flex: 1,
    top: 32,
    left: 8,
  },
  dropdown_2: {
    alignSelf: 'flex-end',
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: 150,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_3: {
    width: 150,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#000',
    color: '#fff'
  },
  dropdown_3_dropdownTextHighlightStyle: {
    backgroundColor: '#fff',
    color: '#000'
  },
  dropdown_4: {
    margin: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdown_4_dropdown: {
    width: 100,
  },
  dropdown_5: {
    margin: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdown_6: {
    flex: 1,
    left: 8,
  },
  dropdown_6_image: {
    width: 40,
    height: 40,
  },
}

export { DatePickerInputFormField, Input, TextInputFormField, PickerInputFormField }
