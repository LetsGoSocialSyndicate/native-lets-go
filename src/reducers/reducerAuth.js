/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  VERIFICATION_STARTED
} from '../actions/types'

const initialState = {
  token: null,
  isUserLoggedIn: false,
  error: null,
  email: null,  // signup is using it
  verified: false
}

function authenticate(state = initialState, action) {
  switch (action.type) {
  case VERIFICATION_STARTED:
    console.log('authenticate reducer:', action, state)
    return {
      ...state,
      verified: false
    }
  case LOGIN_SUCCESS:
    console.log('authenticate reducer action:', action)
    console.log('authenticate reducer state:', state)

    return {
      ...state,
      isUserLoggedIn: true,
      token: action.token,
      verified: true,
      error: null
    }
  case SIGNUP_SUCCESS:
    console.log('authenticate reducer:', action, state)
    return {
      ...state,
      error: null,
      email: action.email,
      verified: true
    }
  case LOGIN_FAILED:
  case SIGNUP_FAILED:
  console.log('authenticate reducer:', action, state)
    return {
      ...state,
      isUserLoggedIn: false,
      token: null,
      error: action.error,
      verified: true
    }
  case LOGOUT:
  console.log('authenticate reducer:', action, state)
    return {
      ...state,
      isUserLoggedIn: false,
      token: null
    }
  default:
    return state
  }
}

export default authenticate
