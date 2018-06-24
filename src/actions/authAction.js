/* Copyright 2018, Socializing Syndicate Corp. */
import { getRequestOptions } from './actionUtils'

import {
  FETCH_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  VERIFICATION_STARTED
} from './types'

const loginSubmit = (fields) => {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/login`
    const opts = getRequestOptions('POST', null, fields)
    const response = await fetch(url, opts)
    const responseJSON = await response.json()
    console.log('loginSubmit:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({
        type: FETCH_USER,
        user: responseJSON.user,
        isOtherUser: false
      })
      dispatch({ type: LOGIN_SUCCESS, token: responseJSON.token })
    }
    else {
      dispatch({ type: LOGIN_FAILED, error: responseJSON.message})
    }
  }
}

const signupSubmit = (fields, history) => {
  return async (dispatch) => {
    // console.log("I am in action signupSubmit and fields are: ",  fields)
    const url = `${process.env.REACT_APP_API_URL}/signup`
    const opts = getRequestOptions('POST', null, fields)
    const response = await fetch(url, opts)
    const responseJSON = await response.json()
    console.log('signupSubmit:response:', response.status, responseJSON)
    if (response.status === 200) {
      dispatch({ type: SIGNUP_SUCCESS, email: fields.email})
      history.push('/signup/verify_code')
    } else {
      dispatch({ type: SIGNUP_FAILED, error: responseJSON.message})
      // history.push("/signup/failure")
    }
  }
}

const verifyAccount = (token, route) => {
  return async (dispatch) => {
    dispatch({ type: VERIFICATION_STARTED})
    const url = `${process.env.REACT_APP_API_URL}${route}/${token}`
    const response = await fetch(url)
    const responseJSON = await response.json()
    // console.log('response:', response.status, responseJSON)
    if (response.s'responseJSON:'{
      console.log('responseJSON:', responseJSON.user)
      dispatch({
        type: FETCH_USER,
        user: responseJSON.user,
        isOtherUser: false
      })
      dispatch({ type: LOGIN_SUCCESS, token: responseJSON.token})
    } else {
      dispatch({ type: LOGIN_FAILED, error: responseJSON.message})
    }
  }
}

const verifyCode = (code, email, password = null) => {
  return async (dispatch) => {
    console.log('verifyCode:', code, email, password)
    dispatch({ type: VERIFICATION_STARTED})
    const url = `${process.env.REACT_APP_API_URL}/signup/${code}`
    const opts = getRequestOptions('PATCH', null, { email, password })
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
      console.log(responseJSON.message)
      dispatch({ type: LOGIN_FAILED, error: responseJSON.message })
    }
  }
}

const sendCodeForPassword = (email, history) => {
  return async (dispatch) => {
    // console.log("I am in action sendCodeForPassword and fields are: ",  email)
    const url = `${process.env.REACT_APP_API_URL}/login/code_for_pswd`
    const opts = getRequestOptions('POST', null, {email})
    const response = await fetch(url, opts)
    const responseJSON = await response.json()
    console.log('sendCodeForPassword:response:', response.status, responseJSON)
    // SIGNUP_SUCCESS/SIGNUP_FAILED actions can be reused in this case too.
    if (response.status === 200) {
      dispatch({type: SIGNUP_SUCCESS, email: email})
      history.push('/login/new_password')
    } else {
      dispatch({ type: SIGNUP_FAILED, error: responseJSON.message })
    }
  }
}

const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT })
  }
}

export {
  loginSubmit,
  signupSubmit,
  verifyAccount,
  verifyCode,
  sendCodeForPassword,
  logout
}
