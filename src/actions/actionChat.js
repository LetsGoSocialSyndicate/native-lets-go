/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import {
  SET_CHAT_SOCKET,
  CHAT_ACTION_START,
  CHAT_ACTION_FAILED,
  JOIN_CHAT_SUCCESS,
  FETCH_CHAT_MESSAGES_SUCCESS,
  ADD_CHAT_MESSAGE
} from './types'

const setChatSocket = (socket) => {
  return (dispatch) => {
    dispatch({ type: SET_CHAT_SOCKET, socket })
  }
}

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

const addChatMessage = (chatmateId, message) => {
  return (dispatch) => {
    dispatch({ type: ADD_CHAT_MESSAGE, chatmateId, message })
  }
}

export {
  setChatSocket,
  chatActionStart,
  chatActionFailed,
  joinChat,
  fetchChatMessages,
  addChatMessage
}
