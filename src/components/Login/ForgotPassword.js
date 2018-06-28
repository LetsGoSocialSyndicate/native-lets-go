import React from 'react'
import { connect } from 'react-redux'
import { sendCodeForPassword } from '../../actions/authAction'
import ForgotPasswordForm, { EMAIL_FIELD } from './ForgotPasswordForm'

const ForgotPassword = ({ sendCodeAction }) => {
  const action = (fields) => sendCodeAction(fields[EMAIL_FIELD])
  return (<ForgotPasswordForm onSubmit={action} />)
}

const actions = {
  sendCodeAction: sendCodeForPassword,
}
export default connect(null, actions)(ForgotPassword)
