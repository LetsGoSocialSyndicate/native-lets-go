/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Spinner, Tab, Tabs, Text } from 'native-base'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  GET_PREVIOUS_MESSAGES,
  SEND_MESSAGE
} from './ChatProtocol'
import {
  CONTENT_WIDTH
} from '../common/Constants'
import {
  chatActionStart,
  addChatMessage
} from '../../actions/actionChat'

const hasMessagesFetched = (chatmates, chatmateId) => {
  return chatmateId in chatmates && chatmates[chatmateId].messagesFetched
}

const tabsWidth = CONTENT_WIDTH - 20

class Chat extends Component {

  componentDidMount() {
    console.log(
      'Chat::componentDidMount START', this.props.chatmateId, this.props.chat
    )
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
      console.log('message', message)
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

  renderRequestTab(requests) {
    const { requestContainerStyle, textStyle, messageTextStyle } = styles
    if (requests && requests.length > 0) {
      return (
        <Text style={ textStyle }>{ requests.length }</Text>
      )
    }
    return (
      <View style={ requestContainerStyle }>
        <Text style={ messageTextStyle }>There are no requests pending</Text>
      </View>
    )
  }

  render() {
    // console.log('Chat::render', this.props.chatmateId, this.props.chat)
    if (!hasMessagesFetched(this.props.chat.chatmates, this.props.chatmateId)) {
      return (
        <Container style={containerStyle}>
          <Spinner color='red' />
        </Container>
      )
    }

    const { containerStyle, chatContainer, tabsStyle } = styles
    const chatUser = this.getChatUser()
    const messages = this.getMessages().filter((msg) => msg.type === 'directChat')
    const requests = this.getMessages().filter((msg) => msg.type === 'joinRequest' &&
      msg.user._id !== this.props.user.id)

    const onSend = (msgs) => this.sendMessages(msgs)

    return (
      <Container style={containerStyle}>
        <Container style={chatContainer}>
          <Tabs >
            <Tab heading="Direct Chat" style={tabsStyle}>
              <GiftedChat
                messages={messages}
                onSend={onSend}
                user={chatUser}
              />
            </Tab>
            <Tab heading="Requests" style={tabsStyle}>
              { this.renderRequestTab(requests) }
            </Tab>
          </Tabs>
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
    width: tabsWidth,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 150
  },
  tabsStyle: {
    backgroundColor: 'transparent',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderBottomColor: '#FFF'
  },
  requestContainerStyle: {
    marginTop: 10,
    marginLeft: 10
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
  },
  messageTextStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  chatActionStartAction: chatActionStart,
  addChatMessageAction: addChatMessage
}
export default connect(mapStateToProps, actions)(Chat)
