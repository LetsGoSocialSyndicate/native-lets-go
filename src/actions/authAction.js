/* Copyright 2018, Socializing Syndicate Corp. */
import { REACT_APP_API_URL } from 'react-native-dotenv'
import { Actions } from 'react-native-router-flux'
import { getRequestOptions } from './actionUtils'

import {
  FETCH_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTH_STARTED,
  RESET_ERROR
} from './types'

const loginSubmit = (fields) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    console.log('loginSubmit:', fields)
    const url = `${REACT_APP_API_URL}/login`
    const opts = getRequestOptions('POST', null, fields)
    try {
      const response = await fetch(url, opts)
      const responseJSON = await response.json()
      console.log('loginSubmit response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({
          type: FETCH_USER,
          user: responseJSON.user,
          isOtherUser: false
        })
        dispatch({ type: LOGIN_SUCCESS, token: responseJSON.token })
      } else {
        dispatch({ type: LOGIN_FAILED, error: responseJSON.message })
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, error: error.message })
    }
  }
}

const signupSubmit = (fields) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    const url = `${REACT_APP_API_URL}/signup`
    const opts = getRequestOptions('POST', null, fields)
    try {
      const response = await fetch(url, opts)
      const responseJSON = await response.json()
      console.log('signupSubmit response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS, email: fields.email })
        Actions.verifySignup()
      } else {
        dispatch({ type: SIGNUP_FAILED, error: responseJSON.message })
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILED, error: error.message })
    }
  }
}

const verifyAccount = (token, route) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    const url = `${REACT_APP_API_URL}${route}/${token}`
    try {
    const response = await fetch(url)
    const responseJSON = await response.json()
    console.log('verifyAccount response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({
        type: FETCH_USER,
        user: responseJSON.user,
        isOtherUser: false
      })
      dispatch({ type: LOGIN_SUCCESS, token: responseJSON.token })
    } else {
      dispatch({ type: LOGIN_FAILED, error: responseJSON.message })
    }
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, error: error.message })
    }
  }
}

const verifyCode = (code, email, password = null) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    const url = `${REACT_APP_API_URL}/signup/${code}`
    const opts = getRequestOptions('PATCH', null, { email, password })
    try {
      const response = await fetch(url, opts)
      const responseJSON = await response.json()
      console.log('verifyCode response:', response.status, responseJSON)
      if (response.status === 200) {
        dispatch({
          type: FETCH_USER,
          user: responseJSON.user,
          isOtherUser: false
        })
        dispatch({ type: LOGIN_SUCCESS, token: responseJSON.token })
      } else {
        dispatch({ type: LOGIN_FAILED, error: responseJSON.message })
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, error: error.message })
    }
  }
}

const sendCodeForPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    const url = `${REACT_APP_API_URL}/login/code_for_pswd`
    const opts = getRequestOptions('POST', null, { email })
    try {
      const response = await fetch(url, opts)
      const responseJSON = await response.json()
      console.log('sendCodeForPassword:response:', response.status, responseJSON)
      // SIGNUP_SUCCESS/SIGNUP_FAILED actions can be reused in this case too.
      if (response.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS, email })
        Actions.newPassword()
      } else {
        dispatch({ type: SIGNUP_FAILED, error: responseJSON.message })
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILED, error: error.message })
    }
  }
}

const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT })
  }
}

const setSignupError = (error) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_FAILED, error })
  }
}

const resetAuthError = () => {
  return (dispatch) => {
    dispatch({ type: RESET_ERROR })
  }
}

export {
  loginSubmit,
  signupSubmit,
  verifyAccount,
  verifyCode,
  sendCodeForPassword,
  logout,
  setSignupError,
  resetAuthError
}
