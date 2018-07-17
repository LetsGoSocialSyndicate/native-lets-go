/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React from 'react'
import { Form, Item } from 'native-base'
import { TextInput } from 'react-native'
import { DATE_FORMAT } from '../common/Constants'
import {
  DatePickerInputFormField,
  Error,
  Input
 } from '../common'
import LoadingButton from '../common/LoadingButton'

const submitButton = require('../../assets/buttons/submit.png')

const FIRST_NAME_FIELD = 'firstName'
const LAST_NAME_FIELD = 'lastName'
const BIRTHDAY_FIELD = 'birthday'
// const ABOUT = 'about'

const saveAbout = (about) => {
  this.setState({ ...this.state, user: { ...this.state.user, about } })
}

const ProfileEditForm = () => {
  const {
    formStyle,
    itemStyle,
    descriptionTextStyle,
    buttonSubmitStyle
  } = styles
  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <Input
        name={FIRST_NAME_FIELD}
        placeholder='this user first name'
        />
      </Item>

      <Item style={itemStyle}>
        <Input
         name={LAST_NAME_FIELD}
         placeholder='this user last name'
        />
      </Item>
      <Item style={itemStyle}>
        <Input
         // name={LAST_NAME_FIELD}
         placeholder='this user age'
        />
      </Item>
      {/* This is Redux:
        <Item style={itemStyle}>
          <DatePickerInputFormField
            name={BIRTHDAY_FIELD}
            placeholder='current user age'
            maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
          />
        </Item> */}
      <TextInput
        style={descriptionTextStyle}
        value='This user description'
        editable='true'
        multiline
        numberOfLines={10}
        onChangeText={saveAbout}
      />
      <Error />
      <LoadingButton
        style={buttonSubmitStyle}
        transparent
        source={submitButton}
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
     height: 350
   },
   itemStyle: {
     marginLeft: 50,
     marginRight: 50,
     marginTop: 10
   },
   descriptionTextStyle: {
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 18,
      color: 'white',
      backgroundColor: '#4380B0',
      borderRadius: 15,
      height: 80,
      width: 300
    },
 }

 export default ProfileEditForm
