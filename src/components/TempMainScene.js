/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import SocketIOClient from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

import { LGButton } from './common'
import { logout } from '../actions/authAction'

const testMessage = {
  _id: 1,
  text: 'THIS IS TEST MESSAGE',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'USER'
  }
}
class TempMainScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [testMessage]
    }
    // TODO: Use env/const
    // this.socket = SocketIOClient('http://localhost:8001')
  }

  onSend() {
    console.log('SEND')
  }

  getChatUser(user) {
    return {
      _id: user.id,
      name: `${user.first_name} ${user.last_name.charAt(0)}`
    }
  }

  render() {
    const {
      containerStyle, buttonsContainer
    } = styles
    const chatUser = this.getChatUser(this.props.user)

    return (
      <Container style={containerStyle}>
        <Container style={buttonsContainer}>
          <LGButton
            onPress={() => Actions.activityFeeds({ origin: 'TempMainScene' })}
            buttonText="feed"
          />
          <LGButton
            onPress={() => Actions.profile({ forOtherUser: false, origin: 'TempMainScene' })}
            buttonText="profile"
          />
          <LGButton
            onPress={this.props.logoutAction}
            buttonText="logout"
          />
        </Container>

        {/* <Container style={styles.chatStyle}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={chatUser}
          />
        </Container> */}
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    width: 200,
    alignSelf: 'center',
    marginTop: 50
  },
  chatStyle: {
    marginBottom: 150,
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  logoutAction: logout
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(TempMainScene)
