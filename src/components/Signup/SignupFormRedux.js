/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { Picker, Text, Field } from 'react-native'
 import { reduxForm } from 'redux-form'
 import { connect } from 'react-redux'
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

 const SignupForm = ({ handleSubmit, auth }) => {
  return (
    <Card>
      <CardSection>
         <TextInputFormField
           name={FIRST_NAME_FIELD}
           label='First Name'
           placeholder='Scott'
         />
      </CardSection>
      <CardSection>
         <TextInputFormField
           name={LAST_NAME_FIELD}
           label='Last Name'
           placeholder='Bean'
         />
      </CardSection>
      <CardSection>
         <TextInputFormField
           name={BIRTHDAY_FIELD}
           label='Birthday'
           placeholder='18+'
         />
      </CardSection>
      <CardSection>
        <Picker
          selectedValue="js"
          style={{ height: 50, width: 100 }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        {/* <PickerInputFormField
          name={GENDER_FIELD}
          label='Gender'
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </PickerInputFormField> */}

         {/* <TextInputFormField
           name={GENDER_FIELD}
           label='Gender'
           placeholder='Male'
         /> */}
      </CardSection>
      <CardSection>
         <TextInputFormField
           name={EMAIL_FIELD}
           label='Email'
           placeholder='email@gmail.com'
         />
      </CardSection>
      <CardSection>
         <TextInputFormField
           name={PASSWORD_FIELD}
           secureTextEntry
           label='Password'
         />
      </CardSection>
      <CardSection>
         <TextInputFormField
           name={PASSWORD2_FIELD}
           secureTextEntry
           label='Confirm password'
         />
      </CardSection>
      <Error error={auth.error} />
      <CardSection>
        <LoadingButton loading={auth.loading} onPress={handleSubmit}>
          Signup
        </LoadingButton>
      </CardSection>
    </Card>
   )
 }

 const mapStateToProps = (state) => {
   return { auth: state.auth }
 }
 export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
