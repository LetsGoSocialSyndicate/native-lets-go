/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewEvent, setFeedsActionError } from '../../actions/actionFeeds'
import CreateActivityForm, {
  ACTIVITY_START_TIME_FIELD,
  ACTIVITY_END_TIME_FIELD
} from './CreateActivityForm'
import { DATETIME_SHORT_FORMAT, DATETIME_FORMAT } from '../common/Constants'

const COMBINED_DATETIME_FORMAT = `YYYY ${DATETIME_SHORT_FORMAT}`

// const timeConvertor = (TIME_FORMAT) => {
//   let ampm = null
//   hour <= 11 ? ampm = 'am' : ampm = 'pm'
//   if (hour > 12) {
//     hour -= 12
//   }
//   if (hour === 0) {
//     hour = 12
//   }
// }

const formatFullDate = partialDate => {
  const fullDate = moment(`${moment().format('YYYY')} ${partialDate}`, COMBINED_DATETIME_FORMAT)
  let currentYear = Number(moment().format('YYYY'))
  const currentMonth = Number(moment().format('MM'))
  const requestedMonth = Number(fullDate.format('MM'))
  // This works with assumption that you cannot schedule event more than 1 year ahead
  if (requestedMonth < currentMonth) {
    currentYear += 1
  }
  return moment(`${currentYear} ${partialDate}`, COMBINED_DATETIME_FORMAT).format(DATETIME_FORMAT)
}

const validate = (fields) => {
  let error = null
  const start = moment(fields[ACTIVITY_START_TIME_FIELD])
  const end = moment(fields[ACTIVITY_END_TIME_FIELD])
  if (start > end) {
    error = 'Wrong end date.'
  }
  return error
}

const formatFields = (fields) => {
  const start_time = formatFullDate(fields.start_time) // eslint-disable-line camelcase
  const end_time = formatFullDate(fields.end_time) // eslint-disable-line camelcase
  return { ...fields, start_time, end_time }
}
const onSubmit = (action, errorAction, token, fields) => {
  const updatedFields = formatFields(fields)
  console.log('CreateActivity.onSubmit:', updatedFields)
  const error = validate(updatedFields)
  if (error) {
    errorAction(error)
  } else {
    action(updatedFields, token)
  }
}

class CreateActivity extends Component {
  onExit() {
    console.log('CreateActivity::onExit')
  }
  render() {
    const { auth, addNewEventAction, setFeedsErrorAction } = this.props
    const action = (fields) => onSubmit(addNewEventAction, setFeedsErrorAction, auth.token, fields)
    return (<CreateActivityForm onSubmit={action} />)
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
const actions = {
  addNewEventAction: addNewEvent,
  setFeedsErrorAction: setFeedsActionError
}
export default connect(mapStateToProps, actions)(CreateActivity)
