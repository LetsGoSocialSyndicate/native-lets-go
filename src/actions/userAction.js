/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import { REACT_APP_API_URL } from 'react-native-dotenv'
 import { Actions } from 'react-native-router-flux'
 import { getRequestOptions } from './actionUtils'

 import {
   FETCH_USER,
   EDIT_USER_START,
   EDIT_USER_SUCCESS,
   EDIT_USER_FAILED,
   EDIT_USER_CANCEL
 } from './types'

 // // TODO: Temporary, instead react-native-dotenv
 //const REACT_APP_API_URL = "http://localhost:8000"

const fetchOtherUser = (id, token) => {
  return async (dispatch) => {
    const url = `${REACT_APP_API_URL}/users/${id}`
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts)
    const responseJSON = await response.json()
    console.log('fetchOtherUser:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({
        type: FETCH_USER,
        user: responseJSON,
        isOtherUser: true
      })
    } else {
      //TODO: handle error
    }
  }
}

const updateProfile = (newUserInfo, user, token) => {
  return async (dispatch) => {
    console.log('updateProfile:request:', newUserInfo)
    const url = `${REACT_APP_API_URL}/users/${user.id}`
    const opts = getRequestOptions('PATCH', token, newUserInfo)
    const response = await fetch(url, opts)
    const responseJSON = await response.json()
    console.log('updateProfile:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: EDIT_USER_SUCCESS, user: responseJSON })
    } else {
      dispatch({ type: EDIT_USER_FAILED, error: responseJSON.message })
    }
  }
}

const startEditing = () => {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_START })
  }
}

const cancelEditing = () => {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_CANCEL })
  }
}

export { fetchOtherUser, updateProfile, startEditing, cancelEditing }
