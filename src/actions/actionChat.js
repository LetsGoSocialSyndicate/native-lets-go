/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  CHAT_ACTION_START,
  CHAT_ACTION_FAILED,
  JOIN_CHAT_SUCCESS,
  FETCH_CHAT_MESSAGES_SUCCESS,
  ADD_CHAT_MESSAGE,
  GOTO_CHAT
} from './types'

const chatActionStart = () => {
  return (dispatch) => {
    dispatch({ type: CHAT_ACTION_START })
  }
}

const chatActionFailed = () => {
  return (dispatch) => {
    dispatch({ type: CHAT_ACTION_FAILED })
  }
}

const joinChat = (chatmates) => {
  return (dispatch) => {
    dispatch({ type: JOIN_CHAT_SUCCESS, chatmates })
  }
}

const fetchChatMessages = (chatmateId, messages) => {
  return (dispatch) => {
    dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, chatmateId, messages })
  }
}

const addChatMessage = (chatmateId, isIncoming, markAsUnread, message) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CHAT_MESSAGE, chatmateId, isIncoming, markAsUnread, message
    })
  }
}

const gotoChat = (chatmateId) => {
  return (dispatch) => {
    dispatch({ type: GOTO_CHAT, chatmateId })
  }
}
export {
  chatActionStart,
  chatActionFailed,
  joinChat,
  fetchChatMessages,
  addChatMessage,
  gotoChat
}
