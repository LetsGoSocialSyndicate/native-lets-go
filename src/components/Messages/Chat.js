/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  GET_PREVIOUS_MESSAGES,
  SEND_MESSAGE
} from './ChatProtocol'
import {
  chatActionStart,
  addChatMessage
} from '../../actions/actionChat'

const hasMessagesFetched = (chatmates, chatmateId) => {
  return chatmateId in chatmates && chatmates[chatmateId].messagesFetched
}

class Chat extends Component {

  componentDidMount() {
    console.log('Chat::componentDidMount START')
    const chat = this.props.chat
    const user = this.props.user
    const chatmateId = this.props.chatmateId
    if (!(chatmateId in chat.messages) ||
        !hasMessagesFetched(chat.chatmates, chatmateId)) {
      console.log('Chat::componentDidMount request messages')
      this.props.chatActionStartAction()
      chat.socket.emit(GET_PREVIOUS_MESSAGES, user.id, chatmateId)
    }
  }

  getChatUser() {
    const user = this.props.user
    const chatUser = {
      _id: user.id,
      name: `${user.first_name} ${user.last_name.charAt(0)}`
    }
    if (user.images.length > 0) {
      chatUser.avatar = user.images[0].image_url
    }
    return chatUser
  }

  getMessages() {
    return this.props.chat.messages[this.props.chatmateId]
  }

  sendMessages(messages) {
    console.log('Chat.sendMessages:', messages)
    messages.forEach(message => {
      this.props.addChatMessageAction(
        this.props.chatmateId,
        false,  // isIncoming
        false,  // markAsUnread
        message
      )
      this.props.chat.socket.emit(
        SEND_MESSAGE,
        this.props.chatmateId,
        message
      )
    })
  }

  render() {
    console.log('Chat::render', this.props.chatmateId, this.props.chat)
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
  addChatMessageAction: addChatMessage
}
export default connect(mapStateToProps, actions)(Chat)
