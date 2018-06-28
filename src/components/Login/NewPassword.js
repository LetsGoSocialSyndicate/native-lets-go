import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { setSignupError, verifyCode } from '../../actions/authAction'
import { Card, CardSection } from '../common'
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
  if (!auth.email) {
    return (
      <Card>
        <CardSection>
          <Text>Something went wrong - email is undefined.</Text>
        </CardSection>
      </Card>
    )
  }
  const action = (fields) => onSubmit(verifyCodeAction, errorAction, fields, auth.email)
  return (
    <Card>
      <CardSection>
        <Text>Please check {auth.email} for a verification code:</Text>
      </CardSection>
      <NewPasswordForm onSubmit={action} />
    </Card>
  )
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
