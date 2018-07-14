/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { FETCH_EVENT_FEEDS, ADD_NEW_EVENT, FETCH_MY_EVENTS } from './types'
import { getRequestOptions } from './actionUtils'

const fetchEventFeeds = (token) => {
  const url = `${process.env.REACT_APP_API_URL}/events`
  //console.log('fetchEventFeeds')
  return async (dispatch) => {
    console.log('we are inside the fetch events feed')
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts)
    if(response.status === 200){
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: FETCH_EVENT_FEEDS,
        payload: responseJSON
      })
    }
    else {
      // error
    }
  }
}

const fetchMyEventFeeds = (user, hosted, token) => {
  const url = `${process.env.REACT_APP_API_URL}/users/${user.email}/${hosted ? 'hosted' : 'requested'}`
  console.log('fetchMyEventFeeds', url)
  return async (dispatch) => {
    const opts = getRequestOptions('GET', token)
    console.log('user', user)
    console.log('token', token)
    console.log('opts', opts)
    const response = await fetch(url, opts)
    if(response.status === 200){
      const responseJSON = await response.json()
      // console.log('responseJSON', responseJSON)
      dispatch({
        type: FETCH_MY_EVENTS,
        payload: responseJSON
      })
    }
    else {
      // error
    }
  }
}

const addNewEvent = (newEvent, token, history) => {
  console.log('addNewEvent', token)
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/events`
    // console.log('url', url)
    const opts = getRequestOptions('POST', token, newEvent)
    const response = await fetch(url, opts)
    if(response.status === 200){
      const responseJSON = await response.json()
      dispatch({
        type: ADD_NEW_EVENT,
        payload: responseJSON
      })
      history.push("/")
    }
    else {
      // error
    }
  }
}

export { fetchEventFeeds, addNewEvent, fetchMyEventFeeds }

// export const initialize = () => {
//   return async (dispatch) => {
//     console.log('1. we are in initialize action')
//     let newMessages = []
//     const messagesResponse = await fetch(`/api/messages`)
//     if (messagesResponse.status === 200) {
//       const messagesJSON = await messagesResponse.json()
//       newMessages = messagesJSON._embedded.messages
//     }
//     dispatch({
//       type: INITIALIZE,
//       messages: newMessages
//     })
//   }
// }
