/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    // TODO: Use env/const
    this.socket = SocketIOClient('http://localhost:8001')
    this.socket.on('message', (messages) => this.receiveMessages(messages))
  }

  componentDidMount() {
    this.socket.emit('join', { userId: this.props.user.id })
    this.socket.emit('getMessages', {})
  }

  getChatUser(user) {
    return {
      _id: user.id,
      name: `${user.first_name} ${user.last_name.charAt(0)}`
    }
  }

  receiveMessages(messages) {
    this.storeMessages(messages)
  }

  sendMessages(messages) {
    console.log('SEND', messages)
    this.storeMessages(messages)
    this.socket.emit('message', 'vasya', messages[0])
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
