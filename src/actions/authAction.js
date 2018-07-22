/* Copyright 2018, Socializing Syndicate Corp. */
import { Actions } from 'react-native-router-flux'
import { getRequestOptions } from './actionUtils'

import {
  FETCH_USER,
  RESET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  INITIALIZE_CHAT,
  RESET_CHAT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTH_STARTED,
  RESET_AUTH_ERROR,
  REACT_APP_API_URL
} from './types'

const doLogin = (dispatch, user, token, isOtherUser) => {
  dispatch({ type: FETCH_USER, user, isOtherUser })
  dispatch({ type: INITIALIZE_CHAT })
  dispatch({ type: LOGIN_SUCCESS, token })
}

const loginSubmit = (fields) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_STARTED })
    // console.log('loginSubmit:', fields)
    const url = `${REACT_APP_API_URL}/login`
    const opts = getRequestOptions('POST', null, fields)
    try {
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      const responseJSON = await response.json()
      // console.log('loginSubmit response:', response.status, responseJSON)
      if (response.status === 200) {
        doLogin(dispatch, responseJSON.user, responseJSON.token, false)
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
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      const responseJSON = await response.json()
      // console.log('signupSubmit response:', response.status, responseJSON)
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
    const response = await fetch(url) // eslint-disable-line no-undef
    const responseJSON = await response.json()
    // console.log('verifyAccount response:', response.status, responseJSON)
    if (response.status === 200) {
      doLogin(dispatch, responseJSON.user, responseJSON.token, false)
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
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      const responseJSON = await response.json()
      // console.log('verifyCode response:', response.status, responseJSON)
      if (response.status === 200) {
        doLogin(dispatch, responseJSON.user, responseJSON.token, false)
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
      const response = await fetch(url, opts) // eslint-disable-line no-undef
      const responseJSON = await response.json()
      // console.log('sendCodeForPassword:response:', response.status, responseJSON)
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
    dispatch({ type: RESET_USER })
    dispatch({ type: RESET_CHAT })
    Actions.login({ type: 'reset' })
  }
}

const setSignupError = (error) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_FAILED, error })
  }
}

const resetAuthError = () => {
  return (dispatch) => {
    dispatch({ type: RESET_AUTH_ERROR })
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
