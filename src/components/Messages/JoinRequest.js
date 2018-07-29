/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { Text, Item } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { ImageButton } from '../common'
import { acceptRequest, rejectRequest } from '../../actions/actionRequest'
import { removeChatMessage } from '../../actions/actionChat'
import { DELETE_MESSAGE } from './ChatProtocol'
import {
  CONTENT_WIDTH
} from '../common/Constants'

const acceptButton = require('../../assets/buttons/accept.png')
const viewRequestButton = require('../../assets/buttons/view_request.png')
// TODO: replace with real reject button
const rejectButton = require('../../assets/buttons/submit.png')

const overlayButtonWidth = CONTENT_WIDTH - 50

class JoinRequest extends Component {
  state = {
    timerStarted: false
  }
  onPressAcceptRequest = () => {
    if (this.state.timerStarted) {
      console.log('Accept request', this.props.request)
      const request = this.props.request
      this.props.acceptRequest(
        request.eventId, request.user._id, this.props.auth.token
      )
      this.props.removeChatMessage(request.user._id, request._id)
      this.props.chat.socket.emit(DELETE_MESSAGE, request._id)
    }
  }
  onPressRejectRequest = () => {
    if (this.state.timerStarted) {
      console.log('Reject request', this.props.request)
      const request = this.props.request
      this.props.rejectRequest(
        request.eventId, request.user._id, this.props.auth.token
      )
      this.props.removeChatMessage(request.user._id, request._id)
      this.props.chat.socket.emit(DELETE_MESSAGE, request._id)
    }
  }

  onProfilePicturePress = () => {
    console.log('this.props.request', this.props.request)
    if (this.state.timerStarted) {
    Actions.profile({
      origin: 'JoinRequest',
      otherUserId: this.props.request.user._id,
      forOtherUser: true
    })
    }
  }

  onViewRequest = () => {
    if (!this.state.timerStarted) {
      console.log('on view request')
      this.setState({ ...this.state, timerStarted: true })
    }
  }

  renderViewRequestOverlay = () => {
    if (this.state.timerStarted) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.viewRequestContainerStyle}
        onPress={this.onViewRequest}
      >
        <Image
          style={styles.viewRequestButtonStyle}
          source={viewRequestButton}
        />
      </TouchableOpacity>
    )
  }

  render() {
    console.log('JoinRequest', this.props.request)
    const request = this.props.request
    const avatar = request.user.avatar || ''

    return (
      <View style={styles.outerContainerStyle}>
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={this.onProfilePicturePress}>
            <Image style={styles.imageStyle} source={{ uri: avatar }} />
          </TouchableOpacity>
          <View style={styles.rightContainerStyle}>
            <Text style={styles.boldTextStyle}>{request.user.name}</Text>
            <Text style={styles.textStyle}>{request.text}</Text>
            <ImageButton
              buttonSource={acceptButton}
              buttonWidth={100}
              handleOnPress={this.onPressAcceptRequest}
            />
            <ImageButton
              buttonSource={rejectButton}
              buttonWidth={100}
              handleOnPress={this.onPressRejectRequest}
            />
          </View>
        </View>
        {this.renderViewRequestOverlay()}
        {!this.props.isLast ? <Item bordered /> : null}
      </View>
    )
  }
}

const styles = {
  outerContainerStyle: {
    flexDirection: 'column',
    marginLeft: -20
  },
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 10,
    opacity: 0.4
  },
  rightContainerStyle: {
    marginLeft: 20,
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
    width: 250
  },
  boldTextStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },
  imageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 70,
    borderRadius: 35,
    width: 70,
    borderColor: 'white',
    borderWidth: 4
  },
  viewRequestContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  viewRequestButtonStyle: {
    resizeMode: 'contain',
    width: overlayButtonWidth,
    marginLeft: 20
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, auth: state.auth }
}
const actions = {
  acceptRequest,
  rejectRequest,
  removeChatMessage
}
export default connect(mapStateToProps, actions)(JoinRequest)
