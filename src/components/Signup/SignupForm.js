/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { ActionSheetIOS, TouchableOpacity, Image } from 'react-native'

import { Form, Item } from 'native-base'
import { DATE_FORMAT } from '../common/Constants'
import {
  DatePickerInputFormField,
  Error,
  PickerInputFormField,
  TextInputFormField
 } from '../common'
 import LoadingButton from '../common/LoadingButton'

 const submitButton = require('../../assets/buttons/submit.png')

 const FIRST_NAME_FIELD = 'firstName'
 const LAST_NAME_FIELD = 'lastName'
 const GENDER_FIELD = 'gender'
 const EMAIL_FIELD = 'email'
 const BIRTHDAY_FIELD = 'birthday'
 export const PASSWORD_FIELD = 'password'
 export const PASSWORD2_FIELD = 'confirmPassword'

// const renderGenderOps = () => {
//   return (
//     <Item
//       onPress={onGenderPress}
//       style={styles.itemStyle}
//     >
//       <TextInputFormField
//         // onClick={onGenderPress}
//         name={GENDER_FIELD}
//         placeholder='select gender'
//       />
//     </Item>
//   )
// }
//
// const onGenderPress = (e, i) => {
//   ActionSheetIOS.showActionSheetWithOptions({
//     options: ['male', 'female'],
//   },
//   (buttonIndex) => {
//     if (buttonIndex === 0) {
//       // this.props.logoutAction()
//     } else {
//       // this.props.logoutAction()
//     }
//   })
// }

 const SignupForm = ({ handleSubmit, auth }) => {
  const {
   buttonSubmitStyle,
   formStyle,
   itemStyle
  } = styles
  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <TextInputFormField
        name={FIRST_NAME_FIELD}
        placeholder='first name'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
         name={LAST_NAME_FIELD}
         placeholder='last name'
        />
      </Item>
      <Item style={itemStyle}>
       <DatePickerInputFormField
         name={BIRTHDAY_FIELD}
         placeholder='select birthday'
         maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
       />
      </Item>
      {/* { renderGenderOps() } */}
      <Item style={itemStyle}>
        <PickerInputFormField
          name={GENDER_FIELD}
          options={['male', 'female']}
        />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={EMAIL_FIELD}
           placeholder='university email'
         />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={PASSWORD_FIELD}
           secureTextEntry
           placeholder='password'
         />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={PASSWORD2_FIELD}
           secureTextEntry
           placeholder='confirm password'
         />
      </Item>
      <Error
        error={auth.error}
      />
      <LoadingButton
        loading={auth.loading}
        onPress={handleSubmit}
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
 export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
