/* Copyright 2018, Socializing Syndicate Corp. */
import {
  REQUEST_SUBMIT,
  REACT_APP_API_URL,
  ACCEPT_REQUEST_TO_JOIN,
  REJECT_REQUEST_TO_JOIN
} from './types'
import { getRequestOptions } from './actionUtils'

const handleRequest = (eventId, token) => {
  return async (dispatch) => {
    const url = `${REACT_APP_API_URL}/events/request/${eventId}`
    const opts = getRequestOptions('POST', token)
    try {
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      // const responseJSON = await response.json()
      // console.log('handleRequest response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({ type: REQUEST_SUBMIT })
      } else {
        // TODO: handle error
      }
    } catch (error) {
      // TODO: handle error
    }
  }
}

const acceptRequest = (eventId, requestorId, token) => {
  return async (dispatch) => {
    const url = `${REACT_APP_API_URL}/events/accept/${eventId}/${requestorId}`
    const opts = getRequestOptions('PATCH', token)
    try {
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      // const responseJSON = await response.json()
      // console.log('acceptRequest response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({ type: ACCEPT_REQUEST_TO_JOIN })
        // TODO: delete from messages?
      } else {
        // TODO: handle error
      }
    } catch (error) {
      // TODO: handle error
    }
  }
}

const rejectRequest = (eventId, requestorId, token) => {
  return async (dispatch) => {
    const url = `${REACT_APP_API_URL}/events/reject/${eventId}/${requestorId}`
    const opts = getRequestOptions('PATCH', token)
    try {
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      // const responseJSON = await response.json()
      // console.log('acceptRequest response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({ type: REJECT_REQUEST_TO_JOIN })
        // TODO: delete from messages?
      } else {
        // TODO: handle error
      }
    } catch (error) {
      // TODO: handle error
    }
  }
}

export {
  handleRequest,
  acceptRequest,
  rejectRequest
}
