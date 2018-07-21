/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Button, Container, List, ListItem, Spinner, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import SocketIOClient from 'socket.io-client'
import { JOIN, CHATMATES } from './ChatProtocol'
import {
  setChatSocket,
  chatActionStart,
  joinChat
} from '../../actions/actionChat'

// import { REACT_APP_CHAT_URL } from 'react-native-dotenv'
const REACT_APP_CHAT_URL = 'http://localhost:8001'

class Conversations extends Component {

  componentDidMount() {
    console.log('Conversations::componentDidMount START')
    let socket = null
    if (!this.props.chat.socket) {
      console.log('Conversations::componentDidMount create socket')
      socket = SocketIOClient(REACT_APP_CHAT_URL)
      this.props.setChatSocketAction(socket)
    } else {
      socket = this.props.chat.socket
    }
    if (!this.props.chat.joined) {
      console.log('Conversations::componentDidMount join chat')
      socket.on(
        CHATMATES,
        chatmates => this.receiveChatmates(chatmates)
      )
      this.props.chatActionStartAction()
      socket.emit(JOIN, this.props.user.id)
    }
  }

  receiveChatmates(chatmates) {
    console.log('Conversations::receiveChatmates')
    this.props.joinChatAction(chatmates)
  }

  render() {
    console.log('Conversations::render', this.props.chat)
    const { containerStyle, buttonStyle, avatarStyle } = styles
    if (this.props.chat.loading) {
      return (
        <Container style={containerStyle}>
          <Spinner color='red' />
        </Container>
      )
    }
    const renderRow = item => {
      const chatmateId = item._id // eslint-disable-line no-underscore-dangle
      return (
        <ListItem avatar>
          <Button style={buttonStyle} onPress={() => Actions.chat({ chatmateId })}>
            <Thumbnail style={avatarStyle} source={{ uri: item.avatar }} />
            <Text>{item.name}</Text>
          </Button>
        </ListItem>
      )
    }
    console.log('this.props.chat.chatmates', this.props.chat.chatmates)
    return (
      <Container style={containerStyle}>
        <List
          dataArray={this.props.chat.chatmates}
          renderRow={renderRow}
        />
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    marginTop: 30
  },
  buttonStyle: {
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  avatarStyle: {
    marginRight: 20
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  setChatSocketAction: setChatSocket,
  chatActionStartAction: chatActionStart,
  joinChatAction: joinChat
}
export default connect(mapStateToProps, actions)(Conversations)
