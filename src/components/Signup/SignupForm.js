/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
  Item,
  Input,
  Form,
  Button,
  Text
} from 'native-base'
import { DATE_FORMAT } from '../common/Constants'
import {
  DatePickerInputFormField,
  Error,
  // LoadingButton,
  PickerInputFormField,
  TextInputFormField
 } from '../common'


 const FIRST_NAME_FIELD = 'firstName'
 const LAST_NAME_FIELD = 'lastName'
 const GENDER_FIELD = 'gender'
 const EMAIL_FIELD = 'email'
 const BIRTHDAY_FIELD = 'birthday'
 export const PASSWORD_FIELD = 'password'
 export const PASSWORD2_FIELD = 'confirmPassword'

 const SignupForm = ({ handleSubmit, auth }) => {
  const {
   buttonSubmitStyle,
   textStyleSubmit,
   formStyle,
   // PickerInputFormFieldStyle,
   itemStyle
  } = styles
  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <TextInputFormField
        name={FIRST_NAME_FIELD}
        // label='First Name'
        placeholder='first name'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
         name={LAST_NAME_FIELD}
         // label='Last Name'
         placeholder='last name'
        />
      </Item>
      <Item style={itemStyle}>
       <DatePickerInputFormField
         name={BIRTHDAY_FIELD}
         // label='Birthday'
         placeholder='select birthday'
         maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
       />
      </Item>
      <Item style={itemStyle}>
        <PickerInputFormField
          name={GENDER_FIELD}
          // label='Gender'
          options={['Male', 'Female']}
        />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={EMAIL_FIELD}
           // label='Email'
           placeholder='university email'
         />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={PASSWORD_FIELD}
           secureTextEntry
           placeholder='password'
           // label='Password'
         />
      </Item>
      <Item style={itemStyle}>
         <TextInputFormField
           name={PASSWORD2_FIELD}
           secureTextEntry
           placeholder='confirm password'
           // label='Password'
         />
      </Item>
      <Error
        error={auth.error}
      />
      <Button
        loading={auth.loading}
        onPress={handleSubmit}
        style={buttonSubmitStyle}
        block
        rounded
      >
        <Text style={textStyleSubmit}>
          sign up
        </Text>
      </Button>
    </Form>
   )
 }

 const styles = {
   buttonSubmitStyle: {
     marginTop: 50,
     marginLeft: 10,
     marginRight: 10,
     marginBottom: 20,
     backgroundColor: '#4380B0',
     alignSelf: 'center',
   },
   textStyleSubmit: {
     letterSpacing: 3,
   },
   formStyle: {
     marginTop: 35,
     height: 60
   },
   itemStyle: {
     marginLeft: 50,
     marginRight: 50,
     marginTop: 10
   }
 }

 const mapStateToProps = (state) => {
   return { auth: state.auth }
 }
 export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
