/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { getRequestOptions } from './actionUtils'

import {
  FETCH_USER,
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILED,
  REACT_APP_API_URL
} from './types'
import { IMAGE_OP_NONE } from './imageOp'

const fetchOtherUser = (id, token) => {
  return async (dispatch) => {
    const url = `${REACT_APP_API_URL}/users/${id}`
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    // console.log('fetchOtherUser:response:', response.status, responseJSON)
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

const updateProfile = (newUserInfo, userId, token, images = []) => {
  return async (dispatch) => {
    dispatch({ type: SAVE_USER_START })
    // console.log('updateProfile:request:', userId, newUserInfo, images)
    let url = `${REACT_APP_API_URL}/users/${userId}`
    let opts = getRequestOptions('PATCH', token, newUserInfo)
    let response = await fetch(url, opts) // eslint-disable-line no-undef
    let responseJSON = await response.json()
    // console.log('updateProfile:response:', response.status, responseJSON)
    if (response.status !== 200) {
      dispatch({ type: SAVE_USER_FAILED, error: responseJSON.message })
      return
    }
    const imageCount = images.filter(image => image.op !== IMAGE_OP_NONE).length
    if (imageCount <= 0) {
      dispatch({ type: SAVE_USER_SUCCESS, user: responseJSON })
      return
    }
    url = `${REACT_APP_API_URL}/users/${userId}/images`
    opts = getRequestOptions('PATCH', token, { images })
    response = await fetch(url, opts) // eslint-disable-line no-undef
    responseJSON = await response.json()
    // console.log('updateProfileImage:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: SAVE_USER_SUCCESS, user: responseJSON })
    } else {
      dispatch({ type: SAVE_USER_FAILED, error: responseJSON.message })
    }
  }
}

export { fetchOtherUser, updateProfile }
