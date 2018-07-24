/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  FETCH_USER_SUCCESS,
  RESET_USER,
  USER_ACTION_START,
  SAVE_USER_SUCCESS,
  USER_ACTION_FAILED
} from '../actions/types'

const INITIAL_STATE = {
  user: {},
  otherUser: {},
  error: null,
  updating: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_USER: //type
      console.log('user reducer:', action, state)
      return INITIAL_STATE
    case USER_ACTION_START: //type
      console.log('user reducer:', action, state)
      return {
        ...state,
        error: null,
        updating: true
    }
    case USER_ACTION_FAILED: //type, error
      console.log('user reducer:', action, state)
      return {
        ...state,
        error: action.error,
        updating: false
    }
    case SAVE_USER_SUCCESS: //type, user
      console.log('user reducer:', action, state)
      return {
        ...state,
        user: action.user,
        updating: false
    }
    case FETCH_USER_SUCCESS: //type, user, isOtherUser
      console.log('user reducer:', action, state)
      return {
        ...state,
        user: action.isOtherUser ? state.user : action.user,
        otherUser: action.isOtherUser ? action.user : state.otherUser,
        updating: false,
    }    
    default:
      return state
  }
}
