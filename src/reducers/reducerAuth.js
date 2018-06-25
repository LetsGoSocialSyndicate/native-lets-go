/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  AUTH_STARTED
} from '../actions/types'

const INITIAL_STATE = {
  token: null,
  isUserLoggedIn: false,
  error: null,
  email: null,  // signup is using it
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AUTH_STARTED:
    console.log('authenticate reducer:', action, state)
    return {
      ...state,
      loading: true
    }
  case LOGIN_SUCCESS:
    console.log('authenticate reducer action:', action)
    console.log('authenticate reducer state:', state)

    return {
      ...state,
      isUserLoggedIn: true,
      token: action.token,
      loading: false,
      error: null
    }
  case SIGNUP_SUCCESS:
    console.log('authenticate reducer:', action, state)
    return {
      ...state,
      error: null,
      email: action.email,
      loading: false
    }
  case LOGIN_FAILED:
  case SIGNUP_FAILED:
  console.log('authenticate reducer:', action, state)
    return {
      ...state,
      isUserLoggedIn: false,
      token: null,
      error: action.error,
      loading: false
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
