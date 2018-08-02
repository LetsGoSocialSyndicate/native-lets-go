/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
 import { Container, Spinner, Tab, Tabs, Text } from 'native-base'
import React, { Component } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'

import { addChatMessage, chatActionStart } from '../../actions/actionChat'
import { CONTENT_WIDTH } from '../common/Constants'
import {
  GET_PREVIOUS_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_TYPE_CHAT,
  MESSAGE_TYPE_JOIN_REQUEST,
  MESSAGE_TYPE_JOIN_REJECT
} from './ChatProtocol'
import { getChatUser } from './ChatUtils'
import JoinRequest from './JoinRequest'

const hasMessagesFetched = (chatmates, chatmateId) => {
  return chatmateId in chatmates && chatmates[chatmateId].messagesFetched
}

const tabsWidth = CONTENT_WIDTH - 20

class Chat extends Component {
  componentDidMount() {
    // console.log(
    //   'Chat::componentDidMount START', this.props.chatmateId, this.props.chat
    // )
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

  getMessages = () => {
    return this.props.chat.messages[this.props.chatmateId]
  }

  sendMessages = messages => {
    // console.log('Chat.sendMessages:', messages)
    messages.forEach(message => {
      const typedMessage = { ...message, type: MESSAGE_TYPE_CHAT }
      this.props.addChatMessageAction(
        this.props.chatmateId,
        false,  // isIncoming
        false,  // markAsUnread
        typedMessage
      )
      this.props.chat.socket.emit(
        SEND_MESSAGE,
        this.props.chatmateId,
        typedMessage
      )
    })
  }

  renderChatTab = (messages, chatUser) => {
    const onSend = (msgs) => this.sendMessages(msgs)
    return (
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={chatUser}
      />
    )
  }
  
  renderRequestTab = requests => {
    const { requestContainerStyle, messageTextStyle } = styles
    if (requests && requests.length > 0) {
      return (
        <View style={requestContainerStyle}>
          {requests.map((req, i, array) => {
             const isLast = i === array.length - 1
             return (
               <JoinRequest key={req._id} request={req} isLast={isLast} />
             )
          })}
        </View>
      )
    }
    return (
      <View style={requestContainerStyle}>
        <Text style={messageTextStyle}>There are no requests pending</Text>
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

    const {
      containerStyle, chatContainer, tabsStyle,
      tabStyle, activeTabStyle, tabTextStyle, tabActiveTextStyle
    } = styles
    const chatUser = getChatUser(this.props.user)
    const messages = this.getMessages().filter(
      msg => msg.type === MESSAGE_TYPE_CHAT
    )
    const requests = this.getMessages().filter(
      msg => (msg.type === MESSAGE_TYPE_JOIN_REQUEST
             || msg.type === MESSAGE_TYPE_JOIN_REJECT)
             && msg.user._id !== this.props.user.id
    )


    return (
      <Container style={containerStyle}>
        <Container style={chatContainer}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: '#367588' }}>
            <Tab
              heading='Chat'
              style={tabsStyle}
              tabStyle={tabStyle}
              textStyle={tabTextStyle}
              activeTabStyle={activeTabStyle}
              activeTextStyle={tabActiveTextStyle}
            >
              {this.renderChatTab(messages, chatUser)}
            </Tab>
            <Tab
              heading='Join Requests'
              style={tabsStyle}
              tabStyle={tabStyle}
              textStyle={tabTextStyle}
              activeTabStyle={activeTabStyle}
              activeTextStyle={tabActiveTextStyle}
            >
              {this.renderRequestTab(requests)}
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
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
  activeTabStyle: {
    backgroundColor: 'transparent',
  },
  tabTextStyle: {
    color: '#367588',
    letterSpacing: 2,
    fontSize: 12,
  },
  tabActiveTextStyle: {
    color: '#367588',
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
