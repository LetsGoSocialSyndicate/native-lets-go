/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  JOIN,
  CHATMATES,
  PREVIOUS_MESSAGES,
  MESSAGE
} from './ChatProtocol'

import {
  chatActionStart,
  joinChat,
  addChatMessage,
  fetchChatMessages
} from '../../actions/actionChat'

class ChatDeamon extends Component {

  componentDidMount() {
    //console.log('ChatDeamon::componentDidMount', this.props)
    this.initialize()
  }
  componentDidUpdate() {
    //console.log('ChatDeamon::componentDidUpdate', this.props)
    this.initialize()
  }

  initialize() {
    const chat = this.props.chat
    const user = this.props.user
    //console.log('ChatDeamon::initialize START', chat)
    // console.log('ChatDeamon::initialize joined', chat.joined)
    // console.log('ChatDeamon::initialize loading', chat.loading)
    if (!chat.socket) {
      //console.log('ChatDeamon::initialize: uninitialized socket. Skipping.')
      return
    }
    if (!chat.joined && !chat.loading) {
      console.log('ChatDeamon::initialize joining chat...')
      chat.socket.on(MESSAGE, (msg) => this.receiveMessage(msg))
      chat.socket.on(
        PREVIOUS_MESSAGES,
        (chatmateId, msgs) => this.receivePreviousMessages(chatmateId, msgs)
      )
      chat.socket.on(
        CHATMATES,
        chatmates => this.receiveChatmates(chatmates)
      )
      this.props.chatActionStartAction()
      chat.socket.emit(JOIN, user.id)
    }
  }
  receiveChatmates(chatmates) {
    console.log('ChatDeamon::receiveChatmates', chatmates)
    this.props.joinChatAction(chatmates)
  }

  receiveMessage(message) {
    console.log('ChatDeamon::receiveMessage:', Actions.currentScene, message)
    const markAsUnread =
      Actions.currentScene !== 'chat' ||
      this.props.chat.lastChatmateId !== message.user._id
    this.props.addChatMessageAction(
      message.user._id, true /* isIncoming */, markAsUnread, message
    )
  }

  receivePreviousMessages(chatmate, messages) {
    console.log('ChatDeamon.receivePreviousMessages:', chatmate, messages)
    this.props.fetchChatMessagesAction(chatmate, messages)
  }

  render() {
    return <View />
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  chatActionStartAction: chatActionStart,
  joinChatAction: joinChat,
  addChatMessageAction: addChatMessage,
  fetchChatMessagesAction: fetchChatMessages
}
export default connect(mapStateToProps, actions)(ChatDeamon)
