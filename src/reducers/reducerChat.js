/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import moment from 'moment'
import SocketIOClient from 'socket.io-client'
import {
  INITIALIZE_CHAT,
  RESET_CHAT,
  CHAT_ACTION_START,
  CHAT_ACTION_FAILED,
  JOIN_CHAT_SUCCESS,
  FETCH_CHAT_MESSAGES_SUCCESS,
  ADD_CHAT_MESSAGE,
  GOTO_CHAT
} from '../actions/types'

// import { REACT_APP_CHAT_URL } from 'react-native-dotenv'
const REACT_APP_CHAT_URL = 'http://localhost:8001'

const INITIAL_STATE = {
  socket: null,
  // object where keys are chatmateIds and
  // values are chatmate objects:
  //   {_id, name, avatar, messagesFetched, unreadCount, lastMessageTimestamp}
  //   where lastMessageTimestamp is millis since epoch.
  chatmates: {},
  // object where keys are chatmateIds and
  // values are arrays of messages: { _id, text, createdAt, user}
  messages: {},
  error: null,
  loading: false,
  joined: false,
  hasUnread: false,
  lastChatmateId: null
}

const removeDuplicates = array => {
  const ids = {}
  return array.filter(entry => {
    if (entry._id in ids) {
      return false
    }
    ids[entry._id] = 1
    return true
  })
}

const timestamp = (createdAt) => moment(createdAt).valueOf()
const merge = (lhs, rhs) => {
  return removeDuplicates(lhs.concat(rhs)).sort(
    (a, b) => timestamp(b.createdAt) - timestamp(a.createdAt)
  )
}

const hasUnreadMessages = chatmates => {
  const chatmatesWithUnreadMessages =
    Object.values(chatmates).filter(chatmate => chatmate.unreadCount > 0)
  return chatmatesWithUnreadMessages.length > 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_CHAT: { // type
      console.log('messages reducer:', action, state)
      return {
        ...state,
        socket: SocketIOClient(REACT_APP_CHAT_URL)
      }
    }
    case RESET_CHAT: { // type
      console.log('messages reducer:', action, state)
      if (state.socket) {
        state.socket.close()
      }
      return INITIAL_STATE
    }
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
    case JOIN_CHAT_SUCCESS: { // type, chatmates (array)
      console.log('messages reducer:', action, state)
      const chatmates = {}
      action.chatmates.forEach(chatmate => {
        chatmates[chatmate._id] = {
          ...chatmate,
          messagesFetched: false,
          unreadCount: 0,
          lastMessageTimestamp: 0
        }
      })
      return {
        ...state,
        loading: false,
        chatmates,
        joined: true
      }
    }
    case FETCH_CHAT_MESSAGES_SUCCESS: { // type, chatmateId, messages (array)
      console.log('messages reducer:', action, state)

      const lastMessageTimestamp = Math.max(...action.messages.map(
        message => timestamp(message.createdAt)
      ))
      // Mark the chatmate that he got previous messages from server
      // and update the last message timestamp.
      const chatmates = { ...state.chatmates }
      const chatmate = chatmates[action.chatmateId]
      chatmates[action.chatmateId] = {
        ...chatmate,
        messagesFetched: true,
        lastMessageTimestamp:
          Math.max(lastMessageTimestamp, chatmate.lastMessageTimestamp)
      }

      // Merge previous and current messages by time.
      const messages = { ...state.messages }
      const previousMessages = action.chatmateId in messages
        ? messages[action.chatmateId] : []
      messages[action.chatmateId] = merge(previousMessages, action.messages)

      return {
        ...state,
        loading: false,
        chatmates,
        messages
      }
    }
    case ADD_CHAT_MESSAGE: { // type, chatmateId, markUnread, message
      console.log('messages reducer:', action, state)

      const lastMessageTimestamp = timestamp(action.message.createdAt)
      const chatmates = { ...state.chatmates }

      // Add chatmate to chatmates if not present yet.
      if (!(action.chatmateId in chatmates)) {
         chatmates[action.chatmateId] = {
           ...action.message.user,
           messagesFetched: false,
           unreadCount: 0,
           lastMessageTimestamp
         }
      }

      // Update chatmate unread message count.
      if (action.markUnread) {
        const chatmate = chatmates[action.chatmateId]
        chatmates[action.chatmateId] = {
          ...chatmate,
          unreadCount: chatmate.unreadCount + 1,
          lastMessageTimestamp:
            Math.max(lastMessageTimestamp, chatmate.lastMessageTimestamp)
        }
      }

      // Add message to corresponding queue.
      const messages = { ...state.messages }
      if (action.chatmateId in messages) {
        messages[action.chatmateId] =
          [action.message, ...messages[action.chatmateId]]
      } else {
        messages[action.chatmateId] = [action.message]
      }

      return {
        ...state,
        chatmates,
        messages,
        hasUnread: hasUnreadMessages(chatmates)
      }
    }
    case GOTO_CHAT: { // type, chatmateId
      console.log('messages reducer:', action, state)

      // Mark all messages to/from chatmate as read.
      const chatmates = { ...state.chatmates }
      chatmates[action.chatmateId] = {
        ...chatmates[action.chatmateId],
        unreadCount: false
      }

      return {
        ...state,
        chatmates,
        hasUnread: hasUnreadMessages(chatmates),
        lastChatmateId: action.chatmateId
      }
    }
    default:
      return state
  }
}
