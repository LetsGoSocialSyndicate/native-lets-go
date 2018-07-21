/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  SET_CHAT_SOCKET,
  RESET_CHAT,
  CHAT_ACTION_START,
  CHAT_ACTION_FAILED,
  JOIN_CHAT_SUCCESS,
  FETCH_CHAT_MESSAGES_SUCCESS,
  ADD_CHAT_MESSAGE
} from '../actions/types'

const INITIAL_STATE = {
  socket: null,
  chatmates: [],  // array of objects
  // object where keys are chatmateIds and
  // values are arrays of messages
  messages: {},
  error: null,
  loading: false,
  joined: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHAT_SOCKET: // type, socket
      console.log('messages reducer:', action, state)
      return {
        ...state,
        socket: action.socket
      }
    case RESET_CHAT: // type
      console.log('messages reducer:', action, state)
      return INITIAL_STATE
    case CHAT_ACTION_START: // type
      console.log('messages reducer:', action, state)
        return {
          ...state,
          loading: true,
          error: null
      }
    case CHAT_ACTION_FAILED: // type, error
      console.log('messages reducer:', action, state)
        return {
          ...state,
          loading: false,
          error: action.error
      }
    case JOIN_CHAT_SUCCESS: // type, chatmates
      console.log('messages reducer:', action, state)
      return {
        ...state,
        loading: false,
        chatmates: action.chatmates,
        joined: true
      }
    case FETCH_CHAT_MESSAGES_SUCCESS: { // type, chatmateId, messages
      console.log('messages reducer:', action, state)
      const messages = { ...state.messages }
      messages[action.chatmateId] = action.messages
      return {
        ...state,
        loading: false,
        messages
      }
    }
    case ADD_CHAT_MESSAGE: { // type, chatmateId, message
      console.log('messages reducer:', action, state)
      const messages = { ...state.messages }
      if (action.chatmateId in messages) {
        messages[action.chatmateId] =
          [action.message, ...messages[action.chatmateId]]
      } else {
        messages[action.chatmateId] = [action.message]
      }
      return {
        ...state,
        messages
      }
    }
    default:
      return state
  }
}
