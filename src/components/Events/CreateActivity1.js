/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { connect } from 'react-redux'
import { DatePickerIOS, Picker } from 'react-native'
import { Form, Item } from 'native-base'
import { Field, reduxForm } from 'redux-form'
import {
  DatePickerInputFormField,
  Error,
  PickerInputFormField,
  TextInputFormField
 } from '../common'
 import LoadingButton from '../common/LoadingButton'
 import { activityCategories } from '../common/imageUtils'

const submitButton = require('../../assets/buttons/submit.png')

const CreateActivity = () => {
  const {
    buttonSubmitStyle,
    formStyle,
    itemStyle,
    pickerItemStyle } = styles

  const HEADLINE_FIELD = 'headline'
  const LOCATION_FIELD = 'location'
  const CATEGORY_FIELD = 'category'
  const ACTIVITY_DATE_FIELD = 'activityDate'
  const ACTIVITY_START_TIME_FIELD = 'activityStart'
  const ACTIVITY_END_TIME_FIELD = 'activityEnd'
  const DESCRIPTION_FIELD = 'description_field'
  const TODAY = new Date()
  const TODAY_PLUS_3 = new Date(TODAY.getTime()+1000*60*60*72)
  const TODAY_PLUS_3_END = new Date(TODAY.getTime()+1000*60*60*84)

  const renderCategoryPickerItems = () => {
    return activityCategories.map(category => {
      return (
        <Picker.Item label={category} key={category} value={category} style={pickerItemStyle} />
      )
    })
  }


  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <TextInputFormField
        name={HEADLINE_FIELD}
        // label='First Name'
        placeholder='headline'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
         name={LOCATION_FIELD}
         // label='Last Name'
         placeholder='location'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
         name={DESCRIPTION_FIELD}
         // label='Last Name'
         placeholder='description'
        />
      </Item>

        <Picker
          // selectedValue="Coffee"
          // style={{ height: 100 }}
          onValueChange={value => console.log('category is ', value)}
        >
          {renderCategoryPickerItems()}
        </Picker>
      {/* <Item style={itemStyle}>
       <DatePickerInputFormField
         name={ACTIVITY_DATE_FIELD}
         // label='Birthday'
         placeholder='select date'
         // maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
       />
      </Item> */}
      {/* <Item style={itemStyle}> */}
       <DatePickerIOS
         name={ACTIVITY_START_TIME_FIELD}
         mode="datetime"
         minimumDate={TODAY}
         maximumDate={TODAY_PLUS_3}
         date={TODAY}
         // onDateChange={this.setDate}
         // label='start time'
         placeholder='start time'
       />
        <DatePickerIOS
          name={ACTIVITY_END_TIME_FIELD}
          mode="datetime"
          minimumDate={TODAY}
          maximumDate={TODAY_PLUS_3_END}
          date={TODAY}
          // onDateChange={this.setDate}
          // label='end time'
          placeholder='end time'
        />
      {/* </Item> */}
      {/* <Item style={itemStyle}>
       <DatePickerInputFormField
         name={ACTIVITY_END_TIME_FIELD}
         // label='end time'
         placeholder='end time'
         // maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
       />
      </Item> */}

      <Error />
      <LoadingButton
        source={submitButton}
        style={buttonSubmitStyle}
        transparent
      />
    </Form>
    )
  }

const styles = {
  buttonSubmitStyle: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginTop: 10
  },
  formStyle: {
    marginTop: 15,
    height: 60
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  },
  pickerItemStyle: {
    color: 'red'
  }
}

export default connect(null)(reduxForm({ form: 'createEvent' })(CreateActivity))
