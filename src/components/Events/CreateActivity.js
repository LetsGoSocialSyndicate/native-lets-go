/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'
// TODO - check actions
//import { createAction, errorAction } from '../../actions/authAction'
import CreateActivityForm from './CreateActivityForm'


// const onSubmit = (action, errorAction, fields) => {
//   console.log('onSubmit:', fields)
//   //const error = validate(fields)
//   //TODO: check if we need to validate something
//   if (error) {
//     errorAction(error)
//   } else {
//     action(fields)
//   }
// }

//need to pass later :{ createAction, errorAction }
const CreateActivity = () => {
  //const action = (fields) => onSubmit(signupAction, errorAction, fields)
  // return (<CreateActivityForm onSubmit={action} />)
  return (<CreateActivityForm />)
}

const actions = {
  // signupAction: signupSubmit,
  // errorAction: setSignupError
}
export default connect(null, actions)(CreateActivity)
