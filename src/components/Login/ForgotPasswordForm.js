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

export const EMAIL_FIELD = 'email'
const submitButton = require('../../assets/buttons/submit.png')

const ForgotPasswordForm = ({ handleSubmit, auth }) => {
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
          name={EMAIL_FIELD}
          placeholder='university email'
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
  export default connect(mapStateToProps)(reduxForm({ form: 'forgotPassword' })(ForgotPasswordForm))
