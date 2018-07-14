/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Item, Form } from 'native-base'
import { Image } from 'react-native'
import { Error, TextInputFormField } from '../common'
import LoadingButton from '../common/LoadingButton'

export const VERIFICATION_CODE = 'VERIFICATION_CODE'
export const PASSWORD_FIELD = 'password'
export const PASSWORD2_FIELD = 'confirmPassword'

const submitButton = require('../../assets/buttons/submit.png')

const NewPasswordForm = ({ handleSubmit, auth }) => {
  const {
   formStyle,
   itemStyle,
   buttonSubmitStyle,
   buttonSubmitImageStyle
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
       <LoadingButton
         style={buttonSubmitStyle}
         transparent
         loading={auth.loading}
         onPress={handleSubmit}
       >
         <Image source={submitButton} style={buttonSubmitImageStyle} />
       </LoadingButton>
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
      marginTop: 10
    },
    buttonSubmitImageStyle: {
      width: 150,
      height: 50,
      alignSelf: 'center',
    }
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth }
  }
  export default connect(mapStateToProps)(reduxForm({ form: 'newPassword' })(NewPasswordForm))
