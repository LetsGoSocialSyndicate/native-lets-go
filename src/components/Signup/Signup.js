/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { signupSubmit, setSignupError } from '../../actions/authAction'
import { DATE_FORMAT } from '../common/Constants'
import SignupForm, {
  PASSWORD_FIELD,
  PASSWORD2_FIELD
} from './SignupForm'

const validate = (fields) => {
  let error = null
  const minAge = moment().utc().subtract(18, 'years').format(DATE_FORMAT)
  const isbefore = moment(fields.birthday).isBefore(minAge)
  if (!isbefore) {
    error = 'Your age must be 18+'
  } else if (fields[PASSWORD_FIELD] !== fields[PASSWORD2_FIELD]) {
    error = 'Password does not match'
  }
  return error
}

const onSubmit = (action, errorAction, fields) => {
  console.log('onSubmit:', fields)
  const error = validate(fields)
  if (error) {
    errorAction(error)
  } else {
    action(fields)
  }
}

const Signup = ({ signupAction, errorAction }) => {
  const action = (fields) => onSubmit(signupAction, errorAction, fields)
  return (<SignupForm onSubmit={action} />)
}

const actions = {
  signupAction: signupSubmit,
  errorAction: setSignupError
}
export default connect(null, actions)(Signup)
