/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  JOIN,
  GET_PREVIOUS_MESSAGES,
  SEND_MESSAGE,
  PREVIOUS_MESSAGES,
  CHATMATES,
  MESSAGE
} from './ChatProtocol'


// DEBUG: Temporary hardcoded:
const getChatmateId = userId => {
 return userId === 'a9e6d36c-9ecb-408a-a4e4-e5893fa4154d'
   ? 'e2aec1a1-60b4-46c0-8fb6-9bb663de862b'
   : 'a9e6d36c-9ecb-408a-a4e4-e5893fa4154d'
}

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    console.log('Chat::constructor')
    // TODO: Use env/const
    this.socket = SocketIOClient('http://localhost:8001')
    this.socket.on(MESSAGE, (message) => this.receiveMessage(message))
    this.socket.on(PREVIOUS_MESSAGES, (messages) => this.receivePreviousMessages(messages))
    this.socket.on(CHATMATES, (chatmates) => this.receiveChatmates(chatmates))
  }

  componentDidMount() {
    // TODO: use redux state to fetch conversation.
    console.log('Chat::componentDidMount', this.props.user)
    // TODO: Move join to Messages.js
    this.socket.emit(JOIN, this.props.user.id)
    this.socket.emit(
      GET_PREVIOUS_MESSAGES,
      this.props.user.id,
      getChatmateId(this.props.user.id)
    )
  }

  getChatUser(user) {
    return {
      _id: user.id,
      name: `${user.first_name} ${user.last_name.charAt(0)}`
    }
  }

  receiveChatmates(chatmates) {
    // TODO: do something
    console.log('Chat.receiveChatmates:', chatmates)
  }

  receiveMessage(message) {
    console.log('Chat.receiveMessage:', message)
    // TODO: check if locked and put in temporary queue
    this.storeMessages([message])
  }

  receivePreviousMessages(messages) {
    console.log('Chat.receivePreviousMessages:', messages)
    // TODO: unlock here
    this.storeMessages(messages)
  }

  sendMessages(messages) {
    console.log('Chat.sendMessages:', messages)
    this.storeMessages(messages)
    messages.forEach(message =>
      this.socket.emit(
        SEND_MESSAGE,
        getChatmateId(this.props.user.id),
        message
      )
    )
  }

  storeMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }

  render() {
    const {
      containerStyle, chatContainer
    } = styles
    const chatUser = this.getChatUser(this.props.user)
    const onSend = (messages) => this.sendMessages(messages)
    return (
      <Container style={containerStyle}>
        <Container style={chatContainer}>
          <GiftedChat
            messages={this.state.messages}
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
  return { user: state.user.user }
}

export default connect(mapStateToProps)(Chat)
