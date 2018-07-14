import React from 'react'
import { Text } from 'react-native'
import { Item, Form, H1 } from 'native-base'
import { connect } from 'react-redux'
import { setSignupError, verifyCode } from '../../actions/authAction'
import NewPasswordForm, {
  VERIFICATION_CODE,
  PASSWORD_FIELD,
  PASSWORD2_FIELD
} from './NewPasswordForm'

const validate = (fields) => {
  let error = null
  if (fields[PASSWORD_FIELD] !== fields[PASSWORD2_FIELD]) {
    error = 'Password does not match'
  }
  return error
}

const onSubmit = (action, errorAction, fields, email) => {
  console.log('onSubmit:', fields)
  const error = validate(fields)
  if (error) {
    errorAction(error)
  } else {
    action(fields[VERIFICATION_CODE], email, fields[PASSWORD_FIELD])
  }
}

const NewPassword = ({ auth, verifyCodeAction, errorAction }) => {
  const {
   formStyle,
   itemStyle,
   verificationTextStyle,
   h1Style
  } = styles
  if (!auth.email) {
    return (
      <Form style={formStyle}>
        <Item style={itemStyle}>
          <Text>Something went wrong - email is undefined.</Text>
        </Item>
      </Form>
    )
  }
  const action = (fields) => onSubmit(verifyCodeAction, errorAction, fields, auth.email)
  return (
    <Form style={formStyle}>
      <H1 style={h1Style}>PASSWORD RESET</H1>
      <Text style={verificationTextStyle}>Please check {auth.email} for a verification code:</Text>
      <NewPasswordForm onSubmit={action} />
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
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    borderBottomWidth: 0,
  },
  verificationTextStyle: {
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 20,
    color: 'white',
    height: 100,
    letterSpacing: 2
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const actions = {
  errorAction: setSignupError,
  verifyCodeAction: verifyCode
}
export default connect(mapStateToProps, actions)(NewPassword)
