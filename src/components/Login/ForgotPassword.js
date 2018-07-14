import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { Form, H1 } from 'native-base'
import { sendCodeForPassword } from '../../actions/authAction'
import ForgotPasswordForm, { EMAIL_FIELD } from './ForgotPasswordForm'

const ForgotPassword = ({ sendCodeAction }) => {
  const action = (fields) => sendCodeAction(fields[EMAIL_FIELD])
  const {
   formStyle,
   forgotTextStyle,
   h1Style
  } = styles
  return (
    <Form style={formStyle}>
      <H1 style={h1Style}>FORGOT PASSWORD?</H1>
        <Text style={forgotTextStyle}>
          Well, let's fix that! Enter your university email address
          and we'll send you a code to reset!
        </Text>
        <ForgotPasswordForm onSubmit={action} />
    </Form>
  )
}

const styles = {
  formStyle: {
    marginTop: 10,
    height: 400
  },
  h1Style: {
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
  },
  forgotTextStyle: {
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 20,
    color: 'white',
    height: 150,
    letterSpacing: 2
  },
}

const actions = {
  sendCodeAction: sendCodeForPassword,
}
export default connect(null, actions)(ForgotPassword)
