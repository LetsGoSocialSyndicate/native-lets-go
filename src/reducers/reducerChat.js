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
  GOTO_CHAT,
  REACT_APP_API_URL
} from '../actions/types'

const INITIAL_STATE = {
  socket: null,
  // object where keys are chatmateIds and values are chatmate objects:
  //   {
  //     _id,
  //     name,            // Abbrevation, for example: Vladimir P
  //     avatar,          // url/uri to image
  //     messagesFetched, // boolean, true if previous messages already fetched
  //     unreadCount,     // number of unread messages
  //     lastMessage      // properties of last message
  //   }
  // lastMessage is also an object:
  //   {
  //     timestamp,   // (millis since epoch) of last sent/received messages
  //     snippet,     // possibly shortened last message
  //     isIncoming,  // whether this message is incoming or outgoing
  //   }
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

const MAX_SNIPPET_CHARS = 30

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

const timestamp = (createdAt) => {
  return createdAt ? moment(createdAt).valueOf() : 0
}

const merge = (lhs, rhs) => {
  return removeDuplicates(lhs.concat(rhs)).sort(
    (a, b) => timestamp(b.createdAt) - timestamp(a.createdAt)
  )
}

const trimMessage = message => {
  if (!message) {
    return ''
  }
  return message.length > MAX_SNIPPET_CHARS
    ? message.slice(0, MAX_SNIPPET_CHARS - 3) + '...' // eslint-disable-line prefer-template
    : message
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
        socket: SocketIOClient(REACT_APP_API_URL)
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
          _id: chatmate._id,
          name: chatmate.name,
          avatar: chatmate.avatar,
          messagesFetched: false,
          unreadCount: 0,
          lastMessage: {
            timestamp: timestamp(chatmate.lastMessage.createdAt),
            snippet: trimMessage(chatmate.lastMessage.text),
            type: chatmate.lastMessage.type,
            isIncoming: chatmate.lastMessage.isIncoming,
          }
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

      // Merge previous and current messages by time.
      const messages = { ...state.messages }
      const previousMessages = action.chatmateId in messages
        ? messages[action.chatmateId] : []
      messages[action.chatmateId] = merge(previousMessages, action.messages)

      // Mark the chatmate that he got previous messages from server
      // and update the last message.
      const chatmates = { ...state.chatmates }
      const chatmate = chatmates[action.chatmateId]
      const latestMessage = messages[action.chatmateId][0]
      const isIncoming = latestMessage.user._id === action.chatmateId
      chatmates[action.chatmateId] = {
        ...chatmate,
        messagesFetched: true,
        lastMessage: {
          timestamp: timestamp(latestMessage.createdAt),
          snippet: trimMessage(latestMessage.text),
          isIncoming,
          type: latestMessage.type
        }
      }

      return {
        ...state,
        loading: false,
        chatmates,
        messages
      }
    }
    case ADD_CHAT_MESSAGE: { // type, chatmateId, isIncoming, markAsUnread, message
      console.log('messages reducer:', action, state)

      const lastMessageTimestamp = timestamp(action.message.createdAt)
      const chatmates = { ...state.chatmates }

      // Add chatmate to chatmates if not present yet.
      if (!(action.chatmateId in chatmates)) {
         chatmates[action.chatmateId] = {
           ...action.message.user,
           messagesFetched: false,
           unreadCount: 0,
           lastMessage: {
             timestamp: lastMessageTimestamp,
             snippet: trimMessage(action.message.text),
             isIncoming: action.isIncoming,
             type: action.message.type
           }
         }
      } else {
        // For existing messages, update last message and unread count.
        const chatmate = chatmates[action.chatmateId]
        let lastMessage = chatmate.lastMessage
        if (lastMessageTimestamp > lastMessage.timestamp) {
          lastMessage = {
            timestamp: lastMessageTimestamp,
            snippet: trimMessage(action.message.text),
            isIncoming: action.isIncoming,
            type: action.message.type
          }
        }
        const unreadCount = action.markAsUnread
          ? chatmate.unreadCount + 1 : chatmate.unreadCount
        chatmates[action.chatmateId] = {
          ...chatmate,
          unreadCount,
          lastMessage,
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
