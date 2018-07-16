/* Copyright 2018, Socializing Syndicate Corp. */
import {
  REQUEST_SUBMIT,
  HOST_VIEW_REQUEST
} from './types'
import { getRequestOptions } from './actionUtils'

// import { REACT_APP_API_URL } from 'react-native-dotenv'
const REACT_APP_API_URL = 'http://localhost:8000'

const handleRequest = (e_id, u_id, token) => {
  console.log('i am here in the handleRequest')
  return async (dispatch) => {
    console.log('this is event id', e_id)
    console.log('this is user id', u_id)

    const url = `${REACT_APP_API_URL}/events/request/${e_id}`
    const opts = getRequestOptions('POST', token)
    const response = await fetch(url, opts)
    if (response.status === 200) {
      const responseJSON = await response.json()

      dispatch({type: REQUEST_SUBMIT, userId: u_id})
    }
  }
}

const hostViewRequest = (history) => {
  return (dispatch) => {
    dispatch({ type: HOST_VIEW_REQUEST })
    if (history) {
      history.push('/:email/hosted')
    }
  }
}

export {
  handleRequest
}
