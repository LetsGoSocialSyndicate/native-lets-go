  /*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { Actions } from 'react-native-router-flux'
import { reset } from 'redux-form'
import {
  ADD_NEW_EVENT,
  FEEDS_ACTION_START,
  FEEDS_ACTION_ERROR,
  FETCH_EVENT_FEEDS,
  FETCH_MY_ALL_EVENTS,
  FETCH_MY_EVENTS,
  FETCH_OTHER_ALL_EVENTS,
  COUNT_MY_ALL_EVENTS,
  REACT_APP_API_URL
} from './types'
import { IMAGE_OP_NONE } from './imageOp'
import {
  getRequestOptions,
  getRequestOptionsForMultipart,
  addImageToFormData
} from './actionUtils'

const fetchEventFeeds = (token) => {
  // console.log('fetchEventFeeds', REACT_APP_API_URL)
  const url = `${REACT_APP_API_URL}/events`
  //console.log('fetchEventFeeds')
  return async (dispatch) => {
    // console.log('we are inside the fetch events feed')
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

const fetchMyEventFeeds = (email, hosted, token) => {
  const url = `${REACT_APP_API_URL}/users/${email}/${hosted ? 'hosted' : 'requested'}`
  // console.log('fetchMyEventFeeds', url)
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
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

const fetchMyAllEventFeeds = (id, token) => {
  console.log('fetchMyAllEventFeeds: id', id)
  // console.log('fetchMyAllEventFeeds: token', token)
  const url = `${REACT_APP_API_URL}/users/${id}/all`
  console.log('fetchMyAllEventFeeds', url)
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    console.log('fetchMyAllEventFeeds response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: FETCH_MY_ALL_EVENTS, payload: responseJSON })
    } else {
      const error = responseJSON.message || 'Failed to load events'
      dispatch({ type: FEEDS_ACTION_ERROR, error })
    }
  }
}

const fetchOtherEventFeeds = (email, token) => {
  const url = `${REACT_APP_API_URL}/users/${email}/others`
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    // console.log('opts', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    // console.log('fetchOtherEventFeeds response:', response.status, responseJSON)
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

const countMyAllEventFeeds = (id, token) => {
  // console.log('countMyAllEventFeeds: id', id)
  // console.log('countMyAllEventFeeds: token', token)
  const url = `${REACT_APP_API_URL}/users/${id}/statistics`
  // console.log('fetchMyAllEventFeeds', url)
  return async (dispatch) => {
    dispatch({ type: FEEDS_ACTION_START })
    const opts = getRequestOptions('GET', token)
    // console.log('opts', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    if (response.status === 200) {
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: COUNT_MY_ALL_EVENTS,
        payload: responseJSON
      })
    } else {
      // TODO: handle error
    }
  }
}

const addNewEvent = (newEvent, token) => {
  return async (dispatch) => {
    // console.log('addNewEvent', newEvent)
    dispatch({ type: FEEDS_ACTION_START })
    // dispatch(reset('createActivityForm'))
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
      const error = responseJSON.message || 'Failed to add new event'
      dispatch({ type: FEEDS_ACTION_ERROR, error })
      //dispatch(reset('createActivityForm'))
    }
  }
}

const setFeedsActionError = (error) => {
  return (dispatch) => {
    dispatch({ type: FEEDS_ACTION_ERROR, error })
  }
}

const leavingCreateActivity = () => {
  return (dispatch) => {
    dispatch({ type: FEEDS_ACTION_ERROR, error: null })
    dispatch(reset('createActivityForm'))
  }
}

const updateEventImages = (userId, eventId, token, images = []) => {
  return async (dispatch) => {
    const imageCount = images.filter(image => image.op !== IMAGE_OP_NONE).length
    if (imageCount <= 0) {
      return
    }
    // dispatch({ type: SAVE_USER_START })
    // console.log('updateProfile:request:', userId, newUserInfo, images)
    const url = `${REACT_APP_API_URL}/users/${userId}/${eventId}/images`
    // opts = getRequestOptions('PATCH', token, { images })
    const data = new FormData()
    images.forEach((image, index) => addImageToFormData(data, image, index))
    const opts = getRequestOptionsForMultipart('POST', token, data)
    console.log('updateEventImages:request:', opts)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    console.log('updateEventImages:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: FETCH_MY_ALL_EVENTS, payload: responseJSON })
    } else {
      const error = responseJSON.message || 'Failed to load events'
      dispatch({ type: FEEDS_ACTION_ERROR, error })
    }
  }
}

export {
  fetchEventFeeds,
  addNewEvent,
  fetchMyEventFeeds,
  fetchMyAllEventFeeds,
  fetchOtherEventFeeds,
  countMyAllEventFeeds,
  setFeedsActionError,
  leavingCreateActivity,
  updateEventImages
}
