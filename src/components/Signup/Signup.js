/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'

import SignupForm from './SignupForm'
import { signupSubmit } from '../../actions/authAction'

const onSubmit = (action, fields) => {
  console.log('Signup ON SUBMIT:', fields)
  action(fields)
}

const Signup = ({ signupAction }) => {
  const action = (fields) => onSubmit(signupAction, fields)
  return (<SignupForm onSubmit={action} />)
}

const actions = {
  signupAction: signupSubmit
}
export default connect(null, actions)(Signup)
