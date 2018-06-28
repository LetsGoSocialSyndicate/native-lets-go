/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import {Picker, Text, Field} from 'react-native'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment';
import { Actions } from 'react-native-router-flux'
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form'
import {
  Card,
  CardSection,
  Error,
  LoadingButton,
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

const SignupForm = ({auth, navigator}) => {
  return (
    <GiftedForm
      formName='signupForm'
      openModal={(route) => {
        console.log("route:", route)
        Actions.formModal({
              title: route.getTitle(),
              renderScene: route.renderScene,
              // Default button:
              renderRightButton: route.renderRightButton.bind(route, Actions),
              // Custom button:
              // onRight: route.onClose.bind(null, null, Actions)
            })
      }}
    clearOnClose={false}
    validators={{
    birthday: {
      title: 'Birthday',
      validate: [{
        validator: 'isBefore',
        arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
        message: 'You must be at least 18 years old'
      }, {
        validator: 'isAfter',
        arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
        message: '{TITLE} is not valid'
      }]
    }
  }}
    >

    <GiftedForm.SeparatorWidget/>

    <GiftedForm.TextInputWidget
      name='firstName'
      title='First Name'
      placeholder='Dudo4ka'
      clearButtonMode='while-editing'
    />
    <GiftedForm.SeparatorWidget />
    <GiftedForm.TextInputWidget
      name='lastName'
      title='Last Name'
      placeholder='Dudo4ka'
      clearButtonMode='while-editing'
    />
    <GiftedForm.SeparatorWidget />
    <GiftedForm.ModalWidget
      title='Birthday'
      displayValue='birthday'
      scrollEnabled={false}
    >
      <GiftedForm.DatePickerIOSWidget
        name='birthday'
        mode='date'
        getDefaultDate={() => {
          return new Date(((new Date()).getFullYear() - 18)+'');
        }}
      />
    </GiftedForm.ModalWidget>
    <GiftedForm.SeparatorWidget />
    <GiftedForm.ModalWidget
       title='Gender'
       displayValue='gender'
     >
      <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
        <GiftedForm.OptionWidget title='Female' value='Female'/>
        <GiftedForm.OptionWidget title='Male' value='Male'/>
      </GiftedForm.SelectWidget>
    </GiftedForm.ModalWidget>
    <GiftedForm.SeparatorWidget />
    <GiftedForm.TextInputWidget
       name='email'
       title='Email Address'
       placeholder='email@gmail.com'
       keyboardType='email-address'
       clearButtonMode='while-editing'
     />
     <GiftedForm.SeparatorWidget />
     <GiftedForm.TextInputWidget
       name='password'
       title='Password'
       placeholder='******'
       clearButtonMode='while-editing'
       secureTextEntry={true}
     />
     <GiftedForm.SeparatorWidget />
     <GiftedForm.TextInputWidget
       name='confirmPassword'
       title='Confirm Password'
       placeholder='******'
       clearButtonMode='while-editing'
       secureTextEntry={true}
     />
     <GiftedForm.SeparatorWidget />
    <Error error={auth.error} />
    <GiftedForm.SubmitWidget title='Sign up'
      onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
        console.log("GIFTED FORM: isValid", isValid)
        console.log("GIFTED FORM: values", values)
        console.log("GIFTED FORM: validationResults", validationResults)
        postSubmit()
      }}/>
  </GiftedForm>)
}

const mapStateToProps = (state) => {
  return {auth: state.auth}
}
export default connect(mapStateToProps)(SignupForm)
