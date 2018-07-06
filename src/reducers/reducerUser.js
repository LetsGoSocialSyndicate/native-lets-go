/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  FETCH_USER,
  RESET_USER,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  EDIT_USER_CANCEL
} from '../actions/types'

const INITIAL_STATE = {
  user: {},
  otherUser: {},
  isReadOnly: true,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER: //type, user, isOtherUser
      console.log('user reducer:', action, state)
      return {
        ...state,
        user: action.isOtherUser ? state.user : action.user,
        otherUser: action.isOtherUser ? action.user : state.otherUser,
        isReadOnly: true,
        error: null
    }
    case RESET_USER: //type
      console.log('user reducer:', action, state)
      return INITIAL_STATE
    case EDIT_USER_START: //type
      console.log('user reducer:', action, state)
      return {
        ...state,
        isReadOnly: false,
        error: null
    }
    case EDIT_USER_SUCCESS: //type, user
      console.log('user reducer:', action, state)
      return {
        ...state,
        user: action.user,
        isReadOnly: true,
        error: null
    }
    case EDIT_USER_FAILED: //type, error
      console.log('user reducer:', action, state)
      return {
        ...state,
        isReadOnly: true,
        error: action.error
    }
    case EDIT_USER_CANCEL: //type
      console.log('user reducer:', action, state)
      return {
        ...state,
        isReadOnly: true,
        error: null
    }
    default:
      return state
  }
}
