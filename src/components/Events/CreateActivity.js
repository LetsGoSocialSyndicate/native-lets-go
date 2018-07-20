/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'
import { addNewEvent } from '../../actions/actionFeeds'
import CreateActivityForm from './CreateActivityForm'


const onSubmit = (action, token, fields) => {
  console.log('CreateActivity.onSubmit:', fields)
  //const error = validate(fields)
  //TODO: validate and handle error, probably need to define errorAction
  action(fields, token)
}

const CreateActivity = ({ auth, addNewEventAction }) => {
  const action = (fields) => onSubmit(addNewEventAction, auth.token, fields)
  return (<CreateActivityForm onSubmit={action} />)
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
const actions = {
  addNewEventAction: addNewEvent
}
export default connect(mapStateToProps, actions)(CreateActivity)
