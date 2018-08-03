/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Form, Item } from 'native-base'
import { CONTENT_HEIGHT } from '../common/Constants'
import {
  DatePickerInputFormField,
  Error,
  PickerSelectInputFormFieldGender,
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

 const SignupForm = ({ handleSubmit, auth }) => {
  const {
   buttonSubmitStyle,
   formStyle,
   itemStyle,
   errorItemStyle,
  } = styles
  return (
    <ScrollView style={styles.outterContainerStyle}>
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
        <Item style={{ ...itemStyle, marginLeft: 48 }}>
         <DatePickerInputFormField
           name={BIRTHDAY_FIELD}
           placeholder='select birthday'
         />
        </Item>
        <Item style={itemStyle}>
          <PickerSelectInputFormFieldGender
            name={GENDER_FIELD}
            placeholder={{ label: 'select gender', value: null }}
            items={[
              { label: 'male',
                value: 'male',
                key: 'male'
              },
              { label: 'female',
                value: 'female',
                key: 'female'
              }]}
            hideIcon
            hideDoneBar
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

        <Item style={errorItemStyle}>
          <Error
            error={auth.error}
          />
        </Item>

        <LoadingButton
          loading={auth.loading}
          onPress={handleSubmit}
          style={buttonSubmitStyle}
          transparent
          source={submitButton}
        />
      </Form>
    </ScrollView>
   )
 }

 const styles = {
   outterContainerStyle: {
     backgroundColor: 'transparent',
     height: CONTENT_HEIGHT,
   },
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
   errorItemStyle: {
     borderBottomWidth: 0,
     marginLeft: 50,
     marginRight: 50,
     marginTop: 10,
     justifyContent: 'center'
   },
 }

 const mapStateToProps = (state) => {
   return { auth: state.auth }
 }
 export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
