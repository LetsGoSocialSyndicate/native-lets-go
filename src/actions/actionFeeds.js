/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { Actions } from 'react-native-router-flux'
import {
  ADD_NEW_EVENT,
  FEEDS_ACTION_START,
  FEEDS_ACTION_FAILED,
  FETCH_EVENT_FEEDS,
  FETCH_MY_ALL_EVENTS,
  FETCH_MY_EVENTS,
  FETCH_OTHER_ALL_EVENTS
} from './types'
import { getRequestOptions } from './actionUtils'

// import { REACT_APP_API_URL } from 'react-native-dotenv'
const REACT_APP_API_URL = 'http://localhost:8000'

const fetchEventFeeds = (token) => {
  console.log('fetchEventFeeds', REACT_APP_API_URL)
  const url = `${REACT_APP_API_URL}/events`
  //console.log('fetchEventFeeds')
  return async (dispatch) => {
    console.log('we are inside the fetch events feed')
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    if (response.status === 200) {
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: FETCH_EVENT_FEEDS,
        payload: responseJSON
      })
    } else {
      // TODO: handle error
    }
  }
}

const fetchMyEventFeeds = (user, hosted, token) => {
  const url = `${REACT_APP_API_URL}/users/${user.email}/${hosted ? 'hosted' : 'requested'}`
  console.log('fetchMyEventFeeds', url)
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    console.log('user', user)
    console.log('token', token)
    console.log('opts', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    if (response.status === 200) {
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: FETCH_MY_EVENTS,
        payload: responseJSON
      })
    } else {
      // TODO: handle error
    }
  }
}

const fetchMyAllEventFeeds = (user, token) => {
  console.log('fetchMyAllEventFeeds: user', user)
  console.log('fetchMyAllEventFeeds: token', token)
  const url = `${REACT_APP_API_URL}/users/${user.email}/all`
  console.log('fetchMyAllEventFeeds', url)
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    console.log('opts', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    if (response.status === 200) {
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: FETCH_MY_ALL_EVENTS,
        payload: responseJSON
      })
    } else {
      // TODO: handle error
    }
  }
}

const fetchOtherEventFeeds = (user, token) => {
  console.log('fetchOtherEventFeeds: user', user)
  const url = `${REACT_APP_API_URL}/users/${user.email}/others`
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    console.log('opts', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    console.log('fetchOtherEventFeeds response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({
        type: FETCH_OTHER_ALL_EVENTS,
        payload: responseJSON
      })
    } else {
      // error
    }
  }
}

const addNewEvent = (newEvent, token) => {
  console.log('addNewEvent', token)

  return async (dispatch) => {
    dispatch({ type: FEEDS_ACTION_START })
    const url = `${REACT_APP_API_URL}/events`
    const opts = getRequestOptions('POST', token, newEvent)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    console.log('addNewEvent response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: ADD_NEW_EVENT, payload: responseJSON })
      //TODO: Later redirect to "My activities", not to "Feeds"
      Actions.myActivities()
    } else {
      dispatch({ type: FEEDS_ACTION_FAILED, error: responseJSON.message })
    }
  }
}

export {
  fetchEventFeeds,
  addNewEvent,
  fetchMyEventFeeds,
  fetchMyAllEventFeeds,
  fetchOtherEventFeeds
}
