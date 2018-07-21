/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  GET_PREVIOUS_MESSAGES,
  SEND_MESSAGE,
  PREVIOUS_MESSAGES,
  MESSAGE
} from './ChatProtocol'
import {
  chatActionStart,
  fetchChatMessages,
  addChatMessage
} from '../../actions/actionChat'

class Chat extends Component {

  componentDidMount() {
    console.log('Chat::componentDidMount START')
    const chatmateId = this.props.chatmateId
    const messages = this.props.chat.messages
    if (!(chatmateId in messages)) {
      console.log('Chat::componentDidMount request messages')
      this.props.chat.socket.on(MESSAGE, (msg) => this.receiveMessage(msg))
      this.props.chat.socket.on(PREVIOUS_MESSAGES, (msgs) => this.receivePreviousMessages(msgs))
      this.props.chatActionStartAction()
      this.props.chat.socket.emit(
        GET_PREVIOUS_MESSAGES,
        this.props.user.id,
        this.props.chatmateId
      )
    }
  }

  getChatUser() {
    const user = this.props.user
    return {
      _id: user.id,
      name: `${user.first_name} ${user.last_name.charAt(0)}`
    }
  }

  getMessages() {
    const chatmateId = this.props.chatmateId
    return this.props.chat.messages[chatmateId]
  }

  receiveMessage(message) {
    console.log('Chat.receiveMessage:', message)
    // TODO: Maybe check if not loading - if yes, put in
    // internal state until loaded and then append.
    this.props.addChatMessageAction(this.props.chatmateId, message)
  }

  receivePreviousMessages(messages) {
    console.log('Chat.receivePreviousMessages:', messages)
    this.props.fetchChatMessagesAction(this.props.chatmateId, messages)
  }

  sendMessages(messages) {
    console.log('Chat.sendMessages:', messages)
    messages.forEach(message => {
      this.props.addChatMessageAction(this.props.chatmateId, message)
      this.props.chat.socket.emit(
        SEND_MESSAGE,
        this.props.chatmateId,
        message
      )
    })
  }

  render() {
    console.log('Chat::render', this.props.chat)
    const { containerStyle, chatContainer } = styles
    const chatUser = this.getChatUser()
    const messages = this.getMessages()
    const onSend = (msgs) => this.sendMessages(msgs)
    return (
      <Container style={containerStyle}>
        <Container style={chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={chatUser}
          />
        </Container>
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent'
  },
  chatContainer: {
    backgroundColor: 'transparent',
    width: 300,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 150
  },
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  chatActionStartAction: chatActionStart,
  fetchChatMessagesAction: fetchChatMessages,
  addChatMessageAction: addChatMessage
}
export default connect(mapStateToProps, actions)(Chat)
