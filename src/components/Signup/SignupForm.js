/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { DATE_FORMAT } from '../common/Constants'
import {
  Card,
  CardSection,
  DatePickerInputFormField,
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
         <DatePickerInputFormField
           name={BIRTHDAY_FIELD}
           label='Birthday'
           placeholder='18+'
           maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
         />
      </CardSection>
      <CardSection>
        <PickerInputFormField
          name={GENDER_FIELD}
          label='Gender'
          options={['Male', 'Female']}
        />
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
      <Error
        style={styles.errorTextStyle}
        error={auth.error}
      />
      <CardSection>
        <LoadingButton loading={auth.loading} onPress={handleSubmit}>
          Signup
        </LoadingButton>
      </CardSection>
    </Card>
   )
 }

 const styles = {
   errorTextStyle: {
     fontSize: 20,
     alignSelf: 'center',
     color: 'red'
   }
 }

 const mapStateToProps = (state) => {
   return { auth: state.auth }
 }
 export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
