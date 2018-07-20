/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
//import moment from 'moment'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { ActionSheetIOS, TouchableOpacity, Image } from 'react-native'
import { Form, Item } from 'native-base'
// import { DATE_FORMAT } from '../common/Constants'
import {
  DateTimePickerInputFormField,
  // Error,
  // PickerInputFormField,
  TextInputFormField
 } from '../common'
 import LoadingButton from '../common/LoadingButton'
 // import { activityCategories } from '../common/imageUtils'

 const submitButton = require('../../assets/buttons/submit.png')

 const HEADLINE_FIELD = 'headline'
 const LOCATION_FIELD = 'location'
 // const CATEGORY_FIELD = 'category'
 // const ACTIVITY_DATE_FIELD = 'activityDate'
 const ACTIVITY_START_TIME_FIELD = 'activityStart'
 const ACTIVITY_END_TIME_FIELD = 'activityEnd'
 const DESCRIPTION_FIELD = 'description_field'
 const TODAY = new Date()
 const TODAY_PLUS_3 = new Date(TODAY.getTime() + (1000 * 60 * 60 * 72))
 const TODAY_PLUS_3_END = new Date(TODAY.getTime() + (1000 * 60 * 60 * 84))

 const CreateActivityForm = () => {
  const {
   buttonSubmitStyle,
   formStyle,
   itemStyle
  } = styles

  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <TextInputFormField
          name={HEADLINE_FIELD}
          placeholder='headline'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
          name={LOCATION_FIELD}
          placeholder='location'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
          name={DESCRIPTION_FIELD}
          placeholder='description'
          multiline
          // numberOfLne={4}
        />
      </Item>
      <Item style={itemStyle}>
       <DateTimePickerInputFormField
         name={ACTIVITY_START_TIME_FIELD}
         placeholder='start time'
         minDate={TODAY}
         maxDate={TODAY_PLUS_3}
       />
      </Item>

      <Item style={itemStyle}>
       <DateTimePickerInputFormField
         name={ACTIVITY_END_TIME_FIELD}
         placeholder='end time'
         minDate={TODAY}
         maxDate={TODAY_PLUS_3_END}
       />
      </Item>

      <LoadingButton
        // loading={auth.loading}
        // onPress={handleSubmit}
        style={buttonSubmitStyle}
        source={submitButton}
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
     marginTop: 35,
     height: 60
   },
   itemStyle: {
     marginLeft: 50,
     marginRight: 50,
     marginTop: 10
   },
 }

 const mapStateToProps = (state) => {
   return { auth: state.auth }
 }
export default connect(mapStateToProps)(reduxForm({ form: 'createActivityForm' })(CreateActivityForm))
