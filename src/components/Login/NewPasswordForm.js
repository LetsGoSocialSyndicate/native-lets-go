/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Item, Form } from 'native-base'
import {
  Error, TextInputFormField,
  LoadingButton, ImageButton
} from '../common'

export const VERIFICATION_CODE = 'VERIFICATION_CODE'
export const PASSWORD_FIELD = 'password'
export const PASSWORD2_FIELD = 'confirmPassword'

const submitButton = require('../../assets/buttons/submit.png')

const NewPasswordForm = ({ handleSubmit, auth }) => {
  const {
   formStyle,
   itemStyle,
   buttonSubmitStyle
  } = styles
   return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
          <TextInputFormField
            name={VERIFICATION_CODE}
            placeholder='verification code'
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
       <Error error={auth.error} />

       {/* TODO add spinner here!!! */}
       <ImageButton onPress={handleSubmit}
         buttonSource={submitButton}/>
         {/* <LoadingButton loading={auth.loading} onPress={handleSubmit}>
           Verify
         </LoadingButton> */}
     </Form>
    )
  }
  const styles = {
    formStyle: {
      height: 200
    },
    itemStyle: {
      marginLeft: 50,
      marginRight: 50,
      marginTop: 10
    },
    buttonSubmitStyle: {
      resizeMode: 'contain',
      width: 150,
      height: 50,
      alignSelf: 'center',
      marginTop: 20
    },
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth }
  }
  export default connect(mapStateToProps)(reduxForm({ form: 'newPassword' })(NewPasswordForm))
