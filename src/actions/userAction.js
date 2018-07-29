/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  getRequestOptions,
  getRequestOptionsForMultipart,
  addImageToFormData
} from './actionUtils'

import {
  FETCH_USER_SUCCESS,
  USER_ACTION_START,
  SAVE_USER_SUCCESS,
  USER_ACTION_FAILED,
  REACT_APP_API_URL
} from './types'
import { IMAGE_OP_NONE } from './imageOp'

const fetchOtherUser = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: USER_ACTION_START })
    const url = `${REACT_APP_API_URL}/users/${id}`
    const opts = getRequestOptions('GET', token)
    const response = await fetch(url, opts) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    console.log('fetchOtherUser:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({
        type: FETCH_USER_SUCCESS,
        user: responseJSON,
        isOtherUser: true
      })
    } else {
      const error = responseJSON.message || 'Failed to fetch user profile'
      dispatch({ type: USER_ACTION_FAILED, error })
    }
  }
}

const updateProfile = (newUserInfo, userId, token, images = []) => {
  return async (dispatch) => {
    dispatch({ type: USER_ACTION_START })
    // console.log('updateProfile:request:', userId, newUserInfo, images)
    let url = `${REACT_APP_API_URL}/users/${userId}`
    let opts = getRequestOptions('PATCH', token, newUserInfo)
    let response = await fetch(url, opts) // eslint-disable-line no-undef
    let responseJSON = await response.json()
    // console.log('updateProfile:response:', response.status, responseJSON)
    if (response.status !== 200) {
      const error = responseJSON.message || 'Failed to update user profile'
      dispatch({ type: USER_ACTION_FAILED, error })
      return
    }
    const imageCount = images.filter(image => image.op !== IMAGE_OP_NONE).length
    if (imageCount <= 0) {
      dispatch({ type: SAVE_USER_SUCCESS, user: responseJSON })
      return
    }
    url = `${REACT_APP_API_URL}/users/${userId}/images`
    // opts = getRequestOptions('PATCH', token, { images })
    const data = new FormData()
    images.forEach((image, index) => addImageToFormData(data, image, index))
    opts = getRequestOptionsForMultipart('POST', token, data)
    console.log('updateProfileImage:request:', opts)
    response = await fetch(url, opts) // eslint-disable-line no-undef
    responseJSON = await response.json()
    console.log('updateProfileImage:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: SAVE_USER_SUCCESS, user: responseJSON })
    } else {
      const error = responseJSON.message || 'Failed to update profile images'
      dispatch({ type: USER_ACTION_FAILED, error })
    }
  }
}

export { fetchOtherUser, updateProfile }
