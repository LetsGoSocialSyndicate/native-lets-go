/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Item, Form } from 'native-base'
import { Image, TouchableHighlight } from 'react-native'
import { Error, TextInputFormField } from '../common'

export const VERIFICATION_CODE = 'VERIFICATION_CODE'
const submitButton = require('../../assets/buttons/submit.png')

const VerifySignupForm = ({ handleSubmit, auth }) => {
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
      <Error error={auth.error} />

      {/* TODO add spinner here!!! */}
      <TouchableHighlight onPress={handleSubmit}>
        <Image
          source={submitButton}
          style={buttonSubmitStyle}
        />
      </TouchableHighlight>
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
      // resizeMode: 'contain',
      width: 150,
      height: 50,
      alignSelf: 'center',
      marginTop: 10
    },
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth }
  }
  export default connect(mapStateToProps)(reduxForm({ form: 'verifySignup' })(VerifySignupForm))
